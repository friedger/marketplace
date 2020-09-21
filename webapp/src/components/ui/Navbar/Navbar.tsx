import * as React from 'react'
import { Menu, Responsive } from 'semantic-ui-react'
import { Blockie, Container, Header } from 'decentraland-ui'

import './Navbar.css'
import { Stacks } from '../Stacks/Stacks'
import { Logo } from '../Logo/Logo'

export type NavbarI18N = {
  menu: {
    marketplace: React.ReactNode
    blog: React.ReactNode
  }
  account: {
    signIn: React.ReactNode
    connecting: React.ReactNode
  }
}

export type NavbarProps = {
  stacks?: number
  address?: string
  activePage?: 'marketplace' | 'blog' | string
  leftMenu?: React.ReactNode
  middleMenu?: React.ReactNode
  rightMenu?: React.ReactNode
  i18n: NavbarI18N
  isConnected?: boolean
  isConnecting?: boolean
  isSignIn?: boolean
  isFullscreen?: boolean
  isOverlay?: boolean
  className?: string
  onSignIn?: () => void
  onClickAccount?: () => void
}

export type NavbarState = {
  toggle: boolean
}

export class Navbar extends React.PureComponent<NavbarProps, NavbarState> {
  static defaultProps: Partial<NavbarProps> = {
    address: undefined,
    activePage: undefined,
    leftMenu: undefined,
    middleMenu: undefined,
    i18n: {
      menu: {
        marketplace: 'Marketplace',
        blog: 'Blog',
      },
      account: {
        signIn: 'Sign In',
        connecting: 'Connecting...',
      },
    },
    isConnected: false,
    isConnecting: false,
    isFullscreen: false,
    isOverlay: false,
    isSignIn: false,
    onSignIn: undefined,
    onClickAccount: undefined,
  }
  public state = {
    toggle: false,
  }
  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick)
  }
  handleToggle = (event: any) => {
    this.setState({ toggle: !this.state.toggle })
    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()
  }
  handleDocumentClick = () => {
    this.setState({ toggle: false })
  }

  renderLeftMenu() {
    const { activePage, i18n, leftMenu } = this.props
    if (leftMenu) {
      return leftMenu
    }
    return (
      <>
        <Menu.Item active={activePage === 'marketplace'} href="/">
          {i18n.menu.marketplace}
        </Menu.Item>
        <Menu.Item
          active={activePage === 'blog'}
          href="https://app.sigle.io/friedger.id"
        >
          {i18n.menu.blog}
        </Menu.Item>
      </>
    )
  }

  renderRightMenu() {
    const {
      rightMenu,
      middleMenu,
      isConnected,
      onClickAccount,
      stacks,
      address,
      isConnecting,
      isSignIn,
      i18n,
      onSignIn,
    } = this.props
    if (rightMenu) {
      return rightMenu
    } else if (isConnected) {
      return (
        <>
          {middleMenu ? (
            <Responsive
              as={Menu}
              secondary
              className="dcl navbar-account-menu"
              minWidth={Responsive.onlyTablet.minWidth}
            >
              {middleMenu}
            </Responsive>
          ) : null}
          <span
            className={`dcl account-wrapper ${
              onClickAccount ? 'clickable' : ''
            }`}
            onClick={onClickAccount}
          >
            {stacks !== undefined ? (
              <Stacks size="small" title={`${stacks.toLocaleString()} STX`}>
                {parseInt(stacks.toFixed(0), 10).toLocaleString()}
              </Stacks>
            ) : null}
            {address !== undefined ? <Blockie seed={address} /> : null}
          </span>
        </>
      )
    } else if (isConnecting && !isSignIn) {
      return (
        <Menu secondary>
          <Menu.Item disabled>{i18n.account.connecting}</Menu.Item>
        </Menu>
      )
    } else if (onSignIn || isSignIn) {
      return (
        <Menu secondary>
          <Menu.Item className="sign-in-button" onClick={onSignIn}>
            {i18n.account.signIn}
          </Menu.Item>
        </Menu>
      )
    } else {
      return null
    }
  }

  render() {
    const {
      activePage,
      className,
      isSignIn,
      isFullscreen,
      isOverlay,
    } = this.props

    let classes = `dcl navbar`

    if (this.state.toggle) {
      classes += ' open'
    }

    if (isSignIn) {
      classes += ' sign-in'
    }

    if (isFullscreen) {
      classes += ' fullscreen'
    }

    if (isOverlay) {
      classes += ' overlay'
    }

    if (className) {
      classes += ` ${className}`
    }

    return (
      <div className={classes} role="navigation">
        <Container>
          <div className="dcl navbar-menu">
            <Responsive
              as={Menu}
              secondary
              stackable
              minWidth={Responsive.onlyTablet.minWidth}
            >
              <a className="dcl navbar-logo" href="/">
                <Logo />
              </a>
              {this.renderLeftMenu()}
            </Responsive>
            <Responsive
              {...Responsive.onlyMobile}
              className="dcl navbar-mobile-menu"
            >
              <a className="dcl navbar-logo" href="/">
                <Logo />
              </a>
              <Header
                size="small"
                className={`dcl active-page ${
                  this.state.toggle ? 'caret-up' : 'caret-down'
                }`}
                onClick={this.handleToggle}
              >
                {activePage}
              </Header>
            </Responsive>
          </div>

          <div className="dcl navbar-account">{this.renderRightMenu()}</div>
        </Container>
        <div className="mobile-menu">{this.renderLeftMenu()}</div>
      </div>
    )
  }
}
