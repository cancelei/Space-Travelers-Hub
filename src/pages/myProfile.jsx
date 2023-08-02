import React from 'react';
import { useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';

const MyProfile = () => {
  const missions = useSelector((state) => state.missions.missions);

  const joinedMissions = missions.filter((mission) => mission.reserved);

  return (
    <div style={{ width: '90%', margin: '0 5% 0 5%' }}>
      <div style={{ width: '45%' }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Joined Missions</th>
            </tr>
          </thead>
          <tbody>
            {joinedMissions.map((mission) => (
              <tr key={mission.mission_id}>
                <td>{mission.mission_name}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default MyProfile;
