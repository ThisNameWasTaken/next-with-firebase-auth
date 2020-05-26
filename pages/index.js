import Link from 'next/link';
import Router from 'next/router';
import withAuthUser from '../utils/pageWrappers/withAuthUser';
import withAuthUserInfo from '../utils/pageWrappers/withAuthUserInfo';
import logout from '../utils/auth/logout';

const Index = props => {
  const { AuthUserInfo, data } = props;
  const { AuthUser } = AuthUserInfo;
  const { favoriteFood } = data;

  return (
    <div>
      <p>Hi there!</p>
      {!AuthUser ? (
        <p>
          You are not signed in.{' '}
          <Link href="/auth">
            <a>Sign in</a>
          </Link>
        </p>
      ) : (
        <div>
          <p>You're signed in. Email: {AuthUser.email}</p>
          <p
            style={{
              display: 'inlinelock',
              color: 'blue',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
            onClick={async () => {
              try {
                await logout();
                Router.push('/auth');
              } catch (e) {
                console.error(e);
              }
            }}
          >
            Log out
          </p>
        </div>
      )}
      <div>
        <Link href="/example">
          <a>Another example page</a>
        </Link>
      </div>
      <div>
        <div>Your favorite food is {favoriteFood}.</div>
      </div>
    </div>
  );
};

// Just an example.
const mockFetchData = async userId => ({
  user: {
    ...(userId && {
      id: userId,
    }),
  },
  favoriteFood: 'pizza',
});

Index.getInitialProps = async ctx => {
  // The AuthUserInfo object is available on both the server and client.
  const { AuthUserInfo } = ctx;
  const AuthUser = { AuthUserInfo };

  // You can fetch data here.
  const data = await mockFetchData(AuthUser.id);

  return {
    data,
  };
};

// Use `withAuthUser` to get the authed user server-side, which
// disables static rendering.
// Use `withAuthUserInfo` to include the authed user as a prop
// to your component.
export default withAuthUser(withAuthUserInfo(Index));
