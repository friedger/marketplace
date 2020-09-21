import React from 'react'
import { Page } from 'decentraland-ui'

import { Navbar } from '../Navbar'
import { Footer } from '../Footer'
import './SignInPage.css'

import { Button, Text, Box, space, ButtonGroup } from '@blockstack/ui'
import { useConnect, AuthOptions } from '@blockstack/connect'
import { Props } from './SignInPage.types'
import { locations } from '../../modules/routing/locations'

const SignIn = (props: Props) => {
  const { onNavigate } = props

  const { doOpenAuth } = useConnect()
  const opts: Partial<AuthOptions> = {
    onFinish: (payload) => {
      console.log(payload.userSession)
      onNavigate(locations.browse())
    },
  }
  return (
    <Box>
      <Text display="block" textStyle="body.large">
        Get Started
      </Text>
      <ButtonGroup spacing={space('base')} mt={space('base-loose')}>
        <Button
          size="lg"
          onClick={() => doOpenAuth(true, opts)}
          data-test="sign-in"
        >
          Sign in
        </Button>
        <Button
          size="lg"
          mode="tertiary"
          onClick={() => doOpenAuth(false, opts)}
          data-test="sign-up"
        >
          Sign up
        </Button>
      </ButtonGroup>
    </Box>
  )
}

const SignInPage = (props: Props) => {
  return (
    <>
      <Navbar isFullscreen />
      <Page className="SignInPage" isFullscreen>
        <SignIn wallet={props.wallet} onNavigate={props.onNavigate} />
      </Page>
      <Footer isFullscreen />
    </>
  )
}

export default React.memo(SignInPage)
