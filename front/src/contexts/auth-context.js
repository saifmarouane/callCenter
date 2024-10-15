import { createContext, useContext, useReducer, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

// Actions disponibles pour le réducteur
const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};

// État initial de l'authentification
const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null
};

// Réducteur pour gérer les actions d'authentification
const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;
    return {
      ...state,
      ...(user
        ? { isAuthenticated: true, isLoading: false, user }
        : { isLoading: false })
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null
  })
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);
  const router = useRouter();

  const initialize = async () => {
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = window.sessionStorage.getItem('authenticated') === 'true';
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated) {
      const user = JSON.parse(window.sessionStorage.getItem('user'));
      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: user
      });
    } else {
      dispatch({ type: HANDLERS.INITIALIZE });
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  const signIn = async (email, password) => {
    const user = {
      "email": email,
      "password": password
    };

    // Effectuez une requête POST à votre endpoint de connexion
    const res = await fetch('http://localhost:8000/auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (res.status !== 200) {
      throw new Error(`Erreur lors de la connexion: ${res.statusText}`);
    }

    const userData = await res.json();
    window.sessionStorage.setItem('access_token', userData.access);
    window.sessionStorage.setItem('authenticated', 'true');
    window.sessionStorage.setItem('user', JSON.stringify(userData));

    // Vérification du rôle de l'utilisateur
    const userRole = userData.role;
    const isAdmin = userRole === 'admin';
    window.sessionStorage.setItem('is_admin', isAdmin.toString());

    // Redirection
    const redirectToAppropriatePage = () => {
      const isAuthenticated = window.sessionStorage.getItem('authenticated');
      window.sessionStorage.getItem('authenticated')
      console.log("Is authenticated:", isAuthenticated);
      if (isAuthenticated === 'true') {
        router.push('/');
      } else {
        router.push('/auth/login');
      }
    };
    dispatch({ type: HANDLERS.SIGN_IN, payload: user });


    redirectToAppropriatePage();
  };

  const signOut = () => {
    window.sessionStorage.setItem('authenticated', 'false');
    window.sessionStorage.setItem('user', '');
    window.sessionStorage.removeItem('access_token');
    dispatch({
      type: HANDLERS.SIGN_OUT
    });
    router.push('/auth/login');
  };

  const signUp = async (email, first_name,last_name, password) => {
    const user = {
      "email": email,
      "first_name": first_name,
      "last_name": last_name,
      "password": password,
    };

    const res = await fetch('http://localhost:8000/auth/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (res.status !== 201) {
      throw new Error(`Erreur lors de l'inscription: ${res.statusText}`);
    }

    const userData = await res.json();

    //window.sessionStorage.setItem('authenticated', 'true');
    //window.sessionStorage.setItem('user', JSON.stringify(userData));
    
    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: userData
    });

    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ state, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
};

export const AuthConsumer = AuthContext.Consumer;
