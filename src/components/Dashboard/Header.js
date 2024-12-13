import React from 'react';

import Logout from '../Logout';
import { Button } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

const Header = ({ setIsAdding, setIsAuthenticated }) => {
  return (
    <header>
      <h1>Gestão de Condomínios</h1>
      <div style={{ marginTop: '30px', marginBottom: '18px' }}>
        <Button onClick={() => setIsAdding(true)}>Add Employee</Button>
        <Button>Botao1</Button>
        <Logout setIsAuthenticated={setIsAuthenticated} />
      </div>
    </header>
  );
};

export default Header;
