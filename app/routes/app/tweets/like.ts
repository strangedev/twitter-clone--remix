import { ActionFunction, json } from 'remix';

export const action: ActionFunction = async ({ request }) => {
  return json({ success: true }, 200);
};

export default function Null () {
  return null;
};

