import React, { useState, useContext, useCallback } from 'react';

import * as U from './utils';
import * as I from './interfaces';

export const HeaderManagerProvider: React.FC<I.IHeaderManager> = ({ children }) => {
  const [items, setItems] = useState<I.IHeaderItemModel[]>([]);
  const [selectedId, setSelectedId] = useState<string>('');

  const handleSetItems = useCallback((newItems: I.IHeaderItemModel[]) => {
    setItems(newItems);
  }, []);

  const selectHeaderItem = useCallback(
    (id: string) => {
      if (id !== selectedId) setSelectedId(id);
    },
    [selectedId]
  );

  const isTable = useCallback(() => {
    const item = items.filter(({ id }) => id === selectedId)[0];
    return !!item?.isTable;
  }, [items, selectedId]);

  return (
    <U.Context.Provider
      value={{
        selectedHeaderId: selectedId,
        selectedItem: items.filter(({ id }) => id === selectedId)[0] || {},
        selectHeaderItem,
        headerItems: items,
        setHeaderItems: handleSetItems,
        isTable
      }}>
      {children}
    </U.Context.Provider>
  );
};

export const useHeaderManager = (): I.IHeaderManagerContextData => {
  const context = useContext<I.IHeaderManagerContextData>(U.Context);

  if (!context) {
    throw new Error('useHeaderManager must be used whithin a HeaderManagerProvider');
  }

  return context;
};
