import React from "react";

interface FavoriteItemsProps {
  id: number;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

const FavoriteItem: React.FC<FavoriteItemsProps> = ({
  id,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <span
      onClick={() => onToggleFavorite(id)}
      style={{ cursor: "pointer", userSelect: "none" }}
    >
      {isFavorite ? "⭐" : "☆"}
    </span>
  );
};

export default FavoriteItem;
