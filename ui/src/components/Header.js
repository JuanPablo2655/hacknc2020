import React from 'react';

import Signin from './Signin'
import Signup from './Signup'

const Header = ({ setInputUsername, setinputEmail, setinputToken }) => {
    return(
        <header>
            <Signup setInputUsername={setInputUsername} setinputEmail={setinputEmail} setinputToken={setinputToken}/>
            <Signin setInputUsername={setInputUsername} setinputEmail={setinputEmail}/>
        </header>
    );
}

export default Header