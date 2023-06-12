import React, { ReactElement } from 'react'
import LogoAsset from '@images/CIX-logo-v2.svg'
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
    <LogoAsset className={styles.logo} />
  )
}
