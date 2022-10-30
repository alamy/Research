import { createContext } from 'react';
import { ITableManagerContextData } from './interfaces';

export const Context = createContext<ITableManagerContextData>({} as ITableManagerContextData);
