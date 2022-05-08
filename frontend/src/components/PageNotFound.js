import React from 'react';
import { Link } from 'react-router-dom';


function PageNotFound() {
  return (
    <div className="page-not-found">
       <Link to="/" className="link text-center">Go to Homepage</Link>
      <h1>404</h1>
      <h2>Page not found</h2>
    </div>
  );
}

export default PageNotFound;
