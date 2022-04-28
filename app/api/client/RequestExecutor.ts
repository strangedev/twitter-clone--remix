import { Result } from 'defekt';
import { ParseError } from 'validate-value';

type RequestExecutor<TParameters, TResponseData, TError extends Error> =
  (parameters: TParameters) => Promise<Result<TResponseData, TError | ParseError>>;

type RequestParameters<TRequestExecutor> =
  TRequestExecutor extends RequestExecutor<infer TParameters, any, any> ?
    TParameters :
    never;

type ResponseData<TRequestExecutor> =
  TRequestExecutor extends RequestExecutor<any, infer TResponseData, any> ?
    TResponseData :
    never;

type ExecutorError<TRequestExecutor> =
  TRequestExecutor extends RequestExecutor<any, any, infer TError> ?
    TError | ParseError :
    never;

type ExecutorResult<TRequestExecutor> =
  Result<ResponseData<TRequestExecutor>, ExecutorError<TRequestExecutor>>;

export type {
  ExecutorError,
  ExecutorResult,
  ResponseData,
  RequestParameters,
  RequestExecutor
};
