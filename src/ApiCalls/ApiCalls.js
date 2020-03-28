
import { BASE_URL } from "../constants/Constants";


export const fetchLocations = (listings) => {
  const promises = listings.map(listing => {
    return fetch(BASE_URL + listing)
      .then(res => res.json())
      .then(listing => {
        return {
          ...listing
        };
      });
  });
   return Promise.all(promises)
};
