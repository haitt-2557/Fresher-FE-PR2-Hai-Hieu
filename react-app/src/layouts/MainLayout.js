/** @format */

import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../components/Headers';
function DefaultLayout({ component: Component, role, ...props }) {
  return (
    <Route
      {...props}
      render={(routerProps) => (
        <>
          <Header {...routerProps} />
          <div className='main'>
            <Component {...routerProps} />
          </div>
        </>
      )}
    />
  );
}
export default DefaultLayout;
