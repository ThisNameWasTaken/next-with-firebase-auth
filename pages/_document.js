import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class CustomDocument extends Document {
  render() {
    // Store initial props from request data that we need to use again on
    // the client. See:
    // https://github.com/zeit/next.js/issues/3043#issuecomment-334521241
    // https://github.com/zeit/next.js/issues/2252#issuecomment-353992669
    // Alternatively, you could use a store, like Redux.
    const { AuthUserInfo } = this.props;

    return (
      <Html>
        <Head>
          <script id="__MY_AUTH_USER_INFO" type="application/json">
            {JSON.stringify(AuthUserInfo, null, 2)}
          </script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

CustomDocument.getInitialProps = async ctx => {
  // Get the AuthUserInfo object. This is set if the server-rendered page
  // is wrapped in the `withAuthUser` higher-order component.
  const { AuthUserInfo } = ctx;

  const initialProps = await Document.getInitialProps(ctx);
  return { ...initialProps, AuthUserInfo };
};

export default CustomDocument;
