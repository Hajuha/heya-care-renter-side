import { useState } from 'react';
import { AuthService } from '../services';

const useAuth = () => {
    const [isLogged, setIsLogged] = useState(false);

    const login = (username, password) => {
        AuthService.login(username, password);
    };

    return {
        isLogged,
        login,
        setIsLogged,
    };
};

export { useAuth };
