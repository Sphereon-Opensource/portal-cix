import React, { ReactElement } from 'react'
import LogoAsset from '@images/cix_working_logo.png'
import LogoAssetInverted from '@images/triall-logo-light.svg'
import styles from './index.module.css'
import Image from 'next/image'

export default function Logo({
  inverted
}: {
  inverted?: boolean
}): ReactElement {
  return inverted ? (
    <LogoAssetInverted className={styles.logo} />
  ) : (
    <Image src={LogoAsset} alt="CIX Logo" className={styles.logo} />
  )
}
