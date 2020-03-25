import React from "react";
import PropTypes from "prop-types";
import { BASE_URL } from "../../constants/Constants";

const LocationCard = props => {
  const {
    address,
    area,
    area_id,
    name,
    listing_id,
    details
  } = props.data;
  return (
    <div>
      <h2 aria-label = {name}>{name}</h2>
      <h2 aria-label = {address.street}>{address.street}</h2>
      <button onClick={event => props.listSubmit(listing_id)}>
        Go to Listing
      </button>
    </div>
  );
};

export default LocationCard;
