import React, { useState } from 'react';
import Parties from './Parties';
import GenderChoice from './Gender';
import IdentityChoice from './Identity';

function MainApp() {
  const [view, setView] = useState('party'); // Initial view is the home page

  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <div>
      {view === 'party' && <Parties onViewChange={handleViewChange} />}
      {view === 'gender' && <GenderChoice onViewChange={handleViewChange} />}
      {view === 'identity' && <IdentityChoice onViewChange={handleViewChange} />}
    </div>
  );
}

export default MainApp;
