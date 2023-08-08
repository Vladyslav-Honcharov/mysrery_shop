// FavouriteButton.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorites,
  removeFavorites,
} from "../../features/favorites/favoriteSlice";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { cardHoverFavouriteButton } from "../Card/CardStyle";

function FavouriteButton({ item }) {
  const dispatch = useDispatch();
  const favoritesList = useSelector((state) => state.favorites.favoritesList);
  const isFavorited = favoritesList.some((product) => product._id === item._id);

  const handleToggleFavorite = () => {
    if (isFavorited) {
      dispatch(removeFavorites(item._id));
    } else {
      dispatch(addFavorites(item)); // Pass the entire product object as payload
    }
  };

  return (
    <FavoriteIcon
      onClick={handleToggleFavorite}
      style={{ cursor: "pointer", color: isFavorited ? "#D82700" : "#707070" }}
      sx={ cardHoverFavouriteButton}
    />
  );
}

export default FavouriteButton;
