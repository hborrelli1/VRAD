import React from 'react'
import PropTypes from 'prop-types'

const LocationListingCard = ({ currentListing }) => {

  return (
    <div>
      <h3>{currentListing.name}</h3>
      <p>{currentListing.area}</p>
      <p>Address: {currentListing.address.street}, {currentListing.address.zip}</p>
    </div>
  )
}

export default LocationListingCard
