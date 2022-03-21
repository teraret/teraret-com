import React from 'react';

import clientUrl from './../config';
import Auth from "./security/auth";
import Router from 'next/router';

const login = '/login'; 

// eslint-disable-next-line import/no-anonymous-default-export
export default WrappedComponent => {
   
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />;

  hocComponent.getInitialProps = async (context) => {

    if(!Auth.loggedIn()){
        if (context.res) {
            context.res?.writeHead(302, {
              Location: login,
            });
            context.res?.end();
          } else {
            Router.replace(login);
          }
    } else if (WrappedComponent.getInitialProps) {
        const wrappedProps = await WrappedComponent.getInitialProps({...context, auth: Auth});
        return { ...wrappedProps, Auth };
      }
   return { Auth }

  };

  return hocComponent;
};