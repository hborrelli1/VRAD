import React from "react";
import PropTypes from "prop-types";
import { BASE_URL } from "../../constants/Constants";
import { IMG_PATH } from "../../constants/Constants";

const LocationCard = props => {
  const {
    address,
    area,
    area_id,
    name,
    listing_id,
    details
  } = props.data;
 const {favoriteLocations} = props
  const isFavorite = (id) => {
    if(favoriteLocations.includes(id)){
      return "active";
    } else {
      return "inactive";
    }
  }

  return (
    <article className = "card">
      <h2 aria-label = {name}>{name}</h2>
      <h2 aria-label = {address.street}>{address.street}</h2>
      <div className= "img-container"><img src = {`${IMG_PATH+listing_id}_a.jpg`}/></div>
      <button className = {`${isFavorite(listing_id)}`} onClick={event => props.favorite(listing_id)}>
        Favorite Listing
      </button>
      <button onClick={event => props.goToListing(listing_id,'LocationListingCard')}>
        Go to Listing
      </button>
    </article>
  );
};

export default LocationCard;
