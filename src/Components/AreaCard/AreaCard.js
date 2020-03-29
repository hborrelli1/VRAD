import React from 'react';
import PropTypes from 'prop-types';
import './AreaCard.scss';

import { Link } from 'react-router-dom';

const AreaCard = ({ areaInfo, changeView }) => {
  const areaTitle = areaInfo.name !== areaInfo.nickName
    ? `${areaInfo.name} - (${areaInfo.nickName})`
    : areaInfo.name;

  const buttonText = `View ${areaInfo.listings.length} Listings in ${areaInfo.nickName}`;

  const areaURL = areaInfo.name.toLowerCase().split(' ').join('-');

  return (
    <div className="area-card">
      <div className="info">
        <h4>{areaTitle}</h4>
        <p className="location">{areaInfo.location}</p>
        <p>{areaInfo.about}</p>
      </div>
      <Link
        to={`/areas/${areaURL}`}
        onClick={() => changeView('LocationContainer', areaInfo.details, areaInfo.listings)}
      >
        <button>{buttonText}</button>
      </Link>
    </div>
  );
}

AreaCard.propTypes = {
  areaInfo: PropTypes.object,
  changeView: PropTypes.func
}

export default AreaCard;
