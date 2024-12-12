export const setToken = (token) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('jwt_token', token);
    }
  };
  
  export const getToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('jwt_token');
    }
    return null;
  };
  
  export const removeToken = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('jwt_token');
    }
  };

export const logout = () => {
    removeToken();
    window.location.href = '/login'; // Redirect to login after logout
  };
  
  