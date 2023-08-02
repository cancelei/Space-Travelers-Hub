import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container, Row, Col, Card, Button,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { fetchRockets, setSelectedRocket, cancelReserveRocket } from '../redux/rockets/rocketsSlice';

const Rocket = ({ rocket, onSelectRocket }) => (
  <Card style={{ width: '100%', border: 'none' }}>
    <Container>
      <Row>
        <Col md={4} style={{ marginBottom: '2%' }}>
          <Card.Img variant="top" src={rocket.flickr_images[0]} alt={`Imagen de ${rocket.rocket_name}`} style={{ width: '45vh', borderRadius: '0' }} />
        </Col>
        <Col md={8}>
          <Card.Body>
            <Card.Title>{rocket.rocket_name}</Card.Title>
            <Card.Text>{rocket.description}</Card.Text>
            {rocket.reserved ? (
              <p style={{ color: 'green' }}>Reserved</p>
            ) : (
              <Button onClick={() => onSelectRocket(rocket)}>Reserve Rocket</Button>
            )}
          </Card.Body>
        </Col>
      </Row>
    </Container>
  </Card>
);

Rocket.propTypes = {
  rocket: PropTypes.shape({
    rocket_id: PropTypes.string.isRequired,
    rocket_name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    flickr_images: PropTypes.arrayOf(PropTypes.string).isRequired,
    reserved: PropTypes.bool.isRequired,
  }).isRequired,
  onSelectRocket: PropTypes.func.isRequired,
};

function Rockets() {
  const dispatch = useDispatch();
  const rockets = useSelector((state) => state.rockets);

  useEffect(() => {
    dispatch(fetchRockets());
  }, [dispatch]);

  const handleSelectRocket = (rocket) => {
    dispatch(setSelectedRocket(rocket));
  };

  const handleCancelReserveRocket = (rocketId) => {
    dispatch(cancelReserveRocket(rocketId));
  };

  return (
    <div>
      {rockets.map((rocket) => (
        <Rocket
          key={rocket.rocket_id}
          rocket={rocket}
          onSelectRocket={handleSelectRocket}
          onCancelReserveRocket={handleCancelReserveRocket}
        />
      ))}
    </div>
  );
}

export default Rockets;
