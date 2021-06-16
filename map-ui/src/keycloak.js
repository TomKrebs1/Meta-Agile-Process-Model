import Keycloak from "keycloak-js";

const {
  REACT_APP_KEYCLOAK_URL,
  REACT_APP_DEV_KEYCLOAK_REALM,
  REACT_APP_DEV_KEYCLOAK_ID,
  REACT_APP_PROD_KEYCLOAK_REALM,
  REACT_APP_PROD_KEYCLOAK_ID,
  NODE_ENV
} = process.env;

const initOptions = {
  url: REACT_APP_KEYCLOAK_URL,
  realm: NODE_ENV === 'development' ? REACT_APP_DEV_KEYCLOAK_REALM
      : REACT_APP_PROD_KEYCLOAK_REALM,
  clientId: NODE_ENV === 'development' ? REACT_APP_DEV_KEYCLOAK_ID
      : REACT_APP_PROD_KEYCLOAK_ID,
  onLoad: 'check-sso'
}

export const keycloak = Keycloak(initOptions);
