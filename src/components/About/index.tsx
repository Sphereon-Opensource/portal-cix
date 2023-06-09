import React, { ReactElement } from 'react'
import styles from './index.module.css'
import TriallLogo from '@images/gaia-x-logo.svg'
import GearIcon from '@images/gear_icon.svg'
import ShoppingCartIcon from '@images/shopping_cart.svg'
import CIXLogo from '@images/cix_working_logo.png'
import content from '../../../content/pages/aboutCix.json'
import Container from '@components/@shared/atoms/Container'
import Markdown from '@components/@shared/Markdown'
import Button from '@components/@shared/atoms/Button'
import Image from 'next/image'

const icons = {
  gear: <GearIcon />,
  cart: <ShoppingCartIcon />,
  logo: <Image src={CIXLogo} alt="CIX Logo" />
}

interface TriallContent {
  title: string
  topSection: {
    text: string
    interactivity: {
      image: string
      link: string
    }
    cta: {
      label: string
      link: string
    }
  }[]
  hero: {
    header: string
    points: string[]
  }
  footer: {
    text: string
    disclaimer: string
    cards: {
      title: string
      body: string
      icon: string
    }[]
  }
  image: string
}

export default function TriallPage(): ReactElement {
  const { title, topSection, hero, image }: TriallContent = content

  return (
    <div className={styles.wrapper}>
      <div className={styles.media}>
        <img src={image} className={styles.image} />
      </div>
      <Container className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {topSection.map((section, i) => (
          <div key={i} className={styles.section}>
            <a
              className={styles.desktopInteractivity}
              href={section.interactivity.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={section.interactivity.image} />
            </a>
            <div className={styles.sectionText}>
              <Markdown text={section.text} />
              <a
                className={styles.mobileInteractivity}
                href={section.interactivity.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={section.interactivity.image} />
              </a>
              <Button
                style="primary"
                href={section.cta.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {section.cta.label}
              </Button>
            </div>
          </div>
        ))}
      </Container>
      <div className={styles.heroWrapper}>
        <Container className={styles.heroContainer}>
          <Markdown className={styles.heroHeader} text={hero.header} />
          <ul>
            {hero.points.map((point, i) => (
              <li key={i}>
                <Markdown text={point} />
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </div>
  )
}
