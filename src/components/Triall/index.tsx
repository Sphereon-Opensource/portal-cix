import React, { ReactElement } from 'react'
import styles from './index.module.css'
import content from '../../../content/pages/aboutTriall.json'
import Container from '@components/@shared/atoms/Container'
import Markdown from '@components/@shared/Markdown'
import Partners from '@components/@shared/Partners'
import HighlightBox from '@components/Home/Content/HighlightBox'
import highlightboxContent from '../../../content/pages/home/top-content.json'
import Button from '@shared/atoms/Button'

interface AboutContent {
  header?: {
    title: string
    body: string
    linkedText: {
      text: string
      link: {
        text: string
        to: string
        color: string
      }
    }
  }
  image?: string
  points?: {
    icon: string
    title: string
    text: string
  }[]
  button?: {
    text: string
    to: string
  }
  getInvolved?: {
    title: string
    text: string
    buttonLabel: string
    link: string
  }
  firstTimeVisiting?: {
    title: string
    text: string
    buttonLabel: string
    link: string
  }
}

export default function AboutPage(): ReactElement {
  const { header, points, button, image }: AboutContent = content
  const { firstTimeVisiting, getInvolved }: AboutContent = highlightboxContent
  return (
    <div className={`${styles.wrapper} ${styles.containerWide}`}>
      <Container className={styles.mainContainer}>
        <div className={styles.main}>
          <div className={styles.content}>
            <h2 className={styles.title}>{header.title}</h2>
            <Markdown className={styles.body} text={header.body} />
            {header.linkedText && (
              <p>
                {header.linkedText.text}
                <a
                  href={header.linkedText.link.to}
                  style={{ color: header.linkedText.link.color }}
                >
                  {header.linkedText.link.text}
                </a>
              </p>
            )}
            <div>
              {points.map((elem, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    marginBottom: '0.5em'
                  }}
                >
                  <div
                    style={{
                      marginRight: '1.5em',
                      padding: '0.5em',
                      backgroundColor: '#f0f4f7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '0.5em'
                    }}
                  >
                    <img
                      src={`images/clinical-research/${elem.icon}`}
                      style={{ width: '4em' }}
                      alt={'logo'}
                    />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <p style={{ fontWeight: 'bold', marginBottom: '0em' }}>
                      {elem.title}
                    </p>
                    <p style={{ fontStyle: 'normal' }}>{elem.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ maxHeight: '0.5em' }}>
              <Button to={button.to} style={'smallInfo'}>
                {button.text}{' '}
                <span className={styles.smallButtonLandingMain}> {'›'} </span>
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.secondarySection}>
          <div className={styles.triallImage}>
            <img src={`images/headerCarousel/${image}`} alt={'triall-iamge'} />
          </div>
          <div className={styles.points}>
            <HighlightBox
              icon="chat"
              title={getInvolved.title}
              body={getInvolved.text}
              buttonLabel={getInvolved.buttonLabel}
              link={getInvolved.link}
              style={'getInvolved'}
            />
            <HighlightBox
              icon="eye"
              title={firstTimeVisiting.title}
              body={firstTimeVisiting.text}
              buttonLabel={firstTimeVisiting.buttonLabel}
              link={firstTimeVisiting.link}
              style={'firstTime'}
            />
          </div>
        </div>
      </Container>
    </div>
  )
}
