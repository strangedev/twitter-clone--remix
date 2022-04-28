import axios from 'axios';
import { ActionFunction, json, LoaderFunction, redirect } from 'remix';
import { ParseError } from 'validate-value';
import { InternalServerError, TextTooLong } from '~/api/client/calls/tweets/publishTweetCommand/publishTweetErrors';
import { Unauthorized } from '~/api/client/commonErrors/Unauthorized';
import { getClient } from '~/api/client/getClient';

const publishTweet: ActionFunction = async ({ request }) => {
  const apiClient = getClient(axios.create({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    baseURL: 'http://localhost:4000/'
  }));

  const formData = await request.formData();
  const text = formData.get('text')!.toString();
  const token = formData.get('token')!.toString();

  const publishResult = await apiClient.tweets.publishTweet({
    token,
    text
  });

  if (publishResult.hasError()) {
    const error = publishResult.error;

    switch (error.code) {
      case ParseError.code:
        return json({ error }, 400);
      case Unauthorized.code:
        return redirect('/unauthorized');
      case TextTooLong.code:
        return json({ error }, 400);
      case InternalServerError.code:
        return json({ error }, 500);
      default:
        throw error;
    }
  }

  return json({ success: true }, 200);
};

export {
  publishTweet
};
