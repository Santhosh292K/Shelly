import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  const handleClick1 = () => {
    navigate('/scanproduct');
  };
  const handleClick2 = () => {
    navigate('/scanbill');
  };
  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={handleClick1} className='border-2 border-red-500 rounded-full bg-blue-300'>Go to Product Page</button>
      <button onClick={handleClick2} className='border-2 border-red-500 rounded-full bg-blue-300'>Go to Bill Page</button>
    </div>
  );
}

export default HomePage;
