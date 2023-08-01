import React from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

const MissionList = ({ missions }) => (
  <div style={{ margin: '0 50px' }}>
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
            <td style={{ fontWeight: 'bold' }}>{mission.mission_name}</td>
            <td style={{ paddingBottom: '30px' }}>{mission.description}</td>
            <td><Badge bg="primary" style={{ marginTop: '41%' }}>ACTIVE MEMBER</Badge></td>
            <td style={{ width: '160px' }}><Button type="submit" variant="outline-secondary" style={{ marginTop: '25%' }}>Join Mission</Button></td>
          </tr>
        ))}
      </tbody>
    </Table>
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
