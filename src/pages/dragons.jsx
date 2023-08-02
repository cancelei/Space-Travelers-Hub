// src/pages/dragons.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Container, Button } from 'react-bootstrap';
import { fetchDragons, reserveDragon, cancelDragonReservation } from '../redux/dragons/dragonsSlice';

function Dragons() {
  const dispatch = useDispatch();
  const dragons = useSelector((state) => state.dragons.list);

  useEffect(() => {
    if (dragons.length === 0) {
      dispatch(fetchDragons());
    }
  }, [dispatch, dragons]);

  const handleReserve = (id) => {
    dispatch(reserveDragon(id));
  };

  const handleCancelReservation = (id) => {
    dispatch(cancelDragonReservation(id));
  };

  return (
    <Container>
      <h1>Dragons</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dragons.map((dragon) => (
            <tr key={dragon.dragonId}>
              <td><img src={dragon.flickrImages[0]} alt={`Imagen de ${dragon.dragonName}`} width="100" /></td>
              <td>{dragon.dragonName}</td>
              <td>{dragon.description}</td>
              <td style={{ textAlign: 'center' }}>
                {dragon.reserved ? (
                  <>
                    <Button variant="success" disabled style={{ width: '120px', margin: '5px' }}>Reserved</Button>
                    <Button variant="secondary" onClick={() => handleCancelReservation(dragon.dragonId)} style={{ width: '120px', margin: '5px' }}>Cancel</Button>
                  </>
                ) : (
                  <Button onClick={() => handleReserve(dragon.dragonId)} style={{ width: '120px', margin: '5px' }}>Reserve</Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Dragons;
