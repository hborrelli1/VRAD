import React from "react";
import PropTypes from "prop-types";
import { BASE_URL } from "../../constants/Constants";
import LocationCard from "../LocationCard/LocationCard";
import { fetchLocations } from "../../ApiCalls/ApiCalls.js";
import { IMG_PATH } from "../../constants/Constants";

class LocationContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      listingData: []
    };
  }

    componentDidUpdate = (prevState) => {
      if(this.props.listings !== prevState.listings){
        this.setState({listingData:this.props.listings})
      }
    }

  render() {
    const { listingData } = this.state;
    const {
      favorite,
      isLoading,
      isFavorite,
      goToListing,
      favoriteLocations,
      areaName,
      listings
    } = this.props;
    return (


      <section className="location-conatiner">
        {listingData.length
          ?listingData.map(listing => {
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
          : !isLoading && <img src={`${IMG_PATH}NothingToSee.jpg`} />
        }
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
