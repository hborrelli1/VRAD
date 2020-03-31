import React from 'react';
import PropTypes from 'prop-types';
import { IMG_PATH } from "../../constants/Constants";
import './LocationListingCard.scss';

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
  let uniqueKey = 0;

  const locationFeatures = details.features.map(feat => {
    let featureItem = <li key={uniqueKey}>{feat}</li>;
    uniqueKey++;
    return featureItem;
  });

  return (
    <div className="location-listing-card">
      <div className="location-images">
        <img src={IMG_PATH + listing_id + '_a.jpg'} alt={name + ' image'} />
        <img src={IMG_PATH + listing_id + '_b.jpg'} alt={name + ' image'} />
        <img src={IMG_PATH + listing_id + '_c.jpg'} alt={name + ' image'} />
      </div>

      <div className="listing-details">
      <div className="location-info">
        <div className="header">
          <h3>{name}</h3>
          <p className="area">{area}</p>
          <p className="address">Address: <span>{address.street}, {address.zip}</span></p>
        </div>
        {details.superhost && <p className="super-host">SUPERHOST</p>}
      </div>
      <div className="fav-button">
        <button
          onClick={() => favorite(listing_id)}
        >
          {isFavorite(listing_id)}
        </button>
      </div>
      <div className="meta">
        <div className="info">
          <p>Cost Per Night: <span>${details.cost_per_night}</span></p>
          <p>Number of Beds: <span>{details.beds}</span></p>
          <p>Number of Bathrooms: <span>{details.baths}</span></p>
        </div>
        <div className="features">
          <p><span>Features:</span></p>
          <ul>
            {locationFeatures}
          </ul>
        </div>
      </div>
      </div>
    </div>
  )
}

LocationListingCard.propTypes = {
  favorite: PropTypes.func,
  isFavorite: PropTypes.func,
  currentListing: PropTypes.object,
  areaName: PropTypes.string
}

export default LocationListingCard;
