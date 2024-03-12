import { Provider as StoreProvider } from 'react-redux';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import leoProfanity from 'leo-profanity';
import i18n from './i18n';
import store from './slices/store';
import AuthProvider from './providers/AuthProvider';
import rollbarConfig from './utils/rollbarConfig';
import SocketProvider from './providers/SocketProvider';
import App from './App';

const ruDictionary = leoProfanity.getDictionary('ru');
leoProfanity.add(ruDictionary);

const init = () => (
  <React.StrictMode>
    <StoreProvider store={store}>
      <I18nextProvider i18n={i18n}>
        <AuthProvider>
          <RollbarProvider config={rollbarConfig}>
            <ErrorBoundary>
              <SocketProvider>
                <App />
              </SocketProvider>
            </ErrorBoundary>
          </RollbarProvider>
        </AuthProvider>
      </I18nextProvider>
    </StoreProvider>
  </React.StrictMode>
);

export default init;
