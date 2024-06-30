import React from 'react';

import Auth from '../utils/auth';

const NoMatch = () => {
  const loggedIn = Auth.loggedIn();

  return (
    <section
      className={`w-full ${
        loggedIn ? 'min-h-screen' : 'min-h-[calc(100vh-72px)] hero-bg'
      } flex justify-center items-center text-center`}
    >
      <div>
        <h1 className="text-4xl font-bold mr-4">404</h1>
        <p className="font-bold">Trang này không tồn tại.</p>
      </div>
    </section>
  );
};

export default NoMatch;
