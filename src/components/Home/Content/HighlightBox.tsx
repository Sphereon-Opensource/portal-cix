import React, { ReactElement } from 'react'
import styles from './HighlightBox.module.css'
import Eye from '@images/eye.svg'
import Chat from '@images/chat.svg'
import Catalogue from '@images/catalogueIcon.svg'
import Markdown from '@components/@shared/Markdown'
import Button from '@components/@shared/atoms/Button'

const icons = {
  eye: <Eye />,
  catalogue: <Catalogue />,
  chat: <Chat />
}

export default function HighlightBox({
  icon,
  title,
  body,
  buttonLabel,
  link,
  style
}: {
  icon: keyof typeof icons
  title: string
  body: string
  buttonLabel: string
  link: string
  style: string
}): ReactElement {
  return (
    <div
      className={`styles.container ${
        style === 'getInvolved'
          ? styles.getInvolvedContainer
          : styles.firstTimeContainer
      }`}
    >
      <span
        className={`styles.container ${
          style === 'getInvolved'
            ? styles.getInvolvedHeading
            : styles.firstTimeHeading
        }`}
      >
        <span className={styles.icon}>{icons[icon]}</span>
        <h3 style={style === 'getInvolved' ? { color: 'white' } : {}}>
          {title}
        </h3>
      </span>
      {style === 'getInvolved' ? (
        <Markdown text={body} className={'getInvolved'} />
      ) : (
        <Markdown text={body} />
      )}
      <Button style={`${style}`} to={link}>
        {buttonLabel}
      </Button>
    </div>
  )
}
