import React from 'react';
import PropTypes from 'prop-types';
import AreaCard from '../AreaCard/AreaCard';

const AreaContainer = ({ areas, changeView }) => {



  const areaCards = areas.map(area => (


    <AreaCard
      key={area.area}
      areaInfo={area}
      changeView={changeView}
    />
  ))

  return (
    <div>
      {areaCards}
    </div>
  )
}



export default AreaContainer;
