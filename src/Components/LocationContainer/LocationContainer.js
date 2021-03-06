import React from "react";
import PropTypes from "prop-types";
import LocationCard from "../LocationCard/LocationCard";
import { IMG_PATH } from "../../constants/Constants";

class LocationContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      listingData: []
    };
  }

  componentDidMount = () => {
    this.setState({ listingData: this.props.listings });
  };

  componentDidUpdate = prevState => {
    if (this.props.listings !== prevState.listings) {
      this.setState({ listingData: this.props.listings });
    }
  };

  render() {
    const { listingData } = this.state;
    const {
      favorite,
      isFavorite,
      goToListing,
      favoriteLocations,
      areaName,
      isLoading
    } = this.props;
    return (
      <section className="location-conatiner">
        {listingData.length !== 0
          ? listingData.map(listing => {
              return (
                <LocationCard
                  areaName={areaName}
                  favorite={favorite}
                  isFavorite={isFavorite}
                  key={listing.listing_id}
                  listingData={listing}
                  goToListing={goToListing}
                  favoriteLocations={favoriteLocations}
                />
              );
            })
          : listingData.length === 0 && !isLoading && (
              <div className = "not-found">You do not have any favroites yet<img src={`${IMG_PATH}NothingToSee.jpg`} alt = {'No Listings Found'} /></div>
            )}
      </section>
    );
  }
}

LocationContainer.propTypes = {
  favorite: PropTypes.func,
  favoriteLocations: PropTypes.array,
  goToListing: PropTypes.func,
  listings: PropTypes.array,
  isFavorite:PropTypes.func,
  areaName:PropTypes.string,
  isLoading:PropTypes.bool
};

export default LocationContainer;
