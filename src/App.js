import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { routes } from './routes';
import { NotefulProvider } from './NotefulContext';
import ErrorPage from './Components/ErrorPage/ErrorPage';
import Header from './Components/Header/Header';
import Toast from './Components/Toast/Toast';
import Auth from './Components/Auth/Auth';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <NotefulProvider>
        <ErrorBoundary FallbackComponent={ErrorPage}>
          <Switch>
            <Auth>
              <Toast />
              {routes.map((route, idx) =>
                route.exact ? (
                  <Route
                    exact
                    path={route.path}
                    component={route.component}
                    key={idx}
                  />
                ) : (
                  <Route
                    path={route.path}
                    component={route.component}
                    key={idx}
                  />
                )
              )}
            </Auth>
          </Switch>
        </ErrorBoundary>
      </NotefulProvider>
    </BrowserRouter>
  );
}

export default App;
