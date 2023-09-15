import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import { BallTriangle } from 'react-loader-spinner'
import {
  AuthorizationResponseStateStatus,
  AuthStatusResponse,
  GenerateAuthRequestURIResponse
} from './auth-model'
import {
  CreateElementArgs,
  QRType,
  URIData,
  ValueResult
} from '@sphereon/ssi-sdk.qr-code-generator'

import agent from '@components/Authentication/SIOP/agent'
import Debug from 'debug'
import { DEFINITION_ID_REQUIRED_ERROR } from '@components/Authentication/constants'
import { AuthenticationStatus } from '@components/Authentication/authentication.types'
import { setAuthState } from '../../../store/actions/authentication.actions'

const debug = Debug('sphereon:portal:ssi:AuthenticationQR')

interface DispatchProps {
  setAuthState: (authState: AuthenticationStatus) => void
}

export type AuthenticationQRProps = {
  onAuthRequestRetrieved: () => void
  setQrCodeData: (text: string) => void
} & DispatchProps

export interface AuthenticationQRState {
  authRequestURIResponse?: GenerateAuthRequestURIResponse
  qrCode?: JSX.Element
}

class AuthenticationQR extends Component<AuthenticationQRProps> {
  state: AuthenticationQRState = {}

  private registerStateSent = false
  private refreshTimerHandle?: NodeJS.Timeout
  private qrExpirationMs = 0
  private timedOutRequestMappings: Set<AuthenticationQRState> =
    new Set<AuthenticationQRState>()

  private _isMounted = false

  private readonly definitionId =
    process.env.NEXT_PUBLIC_OID4VP_PRESENTATION_DEF_ID

  componentDidMount() {
    this.qrExpirationMs =
      parseInt(process.env.NEXT_PUBLIC_SSI_QR_CODE_EXPIRES_AFTER_SEC ?? '300') *
      750
    // actually since the QR points to a JWT it has its own expiration value as well.

    if (!this.state.qrCode) {
      this.generateNewQRCode()
      this.refreshTimerHandle = setTimeout(
        () => this.refreshQRCode(),
        this.qrExpirationMs
      )
    }
    this._isMounted = true
    if (!this.definitionId) {
      throw new Error(DEFINITION_ID_REQUIRED_ERROR)
    }
  }

  private generateNewQRCode() {
    agent
      .siopClientCreateAuthRequest()
      .then((authRequestURIResponse) => {
        this.props.setQrCodeData(authRequestURIResponse.authRequestURI)
        agent
          .qrURIElement(this.createQRCodeElement(authRequestURIResponse))
          .then((qrCode) => {
            this.registerState(authRequestURIResponse, qrCode)
            // return this.setState({authRequestURIResponse, qrCode})
          })
      })
      .catch(debug)
  }

  createQRCodeElement(
    authRequestURIResponse: GenerateAuthRequestURIResponse
  ): CreateElementArgs<QRType.URI, URIData> {
    const qrProps: CreateElementArgs<QRType.URI, URIData> = {
      data: {
        type: QRType.URI,
        object: authRequestURIResponse.authRequestURI,
        id: authRequestURIResponse.correlationId
      },
      onGenerate: (result: ValueResult<QRType.URI, URIData>) => {
        debug(JSON.stringify(result))
      },
      renderingProps: {
        bgColor: 'white',
        fgColor: '#a6271c',
        level: 'L',
        size: 290,
        title: 'Sign in'
      }
    }
    return qrProps
  }

  componentWillUnmount() {
    if (this.refreshTimerHandle) {
      clearTimeout(this.refreshTimerHandle)
    }
    this._isMounted = false
  }

  render() {
    // Show the loader until we have details on which parameters to load into the QR code
    return this.state.qrCode ? (
      <div>{this.state.qrCode}</div>
    ) : (
      <BallTriangle color="#a6271c" height="100" width="100" />
    )
  }

  /* We don't want to keep used and unused states indefinitely, so expire the QR code after a configured timeout  */
  private refreshQRCode = () => {
    debug('Timeout expired, refreshing QR code...')
    if (this.qrExpirationMs > 0) {
      if (this.state) {
        this.timedOutRequestMappings.add(this.state)
      }
      this.registerStateSent = false
      this.generateNewQRCode()
    }
  }

  private registerState = (
    authRequestURIResponse: GenerateAuthRequestURIResponse,
    qrCode: JSX.Element
  ) => {
    if (
      this.state.authRequestURIResponse?.correlationId ===
      authRequestURIResponse.correlationId
    ) {
      // same correlationId, which we are already polling
      return
    }

    if (!this.timedOutRequestMappings.has({ authRequestURIResponse, qrCode })) {
      this.timedOutRequestMappings.add({ authRequestURIResponse, qrCode })
    }
    this.setState({ qrCode, authRequestURIResponse })
    this.pollAuthStatus(authRequestURIResponse)
  }

  /* Poll the backend until we get a response, abort when the component is unloaded or the QR code expired */
  private pollAuthStatus = async (
    authRequestURIResponse: GenerateAuthRequestURIResponse
  ) => {
    const fetchAuthStatus = async () => {
      return await agent.siopClientGetAuthStatus({
        correlationId: this.state?.authRequestURIResponse?.correlationId,
        definitionId: this.state?.authRequestURIResponse?.definitionId
      })
    }

    let pollingResponse = await fetchAuthStatus()

    const interval = setInterval(async () => {
      const authStatus: AuthStatusResponse = pollingResponse

      // If QR code doesn't exist, regenerate and exit.
      if (!this.state.qrCode) {
        clearInterval(interval)
        return this.generateNewQRCode()
      }

      // If no auth status, skip this iteration.
      if (!authStatus) return

      // Handle timed out auth request.
      if (this.timedOutRequestMappings.has(this.state)) {
        try {
          debug('Cancelling timed out auth request.')
          await agent.siopClientRemoveAuthRequestState({
            correlationId: this.state?.authRequestURIResponse?.correlationId,
            definitionId: this.state?.authRequestURIResponse?.definitionId
          })
          this.timedOutRequestMappings.delete(this.state) // only delete after deleted remotely
        } catch (error) {
          debug(error)
          clearInterval(interval)
          return Promise.reject(authStatus.error ?? pollingResponse)
        }
      }

      switch (authStatus.status) {
        case AuthorizationResponseStateStatus.SENT:
          this.props.onAuthRequestRetrieved()
          break
        case AuthorizationResponseStateStatus.VERIFIED:
          if (authStatus.payload) {
            clearInterval(interval)
            this.props.setAuthState(AuthenticationStatus.SIOP)
            return
          }
          break
        default:
          debug(`status during polling: ${JSON.stringify(authStatus)}`)
      }

      pollingResponse = await fetchAuthStatus()
      debug(JSON.stringify(pollingResponse))
    }, 2000)
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setAuthState: (authState: AuthenticationStatus) => {
    dispatch(setAuthState(authState))
  }
})

export default connect(null, mapDispatchToProps)(AuthenticationQR)
