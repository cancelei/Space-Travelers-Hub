import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Container } from 'react-bootstrap';
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
    <Container>
      <h1>Dragons</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {dragons.map((dragon) => (
            <tr key={dragon.dragon_id}>
              <td><img src={dragon.flickr_images[0]} alt={`Imagen de ${dragon.dragon_name}`} width="100" /></td>
              <td>{dragon.dragon_name}</td>
              <td>{dragon.description}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Dragons;
