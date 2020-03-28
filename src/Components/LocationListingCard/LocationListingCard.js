import React from 'react';
import PropTypes from 'prop-types';
import { IMG_PATH } from "../../constants/Constants";

const LocationListingCard = ({ currentListing, favorite, isFavorite }) => {
  const {
    listing_id,
    area_id,
    name,
    address,
    details,
    dev_id,
    area,
    db_connect
  } = currentListing;
  const locationFeatures = details.features.map(feat => <li>{feat}</li>);

  return (
    <div>
      <div className="location-images">
        <img src={IMG_PATH + listing_id + '_a.jpg'} alt={name + ' image'} />
        <img src={IMG_PATH + listing_id + '_b.jpg'} alt={name + ' image'} />
        <img src={IMG_PATH + listing_id + '_c.jpg'} alt={name + ' image'} />
      </div>

      <div className="listing-details">
      <div className="location-info">
        <h3>{name}</h3>
        <p>{area}</p>
        <p>Address: {address.street}, {address.zip}</p>
      </div>
      <div className="fav-button">
        <button
          onClick={() => favorite(listing_id)}
        >
          {isFavorite(listing_id)}
        </button>
      </div>
      <div className="meta">
        <p>Cost Per Night: ${details.cost_per_night}</p>
        {details.superhost && <p>SUPERHOST</p>}
        <p>Number of Beds: {details.beds}</p>
        <p>Number of Bathrooms: {details.baths}</p>
        <p>Features:</p>
        <ul>
          {locationFeatures}
        </ul>
      </div>
      </div>
    </div>
  )
}

export default LocationListingCard;
