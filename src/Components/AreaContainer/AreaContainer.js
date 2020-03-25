import React from 'react';
import PropTypes from 'prop-types';
import AreaCard from '../AreaCard/AreaCard';
import './AreaContainer.scss';

const AreaContainer = ({ areas, changeView }) => {

  const areaCards = areas.map(area => (
    <AreaCard
      key={area.name}
      areaInfo={area}
      changeView={changeView}
    />
  ));

  return (
    <div className="area-container">
      {areaCards}
    </div>
  )
}

export default AreaContainer;
