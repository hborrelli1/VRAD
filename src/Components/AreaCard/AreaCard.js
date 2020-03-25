import React from 'react'
import PropTypes from 'prop-types';

const AreaCard = ({ areaInfo, changeView }) => {
  const areaTitle = areaInfo.name !== areaInfo.nickName
    ? `${areaInfo.name} - (${areaInfo.nickName})`
    : areaInfo.name;

  const buttonText = `View ${areaInfo.listings.length} Listings in ${areaInfo.nickName}`;

  return (
    <div className="area-card">
      <h4>{areaTitle}</h4>
      <p>{areaInfo.about}</p>
      <button
        onClick={() => changeView('LocationContainer', areaInfo.details)}
      >
        {buttonText}
      </button>
    </div>
  );
}

export default AreaCard;
