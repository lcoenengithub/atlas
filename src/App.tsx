import { ApolloProvider } from '@apollo/client'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { AnalyticsManager } from '@/AnalyticsManager'
import { createApolloClient } from '@/api'
import { OperatorsContextProvider } from '@/providers/assets'
import { ConfirmationModalProvider } from '@/providers/confirmationModal'
import { GlobalStyles } from '@/styles'

import { MainLayout } from './MainLayout'
import { AssetsManager } from './providers/assets'
import { OverlayManagerProvider } from './providers/overlayManager'
import { Snackbars } from './providers/snackbars'

export const App = () => {
  // App doesn't accept props and doesn't contain state so should never rerender
  const apolloClient = createApolloClient()

  return (
    <>
      <GlobalStyles />
      <AnalyticsManager />
      <ApolloProvider client={apolloClient}>
        <BrowserRouter>
          <OverlayManagerProvider>
            <OperatorsContextProvider>
              <ConfirmationModalProvider>
                <MainLayout />
                <Snackbars />
                <AssetsManager />
              </ConfirmationModalProvider>
            </OperatorsContextProvider>
          </OverlayManagerProvider>
        </BrowserRouter>
      </ApolloProvider>
    </>
  )
}
