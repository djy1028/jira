import React from 'react';
import './App.css';
import { useAuth } from './context/auth-context';
import { UnauthenticatedApp } from './unauthenticated-app';
import {AuthenticatedApp} from './authenticated-app'
import { ErrorBoundary } from './components/error-boundary';
import { FullPageError } from './components/lib';

function App() {
  const {user} = useAuth()
  return (
    <div className="App">
      {/* 错误边界捕获 */}
      <ErrorBoundary fallbackRender={FullPageError}>
          {
            user?<AuthenticatedApp />:<UnauthenticatedApp />
          }
      </ErrorBoundary>
      
     
    </div>
  );
}

export default App;
