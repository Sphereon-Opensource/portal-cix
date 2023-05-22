import React, { ReactElement } from 'react'
import styles from './index.module.css'
import Checkmark from '@images/checkmark.svg'
import topContent from '../../../../content/pages/home/top-content.json'
import followingContents from '../../../../content/pages/home/following-contents.json'
import Container from '@components/@shared/atoms/Container'
import Markdown from '@components/@shared/Markdown'
import HighlightBox from '@components/Home/Content/HighlightBox'

interface HomeContentData {
  teaser: {
    caption: string
    title: string
    text: string
    button?: {
      text: string
      link: string
    }
  }
  points?: {
    list: {
      text: string
      subtext?: string
    }[]
    caption: string
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

export default function HomeContent(): ReactElement {
  const { teaser, points, firstTimeVisiting, getInvolved }: HomeContentData =
    topContent
  const teasers = followingContents
  console.log(`${styles.subtitleGrey}`)
  return (
    <Container className={styles.wrapper}>
      <div>
        <span className={styles.subtitleGrey}>{teaser.caption}</span>
        <h2>{teaser.title}</h2>
        <div className={styles.container}>
          <div className={styles.teaser}>
            <Markdown text={teaser.text} />
          </div>
          <div className={styles.secondarySection}>
            <div className={styles.points}>
              <span className={styles.subtitleGrey}>{points.caption}</span>
              {points.list.map((point, i) => (
                <span key={i}>
                  <Checkmark className={styles.checkmark} />
                  <Markdown
                    className={styles.pointText}
                    text={point.text}
                    subtext={point.subtext}
                  />
                </span>
              ))}
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
        </div>
        {teasers.map((teaserItem, index) => (
          <div key={index}>
            <span className={styles.subtitleGrey}>{teaserItem.caption}</span>
            <h2>{teaserItem.title}</h2>
            <div className={styles.teaser}>
              <div className={styles.teaser}>
                <Markdown text={teaserItem.text} />
              </div>
              {teaserItem.sublist &&
                teaserItem.sublist.map((elem, idx) => (
                  <div
                    className={styles.wrapper}
                    style={{ marginTop: 5 }}
                    key={idx}
                  >
                    <div style={{ display: 'inline-flex' }}>
                      <div
                        style={{
                          display: 'inline-block',
                          backgroundColor: 'var(--brand-grey-lighter)',
                          padding: '3px',
                          borderRadius: '7px',
                          marginRight: '8px',
                          width: 24,
                          height: 24
                        }}
                      >
                        <img
                          src={`images/clinical-research/${elem.icon}`}
                          className={styles.logo}
                          style={{ flex: 1 }}
                          // width={24}
                          // height={24}
                          alt={'logo'}
                        />
                      </div>
                      <text style={{ fontWeight: 'bold' }}>{elem.title}</text>
                    </div>
                    <div className={styles.teaser}>{elem.text}</div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </Container>
  )
}
