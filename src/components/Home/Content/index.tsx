import React, { ReactElement } from 'react'
import styles from './index.module.css'
import Checkmark from '@images/checkmark.svg'
import topContent from '../../../../content/pages/home/top-content.json'
import followingContents from '../../../../content/pages/home/following-contents.json'
import Container from '@components/@shared/atoms/Container'
import Markdown from '@components/@shared/Markdown'
import HighlightBox from '@components/Home/Content/HighlightBox'
import Button from '@shared/atoms/Button'

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
      <div className={styles.containerMain}>
        <div className={styles.teaser}>
          <span className={styles.subtitleGrey}>{teaser.caption}</span>
          <h3>{teaser.title}</h3>
          <div className={styles.container}>
            <div className={styles.teaser}>
              <Markdown text={teaser.text} />
              <Button to={teaser.button.link} style={'smallInfo'}>
                {teaser.button.text}{' '}
                <span className={styles.smallButtonLandingMain}> {'›'} </span>
              </Button>
            </div>
          </div>
          {teasers.map((teaserItem, index) => (
            <div key={index} className={styles.teaserWrapper}>
              <span className={styles.subtitleGrey}>{teaserItem.caption}</span>
              <h3>{teaserItem.title}</h3>
              <div>
                <div className={styles.container}>
                  <Markdown text={teaserItem.text} />
                </div>
                <div>
                  {teaserItem.sublist &&
                    teaserItem.sublist.map((elem, idx) => (
                      <div key={idx} className={styles.valuesContainer}>
                        <div className={styles.valuesIconWrapper}>
                          <img
                            src={`images/clinical-research/${elem.icon}`}
                            className={styles.clinicalResearchValuesIconImage}
                            alt={'logo'}
                          />
                        </div>
                        <div
                          className={styles.clinicalResearchValueTextContainer}
                        >
                          <p className={styles.clinicalResearchValueTextHeader}>
                            {elem.title}
                          </p>
                          <p className={styles.clinicalResearchValueTextText}>
                            {elem.text}h2
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
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
    </Container>
  )
}
