import React from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';

const MissionList = ({ missions }) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>Mission</th>
        <th>Description</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {missions.map((mission) => (
        <tr key={mission.mission_id}>
          <td>{mission.mission_name}</td>
          <td>{mission.description}</td>
          <td>Tag</td>
          <td><button type="submit">Join Mission</button></td>
        </tr>
      ))}
    </tbody>
  </Table>
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
