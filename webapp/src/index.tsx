import React from 'react'

import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { ScrollToTop } from './components/ScrollToTop'
import WalletProvider from 'decentraland-dapps/dist/providers/WalletProvider'
import TranslationProvider from 'decentraland-dapps/dist/providers/TranslationProvider'
import { Connect } from '@blockstack/connect'
import { UserSession } from 'blockstack'
import './setup'
import './themes'

import * as locales from './modules/translation/locales'
import { store, history } from './modules/store'
import { Routes } from './components/Routes'

import { buildContracts } from './modules/contract/utils'
import './modules/analytics/track'
import './index.css'

buildContracts()

const authOptions = {
  redirectTo: '/',
  finished: ({ userSession }: { userSession: UserSession }) => {
    console.log(userSession.loadUserData())
  },
  appDetails: {
    name: 'Open Riff',
    icon: 'https://example.com/icon.png',
  },
}

const component = (
  <Provider store={store}>
    <TranslationProvider locales={Object.keys(locales)}>
      <WalletProvider>
        <ConnectedRouter history={history}>
          <Connect authOptions={authOptions}>
            <ScrollToTop />
            <Routes />
          </Connect>
        </ConnectedRouter>
      </WalletProvider>
    </TranslationProvider>
  </Provider>
)

ReactDOM.render(component, document.getElementById('root'))
