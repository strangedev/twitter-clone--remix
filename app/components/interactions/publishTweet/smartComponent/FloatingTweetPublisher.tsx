import axios from 'axios';
import { FloatingComposeNewTweetButton } from '../FloatingPublishTweetButton';
import { FloatingTweetComposer } from '../FloatingTweetComposer';
import { getClient } from '../../../../api/client/getClient';
import { Fragment, FunctionComponent, ReactElement, useState } from 'react';
import { useSession } from '../../../../auth/storage';

const FloatingTweetPublisher: FunctionComponent = function (): ReactElement | null {
  const apiClient = getClient(axios.create({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    baseURL: 'http://localhost:4000/'
  }));
  const session = useSession();
  const isAuthenticated = session !== null;

  const [ draftTweet, setDraftTweet ] = useState<string>('');
  const [ isComposerOpen, setIsComposerOpen ] = useState<boolean>(false);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Fragment>
      <FloatingComposeNewTweetButton
        onComposeNewTweet={
          (): void => {
            setIsComposerOpen(true);
          }
        }
      />
      {
        isComposerOpen && (
          <FloatingTweetComposer
            onChange={
              (text): void => {
                setDraftTweet(text);
              }
            }
            onCancel={
              (): void => {
                setIsComposerOpen(false);
              }
            }
            onPublish={
              (): void => {
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
              }
            }
          />
        )
      }
    </Fragment>
  );
};

export {
  FloatingTweetPublisher
};
