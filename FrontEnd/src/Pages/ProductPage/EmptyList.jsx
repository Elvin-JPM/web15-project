import React from 'react';
import { Link } from 'react-router-dom';

function EmptyList() {
  return (
    <div>
      <p>No ha creado un producto!</p>
        <Link to="new">Crea tu primer producto aqui</Link>
    </div>
  );
}


export default EmptyList;
