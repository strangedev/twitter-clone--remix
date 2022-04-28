import { FloatingComposeNewTweetButton } from '../FloatingPublishTweetButton';
import { FloatingTweetComposer } from '../FloatingTweetComposer';
import { Fragment, FunctionComponent, ReactElement, useState } from 'react';
import { useSession } from '~/session/storage';

const FloatingTweetPublisher: FunctionComponent = function (): ReactElement | null {
  const session = useSession();
  const isAuthenticated = session !== null;

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
            onCancel={
              (): void => {
                setIsComposerOpen(false);
              }
            }
            onPublish={
              (): void => {
                setIsComposerOpen(false);
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
