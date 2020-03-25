import React from 'react'
import PropTypes from 'prop-types';

const AreaCard = ({ areaInfo, changeView }) => {
  const areaTitle = areaInfo.name !== areaInfo.nickName
    ? `${areaInfo.name} - (${areaInfo.nickName})`
    : areaInfo.name;

  return (
    <div className="area-card">
      <h4>{areaTitle}</h4>
      {areaInfo.details}
      <button
        onClick={() => changeView('LocationContainer', areaInfo.details)}
      >
        {'View Listing in ' + areaInfo.area}
      </button>
    </div>
  );
}

export default AreaCard;
