import React, { ReactNode, FormEvent, ReactElement, ReactSVG } from 'react'
import Link from 'next/link'
import classNames from 'classnames/bind'
import styles from './index.module.css'

const cx = classNames.bind(styles)

export interface ButtonProps {
  children: ReactNode
  className?: string
  href?: string
  onClick?: (e: FormEvent) => void
  disabled?: boolean
  to?: string
  name?: string
  size?: 'small'
  style?: 'primary' | 'ghost' | 'outline' | 'text' | 'firstTime' | 'getInvolved'
  type?: 'submit'
  download?: boolean
  target?: string
  rel?: string
  title?: string
  arrow?: boolean
  icon?: ReactSVG
}

export default function Button({
  icon,
  href,
  children,
  className,
  to,
  size,
  style,
  arrow,
  ...props
}: ButtonProps): ReactElement {
  const styleClasses = cx({
    button: true,
    primary: style === 'primary',
    ghost: style === 'ghost',
    outline: style === 'outline',
    text: style === 'text',
    small: size === 'small',
    [className]: className
  })

  const buttonStyle =
    style === 'firstTime'
      ? { color: 'black' }
      : style === 'getInvolved'
      ? { color: 'white' }
      : {}

  const buttonContent = (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {icon &&
        React.cloneElement(icon, {
          style: { marginRight: '10px', width: '24px', height: '24px' }
        })}
      {children}
      {arrow && <>&nbsp;&#8594;</>}
    </div>
  )

  return to ? (
    <Link href={to} className={styleClasses} {...props}>
      {buttonContent}
    </Link>
  ) : href ? (
    <a
      href={href}
      className={styleClasses}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {buttonContent}
    </a>
  ) : (
    <button className={styleClasses} style={buttonStyle}>
      {buttonContent}
    </button>
  )
}
