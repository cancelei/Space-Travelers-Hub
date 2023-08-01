import React from 'react';
import PropTypes from 'prop-types';

const MissionList = ({ missions }) => (
  <div>
    {missions.map((mission) => (
      <div key={mission.mission_id}>
        <h3>{mission.mission_name}</h3>
        <p>{mission.description}</p>
      </div>
    ))}
  </div>
);

MissionList.propTypes = {
  missions: PropTypes.arrayOf(
    PropTypes.shape({
      mission_id: PropTypes.string.isRequired,
      mission_name: PropTypes.string.isRequired,
      description: PropTypes.string,
    }),
  ).isRequired,
};

export default MissionList;
