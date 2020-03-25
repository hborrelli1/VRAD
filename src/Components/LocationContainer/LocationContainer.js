import React from "react";
import PropTypes from "prop-types";
import { BASE_URL } from "../../constants/Constants";
import LocationCard from "../LocationCard/LocationCard";

class LocationContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      data:[]
    };
  }

  locationContainerHelper = (listings) => {
    const promises = listings.map(listing => {
      return fetch(BASE_URL + listing)
        .then(res => res.json())
        .then(listing => {
          return {
            ...listing
          };
        });
    });
    Promise.all(promises)
    .then(data => {
      this.setState({data:data})
    })

  };

  componentDidMount() {
    this.locationContainerHelper(this.props.listings)
  }


  listSubmit = (listing_id) => {
    console.log('listSubmit',listing_id)
  }


  render (){
    return (
      <div>
      {
        this.state.data.map(listing => {
          return <LocationCard  key= {listing.listing_id}data = {listing} listSubmit = {this.listSubmit}/>
        })
      }
      </div>
    )
  }
};

export default LocationContainer;
