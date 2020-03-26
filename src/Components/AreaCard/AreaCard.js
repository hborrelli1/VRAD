import React from 'react';
import PropTypes from 'prop-types';
import './AreaCard.scss';

const AreaCard = ({ areaInfo, changeView }) => {
  const areaTitle = areaInfo.name !== areaInfo.nickName
    ? `${areaInfo.name} - (${areaInfo.nickName})`
    : areaInfo.name;

  const buttonText = `View ${areaInfo.listings.length} Listings in ${areaInfo.nickName}`;

  return (
    <div className="area-card">
      <div className="info">
        <h4>{areaTitle}</h4>
        <p className="location">{areaInfo.location}</p>
        <p>{areaInfo.about}</p>
      </div>
      <button
        onClick={() => changeView('LocationContainer', areaInfo.details,areaInfo.listings)}
      >
        {buttonText}
      </button>
    </div>
  );
}

export default AreaCard;
