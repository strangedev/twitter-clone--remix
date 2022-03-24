import { Brand } from '../Brand';
import { NavigationEntry } from '../NavigationEntry';
import { Fragment, FunctionComponent, ReactElement } from 'react';
import { useSession } from '../../../../auth/storage';

const Navigation: FunctionComponent = function (): ReactElement {
  const session = useSession();
  const isAuthenticated = session !== null;

  return (
    <div>
      <Brand
        text='Twötter'
        to='/tweets'
      />
      {
        !isAuthenticated && (
          <NavigationEntry
            text='Login'
            to='/login'
          />
        )
      }
      {
        isAuthenticated && (
          <Fragment>
            <NavigationEntry
              text='My Account'
              to={ `/accounts/${session?.handle}` }
            />
            <NavigationEntry
              text='Logout'
              to='/logout'
            />
          </Fragment>
        )
      }
    </div>
  );
};

export {
  Navigation
};
