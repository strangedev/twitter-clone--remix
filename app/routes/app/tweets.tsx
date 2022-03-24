import axios from 'axios';
import { Fragment, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoaderData } from "remix";
import { VerticalSpace } from '~/components/layout/VerticalSpace';
import { getClient } from '../../api/client/getClient';
import { Tweet } from '../../components/entities/Tweet';
import { FloatingTweetPublisher } from '../../components/interactions/publishTweet/smartComponent/FloatingTweetPublisher';
import { Headline } from '../../components/typography/Headline';
import { Tweet as TweetModel } from '../../domainModel/Tweet';

export const loader = async () => {
  const apiClient = getClient(axios.create({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    baseURL: 'http://localhost:4000/'
  }));
  const getEveryonesTweetsResults = await apiClient.tweets.getEveryonesTweets();

  if (getEveryonesTweetsResults.hasError()) {
    return [];
  }

  return getEveryonesTweetsResults.value;
};

export default function Tweets () {
  const tweets = useLoaderData<TweetModel[]>();
  const { t } = useTranslation('tweets');

  return (
    <Fragment>
      <Headline>{ t('recent') }</Headline>
      <div>
      {
        tweets.map(
          (tweet): ReactElement => (
            <Fragment>
              <Tweet key={ `${tweet.account}-${tweet.publishedAt}` } tweet={ tweet } />
              <VerticalSpace />
            </Fragment>
          )
        )
      }
      </div>
      <FloatingTweetPublisher />
    </Fragment>
  );
};
