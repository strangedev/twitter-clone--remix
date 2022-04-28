import { useEffect } from 'react';
import { json, LoaderFunction, useLoaderData, useNavigate } from 'remix';
import { destroySession } from '../session/storage';

export const loader: LoaderFunction = ({ request }) => {
  const url = new URL(request.url);
  const redirect = url.searchParams.get('redirect') ?? '/';

  return json({ redirect });
};

export default function Logout () {
  const { redirect } = useLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    destroySession();
    navigate(redirect);
  }, []);

  return null;
};
