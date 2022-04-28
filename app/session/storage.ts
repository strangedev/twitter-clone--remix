import { Session } from '../domainModel/Session';
import { startSessionResponseSchema } from '../api/client/calls/sessions/startSessionCommand/startSessionResponseSchema';
import { defekt, error, Result, value } from 'defekt';
import { useEffect, useState } from 'react';

class SessionDoesNotExist extends defekt({ code: 'SessionDoesNotExist' }) {}
class SessionIsInvalid extends defekt({ code: 'SessionIsInvalid' }) {}

const getSession = (): Result<Session, SessionDoesNotExist | SessionIsInvalid> => {
  const serializedSession = window.sessionStorage.getItem('session');

  if (!serializedSession) {
    return error(new SessionDoesNotExist());
  }

  let session: Session;

  try {
    const sessionObject = JSON.parse(serializedSession);

    session = startSessionResponseSchema.parse(sessionObject).unwrapOrThrow();
  } catch (ex: unknown) {
    throw new SessionIsInvalid();
  }

  return value(session);
};

const setSession = (session: Session): void => {
  window.sessionStorage.setItem('session', JSON.stringify(session));
};

const destroySession = (): void => {
  window.sessionStorage.removeItem('session');
};

const useSession = (): Session | null => {
  if (typeof document === 'undefined') {
    return null;
  }
  const getSessionResult = getSession();
  const session = getSessionResult.hasValue() ? getSessionResult.value : null;

  return session;
}

export {
  destroySession,
  getSession,
  setSession,
  useSession
};
