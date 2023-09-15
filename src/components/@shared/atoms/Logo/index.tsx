import React, { CSSProperties, ReactElement } from 'react'
import LogoAsset from '@images/CIX-logo-v3.svg'
import LogoAssetInverted from '@images/CIX-logo-wit.svg'
import styles from './index.module.css'

export default function Logo({
  inverted,
  style
}: {
  inverted?: boolean
  style?: CSSProperties
}): ReactElement {
  return inverted ? (
    <LogoAssetInverted style={style} className={styles.logo} />
  ) : (
    <LogoAsset style={style} className={styles.logo} />
  )
}
