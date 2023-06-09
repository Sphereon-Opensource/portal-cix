import React, { ReactElement } from 'react'
import Page from '@components/@shared/Page'
import Triall from '../components/Triall'
import { useRouter } from 'next/router'

export default function PageGaiaX(): ReactElement {
  const router = useRouter()

  return (
    <Page uri={router.route}>
      <Triall />
    </Page>
  )
}
