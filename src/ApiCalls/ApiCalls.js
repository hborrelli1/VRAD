import { BASE_URL } from "../constants/Constants";

const dummyListing = [
  {
    listing_id: 3,
    area_id: 590,
    name: "Hip RiNo Party Spot",
    address: {
      street: "2250 Lawrence St",
      zip: "80205"
    },
    details: {
        neighborhood_id: 5124122,
        superhost: true,
        seller_source: "91jss1",
        beds: 3,
        baths: 2.5,
        cost_per_night: 420,
        features: [
          "hot tub",
          "espresso machine"
        ]
    },
    dev_id: "u4gh2j",
    area: "rino",
    db_connect: 834470
  }
]


export const fetchLocations = (listings) => {
  if(listings.length ==0) {
    return  false
  }
  const promises = listings.map(listing => {
    return fetch(BASE_URL + listing)
      .then(res => res.json())
      .then(listing => {
        return {
          ...listing
        };
      })
      .catch(err => {
        return err;
      });
  });
  return Promise.all(promises);
};

export const fetchAreas = () => {
  return fetch('http://localhost:3001/api/v1/areas')
    .then(res => res.json())
    .then(areaData => getAreaDetails(areaData))
    .catch(err => console.log(err.message));
};

export const getAreaDetails = (areaData) => {
  const BASE_URL = 'http://localhost:3001';
  const promises = areaData.areas.map(area => {
    const AREA_ENDPOINT = area.details;
    return fetch(BASE_URL + AREA_ENDPOINT)
      .then(response => response.json())
      .then(areaInfo => {
        return {
          nickName: area.area,
          details:area.details,
          ...areaInfo
        }
      })
  })
  return Promise.all(promises);
}
