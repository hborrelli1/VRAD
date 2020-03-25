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
      return "favorite";
    } else {
      return "add-to-favorites";
    }
  }

  return (
    <article className = "card">
      <h2 className = "card-heading" aria-label = {name}>{name}</h2>
      <h3 className = "card-sub-heading" aria-label = {address.street}>{address.street}</h3>
      <div className= "img-container"><img src = {`${IMG_PATH+listing_id}_a.jpg`}/></div>
      <button className = {`${isFavorite(listing_id)}`} onClick={event => props.favorite(listing_id)}>
        {`${isFavorite(listing_id)}`}
      </button>
      <button onClick={event => props.goToListing(listing_id,'LocationListingCard')}>
        Go to Listing
      </button>
    </article>
  );
};

export default LocationCard;
