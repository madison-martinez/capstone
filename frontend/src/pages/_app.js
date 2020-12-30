import App from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../actions/store';
import Page from '../components/Page';



function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <Page>
                <Component {...pageProps } />
            </Page>
        </Provider>
    );
}

MyApp.getInitialProps = async function({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // this exposes the url params to the page component so we can use things like item ID in our queries
    pageProps.query = ctx.query;
    return { pageProps };
  };

export default MyApp;