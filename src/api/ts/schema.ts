import type { GetServerSidePropsContext } from 'next';
import type { QueryFunctionContext } from '@tanstack/react-query';
import type { Options } from 'ky';

export interface SchemaHeader {
  resultCode: number;
  resultMessage: string;
}

export interface Schema<S = any, E = any> {
  header: SchemaHeader;
  data: S;
  errorData: E;
}

export type BaseResponse<R = unknown> = R;

export type ApiResponse<S = any, E = unknown> = BaseResponse<Schema<S, E>>;

export type BaseApiOptions = {
  ctx?: GetServerSidePropsContext;
  key?: QueryFunctionContext;
  ky?: Options | undefined;
};
