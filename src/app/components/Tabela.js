import Table from 'react-bootstrap/Table';

function TabelaSimples() {
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>ID</th>
          <th>Tempo Encerrado</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default TabelaSimples;