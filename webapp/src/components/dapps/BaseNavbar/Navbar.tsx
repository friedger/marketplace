import * as React from 'react'

import { Navbar as NavbarComponent, NavbarI18N } from '../../ui/Navbar/Navbar'

import { NavbarProps } from './Navbar.types'
import { T } from 'decentraland-dapps/dist/modules/translation/utils'

export default class Navbar extends React.PureComponent<NavbarProps> {
  getTranslations = (): NavbarI18N | undefined => {
    if (!this.props.hasTranslations) {
      return undefined
    }
    return {
      menu: {
        marketplace: <T id="@dapps.navbar.menu.marketplace" />,
        blog: <T id="@dapps.navbar.menu.blog" />,
      },
      account: {
        connecting: <T id="@dapps.navbar.account.connecting" />,
        signIn: <T id="@dapps.navbar.account.signIn" />,
      },
    }
  }

  render() {
    return <NavbarComponent {...this.props} i18n={this.getTranslations()} />
  }
}
