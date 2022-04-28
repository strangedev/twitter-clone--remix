import { ActionFunction } from 'remix';
import { publishTweet } from '~/api/remixWrappers/publishTweet';

export const action: ActionFunction = async (args) => {
  return publishTweet(args);
};

export default function Null () {
  return null;
};
