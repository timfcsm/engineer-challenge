import React, { MouseEventHandler } from 'react'
import { classNames } from '../../utils/jsx'

type CommonProps = {
  type?: 'primary' | 'secondary' | 'ghost'
  fill?: boolean
  className?: string
}

type LinkProps<L = boolean> =  L extends true ? {
  link: L
  onClick?: MouseEventHandler<HTMLAnchorElement>
  href: string
} : {
  link?: L
  onClick?: MouseEventHandler<HTMLButtonElement>
  href?: never
}

type Props = CommonProps & LinkProps

const classNamesByType: {[key in NonNullable<Props['type']>]: string} = {
  primary: 'text-white bg-indigo-400 hover:bg-indigo-500 rounded-md shadow-sm',
  secondary: 'text-white bg-gray-600 hover:bg-gray-700 rounded-md shadow-sm',
  ghost: 'text-gray-500 hover:text-gray-900',
}

export const Button: React.FC<Props> = ({ type, children, fill, className, ...props }) => {
  const commonProps = {
    className:classNames([
        'whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent  text-base font-medium',
        classNamesByType[type!],
        fill && 'w-full',
        className,
      ]),
  }

  return props.link ? (
    <a href={props.href} onClick={props.onClick} {...commonProps}>{children}</a>
  ) : (
    <button onClick={props.onClick} {...commonProps}>{children}</button>
  )
}

Button.defaultProps = {
  type: 'primary'
}
