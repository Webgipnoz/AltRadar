import { useState, useCallback } from "react";

export function useFavorite<T extends { id: number; favorite?: boolean }>(
  initialData: T[]
) {
  const [data, setData] = useState<T[]>(initialData);

  const toggleFavorite = useCallback((id: number) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, favorite: !item.favorite } : item
      )
    );
  }, []);

  return { data, toggleFavorite };
}
