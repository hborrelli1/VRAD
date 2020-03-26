import React from "react";
import PropTypes from "prop-types";
import { BASE_URL } from "../../constants/Constants";
import LocationCard from "../LocationCard/LocationCard";

class LocationContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      listingData: []
    };
  }

  locationContainerHelper = listings => {
    const promises = listings.map(listing => {
      return fetch(BASE_URL + listing)
        .then(res => res.json())
        .then(listing => {
          return {
            ...listing
          };
        });
    });
    Promise.all(promises).then(data => {
      this.setState({ listingData: data });
    });
  };

  componentDidMount() {
    this.locationContainerHelper(this.props.listings);
  }

  render() {
    const {listingData} = this.state;
    const {favorite,goToListing,favoriteLocations} = this.props;
    return (
      <section className = "location-conatiner">
        {listingData.map(listing => {
          return (
            <LocationCard
              favorite={favorite}
              key={listing.listing_id}
              listingData={listing}
              goToListing={goToListing}
              favoriteLocations = {favoriteLocations}
            />
          );
        })}
      </section>
    );
  }
}

export default LocationContainer;
