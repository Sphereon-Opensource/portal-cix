import { markdownToHtml } from '@utils/markdown'
import React, { ReactElement } from 'react'
import styles from './index.module.css'

const Markdown = ({
  text,
  subtext,
  blockImages,
  className
}: {
  text: string
  subtext?: string
  blockImages?: boolean
  className?: string
}): ReactElement => {
  const content = !blockImages
    ? markdownToHtml(text)
    : markdownToHtml(text).replaceAll(
        /<img[\w\W]+?\/?>/g,
        `<img src="/images/image_blocked_placeholder.png" alt="Blocked image placeholder" class="${styles.blockedContentImage}" />`
      )
  const subContent = subtext ? markdownToHtml(subtext) : null
  return (
    <div className={`${styles.markdown}`}>
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        style={{
          ...(className === 'getInvolved' && { color: 'white' }),
          ...(className === 'firstTime' && { color: 'black' }),
          ...{ fontSize: 'x-large' }
        }}
      />
      {subContent && (
        <div
          style={{ fontWeight: 'normal' }}
          className={styles.subtext} // add a class for subtext styling
          dangerouslySetInnerHTML={{ __html: subContent }}
        />
      )}
    </div>
  )
}

export default Markdown
