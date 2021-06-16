import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {keycloak} from "./keycloak";
import {ApolloClient, ApolloProvider, createHttpLink} from '@apollo/client';
import {cache, isAuthenticated, userId, userName} from "./Service/cache";
import {setContext} from "@apollo/client/link/context";

keycloak.init({onLoad: 'check-sso'}).then((auth) => {

  const {REACT_APP_DEV_URL, REACT_APP_PROD_URL, NODE_ENV} = process.env;
  const httpLink = createHttpLink({
    uri: NODE_ENV === 'development' ? REACT_APP_DEV_URL : REACT_APP_PROD_URL,
  });

  const authLink = setContext((_, {headers}) => {
    return {
      headers: {
        ...headers,
        Authorization: keycloak.token,
        user_id: keycloak.subject,
      }
    }
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: cache
  });

  if (!auth) {
    client.resetStore();
    console.info("Not Authenticated")
  } else {
    userId(keycloak.subject);
    userName(keycloak.tokenParsed.preferred_username);
    isAuthenticated(keycloak.authenticated);
    console.info("Authenticated");
  }

  ReactDOM.render(
      <React.StrictMode>
        <ApolloProvider client={client}>
          <App/>
        </ApolloProvider>
      </React.StrictMode>,
      document.getElementById('root')
  );

  setTimeout(() => {
    keycloak.updateToken(70).then((refreshed) => {
      if (refreshed) {
        console.info('Token refreshed' + refreshed);
      } else {
        console.warn('Token not refreshed, valid for '
            + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew
                - new Date().getTime() / 1000) + ' seconds');
      }
    }).catch(() => {
      console.error('Failed to refresh token');
    });
  }, 60000)

}).catch(() => {
  console.error("Authentication failed");
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
