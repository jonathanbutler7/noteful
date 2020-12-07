import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { routes } from './routes';
import { NotefulProvider } from './NotefulContext';
import ErrorPage from './Components/ErrorPage/ErrorPage';
import Header from './Components/Header/Header';
import Toast from './Components/Toast/Toast';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <NotefulProvider>
        <Toast />
        <ErrorBoundary FallbackComponent={ErrorPage}>
          <Switch>
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
          </Switch>
        </ErrorBoundary>
      </NotefulProvider>
    </BrowserRouter>
  );
}

export default App;
