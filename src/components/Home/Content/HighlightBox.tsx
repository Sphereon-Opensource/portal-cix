import React, { ReactElement } from 'react'
import styles from './HighlightBox.module.css'
import Eye from '@images/eye.svg'
import Chat from '@images/chat.svg'
import Catalogue from '@images/catalogueIcon.svg'
import QuickStart from '@images/noun-manual-3556190-052530.svg'
import ScheduleACall from '@images/noun-reservation-2548878-052530.svg'
import Markdown from '@components/@shared/Markdown'
import Button from '@components/@shared/atoms/Button'

const icons = {
  eye: <Eye />,
  catalogue: <Catalogue />,
  chat: <Chat />,
  scheduleACall: <ScheduleACall />,
  quickStart: <QuickStart />
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
        <h3
          style={style === 'getInvolved' ? { color: 'white' } : {}}
          className={styles.boxTitle}
        >
          {title}
        </h3>
      </span>
      {style === 'getInvolved' ? (
        <Markdown text={body} className={'getInvolved'} />
      ) : (
        <Markdown text={body} />
      )}
      {style === 'getInvolved' || style === 'firstTime' ? (
        <Button
          style={style}
          to={link}
          icon={style === 'getInvolved' ? <ScheduleACall /> : <QuickStart />}
        >
          {buttonLabel}
        </Button>
      ) : (
        <Button style={style} to={link}>
          {buttonLabel}
        </Button>
      )}
    </div>
  )
}
