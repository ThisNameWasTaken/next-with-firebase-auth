/* eslint react/jsx-props-no-spreading: 0 */

import React from 'react';
import { get } from 'lodash/object';
import { AuthUserInfoContext } from '../auth/hooks';

// Provides an AuthUserInfo prop to the composed component.
export default function withAuthUserInfo(ComposedComponent) {
  const WithAuthUserInfoComp = props => {
    const { AuthUserInfo: AuthUserInfoFromSession, ...otherProps } = props;
    return (
      <AuthUserInfoContext.Consumer>
        {AuthUserInfo => (
          <ComposedComponent
            {...otherProps}
            AuthUserInfo={AuthUserInfo || AuthUserInfoFromSession}
          />
        )}
      </AuthUserInfoContext.Consumer>
    );
  };

  WithAuthUserInfoComp.getInitialProps = async ctx => {
    const { AuthUserInfo } = ctx;

    // Evaluate the composed component's getInitialProps().
    let composedInitialProps = {};
    if (ComposedComponent.getInitialProps) {
      composedInitialProps = await ComposedComponent.getInitialProps(ctx);
    }

    return {
      ...composedInitialProps,
      AuthUserInfo,
    };
  };

  return WithAuthUserInfoComp;
}
