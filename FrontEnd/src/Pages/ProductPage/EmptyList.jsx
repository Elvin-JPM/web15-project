import React from "react";
import { Link } from "react-router-dom";

function EmptyList() {
  return (
    <div>
      <p>No products created yet!</p>
      <Link to="new">Create your first product here</Link>
    </div>
  );
}

export default EmptyList;
