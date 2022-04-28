import axios from 'axios';
import { error, hydrateResult, Result } from 'defekt';
import { useEffect, useState } from 'react';
import { ActionFunction, json, useActionData, useNavigate } from 'remix';
import styled from 'styled-components';
import { StartSessionError, startSessionErrors, UnexpectedError } from '../api/client/calls/sessions/startSessionCommand/startSessionErrors';
import { getClient } from '../api/client/getClient';
import { getSession, setSession } from '../session/storage';
import { Button } from '../components/inputs/buttons/Button';
import { PasswordTextField } from '../components/inputs/textfields/PasswordTextField';
import { TextField } from '../components/inputs/textfields/TextField';
import { Centering } from '../components/layout/Centering';
import { Session } from '../domainModel/Session';
import { FormParameterIsMissing } from '../errors';
import { createLocalTheme } from '../styling/GlobalTheme';

export const action: ActionFunction = async ({
  request
}) => {
  const apiClient = getClient(axios.create({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    baseURL: 'http://localhost:4000/'
  }));
  const formData = await request.formData();
  const handle = formData.get('handle');
  const password = formData.get('password');

  if (!handle || typeof handle !== 'string' || handle.length === 0) {
    return json(new FormParameterIsMissing({ data: { parameter: 'handle' }}));
  }
  if (!password|| typeof password !== 'string' || password.length === 0) {
    return json(new FormParameterIsMissing({ data: { parameter: 'password' }}));
  }

  const startSessionResult = await apiClient.sessions.startSession({ handle: handle!.toString(), password: password!.toString() });

  return json(startSessionResult);
};

const { from } = createLocalTheme(({ globalTheme }) => ({
  backgroundColor: globalTheme.backgroundColor,
  border: {
    color: globalTheme.brandColor,
    radius: globalTheme.borderRadius,
    size: globalTheme.borderSize
  },
  textColor: globalTheme.textColor,
  size: {
    width: globalTheme.size(128)
  },
  headline: {
    size: {
      height: globalTheme.size(12)
    }
  },
  errorMessage: {
    textSize: globalTheme.textSizes.content,
    padding: {
      top: globalTheme.gap(1)
    }
  },
  footer: {
    size: {
      height: globalTheme.size(10)
    },
    padding: {
      horizontal: globalTheme.gap(1)
    }
  },
  body: {
    padding: {
      horizontal: globalTheme.gap(1),
      vertical: globalTheme.gap(1)
    }
  }
}));

const Container = styled.form`
  background-color: ${from(theme => theme.backgroundColor)};
  border: ${from(theme => theme.border.size)} solid ${from(theme => theme.border.color)};
  border-radius: ${from(theme => theme.border.radius)};
  width: ${from(theme => theme.size.width)};
  display: grid;
  grid-template-rows: ${from(theme => theme.headline.size.height)} auto ${from(theme => theme.footer.size.height)};
  grid-template-columns: auto auto auto;
  grid-template-areas:
    "headline headline headline"
    "body body body"
    "footer-left footer-center footer-right";
`;

const Headline = styled.div`
  grid-area: headline;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Body = styled.div`
  grid-area: body;
  padding: ${from(theme => theme.body.padding.vertical)} ${from(theme => theme.body.padding.horizontal)};
`;

const FooterRight = styled.div`
  padding-right: ${from(theme => theme.footer.padding.horizontal)};
  grid-area: footer-right;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${from(theme => theme.errorMessage.textSize)};
  padding-top: ${from(theme => theme.errorMessage.padding.top)};
`;

export default function Login () {
  const navigate = useNavigate();
  const actionData = useActionData<Result<Session, FormParameterIsMissing | StartSessionError>>();
  const [ errorMessage, setErrorMessage ] = useState('');

  useEffect(() => {
    if (!actionData) {
      const getSessionResult = getSession();

      if (!getSessionResult.hasError()) {
        navigate('/tweets', { replace: true });
      }
    }

    if (actionData) {
      const actionResult = hydrateResult<Session, FormParameterIsMissing | StartSessionError>({
        rawResult: actionData,
        potentialErrorConstructors: [ FormParameterIsMissing, ...startSessionErrors ]
      }).unwrapOrDefault(error(new UnexpectedError()));

      if (actionResult.hasError()) {
        setErrorMessage(actionResult.error.message);
      } else {
        setSession(actionResult.value);
        navigate('/app/tweets', { replace: true });
      }
    }
  }, [ actionData, navigate ]);

  return (
    <Centering>
      <Container method='post' action='/login'>
        <Headline>
          Login
        </Headline>

        <Body>
          <TextField
            name='handle'
            placeholder='Handle'
          />
          <PasswordTextField
            name='password'
            placeholder='Password'
            type='password'
          />

          {
            errorMessage && (
              <ErrorMessage>
                { errorMessage }
              </ErrorMessage>
            )
          }
        </Body>

        <FooterRight>
          <Button type='submit' label='Login' />
        </FooterRight>
      </Container>
    </Centering>
  );
};
