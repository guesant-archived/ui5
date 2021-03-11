import immer from "immer";
import { useCallback, useEffect, useState } from "react";

export const useList = <T,>(initial: T[] = []) => {
  const [items, setItems] = useState<T[]>(initial);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentItem, setCurrentItem] = useState<T | null>(null);

  useEffect(() => {
    setCurrentItem(items[currentIndex]);
  }, [currentIndex, items]);

  const updateItem = useCallback(
    (projectIndex: number, data: T) => {
      setItems(
        immer(items, (draft) => {
          draft[projectIndex] = data as any;
        }),
      );
    },
    [items],
  );

  const updateCurrentItem = useCallback(
    (data: T) => updateItem(currentIndex, data),
    [updateItem, currentIndex],
  );

  return {
    items,
    setItems,
    updateItem,
    currentItem,
    currentIndex,
    setCurrentIndex,
    updateCurrentItem,
  };
};
