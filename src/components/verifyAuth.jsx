import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosConfig from "../config/axiosConfig";

export default function verifyAuth(ComponentToProtect) {
  return function AuthenticatedComponent(props) {
    const [loading, setLoading] = useState(true);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
      axiosConfig
        .get('users/checkToken')
        .then((res) => {
          if (res.status === 200) {
            setLoading(false);
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch((err) => {
          if (err.response) {
            toast.error(err.response.data || 'Something went wrong');
            setLoading(false);
            setRedirect(true);
          }
        });
    }, []);

    if (loading) {
      return null;
    }

    if (redirect) {
      return <Navigate to='/' />;
    }

    return <ComponentToProtect {...props} />;
  };
}
