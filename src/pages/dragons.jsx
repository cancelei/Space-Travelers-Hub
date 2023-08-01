import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card, Button, Row, Col,
} from 'react-bootstrap';
import { fetchDragons } from '../redux/dragons/dragonsSlice';

function Dragons() {
  const dispatch = useDispatch();
  const dragons = useSelector((state) => state.dragons.list);

  useEffect(() => {
    if (dragons.length === 0) { // Comprobar si ya existen dragones en el estado
      dispatch(fetchDragons());
    }
  }, [dispatch, dragons]);

  return (
    <div>
      <h1>Dragons</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {dragons.map((dragon) => (
          <Col key={dragon.dragon_id}>
            <Card>
              <Card.Img variant="top" src={dragon.flickr_images[0]} alt={`Imagen de ${dragon.dragon_name}`} />
              <Card.Body>
                <Card.Title>{dragon.dragon_name}</Card.Title>
                <Card.Text>{dragon.description}</Card.Text>
                <Button>More Details</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Dragons;
