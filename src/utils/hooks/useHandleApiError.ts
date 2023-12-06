import * as React from 'react';

import { ApiErrors, MaintenanceServerError, RequestAbortedError, ServerTimeoutError, SessionTimeOutError } from '../configs/apiErrors';
import { useCallbackRef } from './useCallbackRef';

type UseHandleApiErrorReturnType = {
  handleApiError: (error: Error) => void;
};

type HandleApiOptions = {
  onCommonError?: () => void;
  onSessionTimeoutError?: () => void;
};

export function useHandleApiError(option: HandleApiOptions = {}): UseHandleApiErrorReturnType {
  const onCommonErrorRef = useCallbackRef(option.onCommonError);
  const onSessionTimeoutErrorRef = useCallbackRef(option.onSessionTimeoutError);

  const handleApiError = React.useCallback(
    (error: ApiErrors) => {
      if (error instanceof SessionTimeOutError) {
        if (onSessionTimeoutErrorRef.current) {
          onSessionTimeoutErrorRef.current();
          return;
        } else {
          // TODO: show session timeout alert here using hook
          // alert component will be created later
          // eslint-disable-next-line no-console
          console.log(error);
          return;
        }
      }

      if (error instanceof MaintenanceServerError) {
        // TODO: show mainternance timeout alert here using hook
        // alert component will be created later
        // eslint-disable-next-line no-console
        console.log(error);
        return;
      }

      if (error instanceof ServerTimeoutError || error instanceof RequestAbortedError) {
        // TODO: show server  timeout alert here using hook
        // alert component will be created later
        // eslint-disable-next-line no-console
        console.log(error);
        return;
      }

      if (onCommonErrorRef.current) {
        onCommonErrorRef.current();
      } else {
        // TODO: show server error alert here using hook
        // alert component will be created later
        // eslint-disable-next-line no-console
        console.log(error);
      }
    },
    [onCommonErrorRef, onSessionTimeoutErrorRef],
  );

  return { handleApiError };
}
