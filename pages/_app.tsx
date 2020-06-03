import App from 'next/app';
import GlobalStyles from '../styles/globalStyles';

class NotionToolsApp extends App {


  public render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <GlobalStyles/>
        <Component {...pageProps} />
      </>
    )
  }
}

export default NotionToolsApp;