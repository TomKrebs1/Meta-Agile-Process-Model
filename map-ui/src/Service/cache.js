import {InMemoryCache, makeVar} from "@apollo/client";

// Layout
export const drawerToggle = makeVar(false);
export const drawerWidth = makeVar(320)
export const dialogBoolean = makeVar(false);
export const dialogContext = makeVar('none');
export const errorSnackbar = makeVar(false);
export const errorMessage = makeVar(null);
export const chartToggle = makeVar(true);

// Authentication
export const isAuthenticated = makeVar(false);
export const userId = makeVar('anonymous');
export const userName = makeVar('anonymous');

// Router
export const route = makeVar('dashboard');
export const activeTeamId = makeVar(null);

// Assessment
export const activeAssessmentTargetName = makeVar('');
export const activeAssessmentGeneralAttributeId = makeVar(null);
export const activeAssessmentProjectAttributeId = makeVar(null);
export const assessmentLoading = makeVar(false);

export const cache = new InMemoryCache();

