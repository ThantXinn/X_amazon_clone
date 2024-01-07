import MainLayout from '@/components/MainLayout';
import { persistor, store } from '@/store/store';
import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { PersistGate } from 'redux-persist/integration/react';

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <SessionProvider session={session}>
          <div className='font-bodyFont bg-gray-300'>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
          </div>
        </SessionProvider>
      </PersistGate>
    </Provider>
  );
}
