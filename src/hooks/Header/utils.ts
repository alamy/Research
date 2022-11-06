/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import { createContext } from 'react';
import * as I from './interfaces';

export const Context = createContext<I.IHeaderManagerContextData>(
  {} as I.IHeaderManagerContextData
);
