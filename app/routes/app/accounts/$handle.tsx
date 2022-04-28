import axios from 'axios';
import { Fragment } from 'react';
import { json, LoaderFunction, Outlet, useLoaderData } from 'remix';
import { getClient } from '~/api/client/getClient';
import { Account as AccountComponent } from '~/components/entities/Account';

export const loader: LoaderFunction = async ({ params }) => {
  const apiClient = getClient(axios.create({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    baseURL: 'http://localhost:4000/'
  }));

  const handle = params.handle!;
  const account = (await apiClient.accounts.getAccount({ handle })).unwrapOrThrow();

  return json(account);
};

export default function Account () {
  const account = useLoaderData();

  return (
    <Fragment>
      <AccountComponent account={ account } />
      <Outlet />
    </Fragment>
  )
};
