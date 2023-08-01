import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card, Button, Row, Col,
} from 'react-bootstrap';
import { fetchRockets, setSelectedRocket } from '../redux/rockets/rocketsSlice';

function Rockets() {
  const dispatch = useDispatch();
  const rockets = useSelector((state) => state.rockets);

  useEffect(() => {
    dispatch(fetchRockets());
  }, [dispatch]);

  const handleSelectRocket = (rocket) => {
    dispatch(setSelectedRocket(rocket));
  };

  return (
    <div>
      <h1>Rockets</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {rockets.map((rocket) => (
          <Col key={rocket.rocket_id}>
            <Card>
              <Card.Img variant="top" src={rocket.flickr_images[0]} alt={`Imagen de ${rocket.rocket_name}`} />
              <Card.Body>
                <Card.Title>{rocket.rocket_name}</Card.Title>
                <Card.Text>{rocket.description}</Card.Text>
                <Button onClick={() => handleSelectRocket(rocket)}>Reserve Rocket</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Rockets;
