import * as React from 'react'
import { Header, HeaderProps } from 'decentraland-ui'
import './Stacks.css'

export type StacksProps = {
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'huge'
  inline?: boolean
  className?: string
  children?: React.ReactChild
}

export class Stacks extends React.Component<StacksProps & HeaderProps> {
  static defaultProps = {
    className: '',
  }

  render() {
    const { size, className, inline, children, ...rest } = this.props
    const classes = `dcl stacks ${inline ? 'inline ' : ''}${className}`.trim()
    return (
      <Header size={size} className={classes} {...rest}>
        <i className="symbol">STX</i>
        {children}
      </Header>
    )
  }
}
