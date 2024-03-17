import React from 'react';

function DetailProductForm({ name, sale, price, tags, photo, onDelete, isLoading }) {
  return (
    <div>
      <p>{name}</p>
      <p>{sale ? 'Sell' : 'Buy'}</p>
      <p>{tags.join(', ')}</p>
      <p>{price}</p>
    </div>
  );
};

export default DetailProductForm;
