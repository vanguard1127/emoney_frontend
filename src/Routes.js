import React, { Suspense, Fragment, lazy } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ClimbingBoxLoader } from 'react-spinners';
import {FormattedMessage} from 'react-intl'
// Layout Blueprints
import { MinimalLayout, PresentationLayout } from './layout';

const Login = lazy(() => import('./screens/auth/Login'));
const SignInForm = lazy(() => import('./components/Auth/SignInForm'));
const OtpForm = lazy(() => import('./components/Auth/OtpForm'));

const Transaction = lazy(() => import('./screens/admin/Transaction'));
const NotAuthRoute = lazy(() => import('components/Routes/NotAuthRoute'));

const SuspenseLoading = () => {
  return (
    <Fragment>
      <div className="d-flex align-items-center flex-column vh-100 justify-content-center text-center py-3">
        <div className="d-flex align-items-center flex-column px-4">
          <ClimbingBoxLoader color={'#5383ff'} loading={true} />
        </div>
        <div className="text-muted font-size-xl text-center pt-3">
          <FormattedMessage
            id="suspenseloading.text1"
            defaultMessage="Please wait while we load the live preview examples"
          />
          <span className="font-size-lg d-block text-dark">
            <FormattedMessage
              id="suspenseloading.text2"
              defaultMessage="This live preview instance can be slower than a real production build!"
            />
          </span>
        </div>
      </div>
    </Fragment>
  );
};

const Routes = ({ dispatch }) => {
  return (
    <Suspense fallback={<SuspenseLoading />}>
      <Switch>
        <Redirect exact from="/" to="/user/signin" />
        <Route path={['/user/signin', '/user/otp']}>
          <MinimalLayout>
            <NotAuthRoute
              path="/user/signin"
              component={() => {
                return <Login component={SignInForm} />;
              }}
            />
            <NotAuthRoute
              path="/user/otp"
              component={() => {
                return <Login component={OtpForm} />;
              }}
            />
          </MinimalLayout>
        </Route>
        <Route path={['/admin/transaction']}>
          <PresentationLayout>
            <NotAuthRoute path="/admin/transaction" component={Transaction} />
          </PresentationLayout>
        </Route>
      </Switch>
    </Suspense>
  );
}

const state = createStructuredSelector({});
export default connect(state)(Routes);
