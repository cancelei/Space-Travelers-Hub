import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Container, Button } from 'react-bootstrap';
import { fetchDragons, reserveDragon } from '../redux/dragons/dragonsSlice';

function Dragons() {
  const dispatch = useDispatch();
  const dragons = useSelector((state) => state.dragons.list);

  useEffect(() => {
    if (dragons.length === 0) {
      dispatch(fetchDragons());
    }
  }, [dispatch, dragons]);

  const handleReserveDragon = (dragonId) => {
    dispatch(reserveDragon(dragonId));
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
            <tr key={dragon.dragon_id}>
              <td><img src={dragon.flickr_images[0]} alt={`Imagen de ${dragon.dragon_name}`} width="100" /></td>
              <td>{dragon.dragon_name}</td>
              <td>{dragon.description}</td>
              <td>
                <Button onClick={() => handleReserveDragon(dragon.dragon_id)}>
                  {dragon.reserved ? 'Reserved' : 'Reserve Dragon'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Dragons;
