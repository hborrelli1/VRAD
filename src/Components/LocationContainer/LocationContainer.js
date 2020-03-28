import React from "react";
import PropTypes from "prop-types";
import { BASE_URL } from "../../constants/Constants";
import LocationCard from "../LocationCard/LocationCard";
import {apiCall} from "./apiCalls.js";

class LocationContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      listingData: []
    };
  }

  locationContainerHelper = async (listings) => {
    let data = await apiCall(listings);
    this.setState({ listingData: data });

  };

  componentDidMount() {
    this.locationContainerHelper(this.props.listings);
  }

  render() {
    const { listingData } = this.state;
    const { favorite, goToListing, favoriteLocations } = this.props;
    return (
      <section className="location-conatiner">
        {
          listingData.map(listing => {
          return (
            <LocationCard
              favorite={favorite}
              key={listing.listing_id}
              listingData={listing}
              goToListing={goToListing}
              favoriteLocations={favoriteLocations}
            />
          );
        })}
      </section>
    );
  }
}

LocationContainer.propTypes = {
  favorite: PropTypes.func,
  favoriteLocations: PropTypes.array,
  goToListing: PropTypes.func,
  listings: PropTypes.array
};

export default LocationContainer;
