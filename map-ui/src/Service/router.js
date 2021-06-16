import React from "react";
import DashboardPage from "../DashboardPage/dashboardPage";
import ProfilePage from "../ProfilePage/profilePage";
import TeamsPage from "../TeamsPage/teamsPage";
import {activeTeamId, isAuthenticated, route} from "./cache";
import {useReactiveVar} from "@apollo/client";
import {keycloak} from "../keycloak";
import RoleEvaluation from "../Evaluation/roleEvaluation";
import TeamEvaluation from "../Evaluation/teamEvaluation";

export default function Router() {
  const router = useReactiveVar(route);
  const teamId = useReactiveVar(activeTeamId);
  const auth = useReactiveVar(isAuthenticated);

  isAuthenticated(keycloak.authenticated);

  if (!auth) {
    window.location.reload()
  }

  window.addEventListener('popstate', (event) => {
    if (event.state !== null) {
      route(event.state.page);
      activeTeamId(event.state.id);
    } else {
      route('dashboard');
    }
  });

  switch (router) {
    case 'dashboard':
      if (window.history.state === null || window.history.state.page
          !== 'dashboard') {
        window.history.pushState({page: 'dashboard', id: teamId}, 'Dashboard')
      }
      return <DashboardPage/>;
    case 'profile':
      if (window.history.state.page !== 'profile') {
        window.history.pushState({page: 'profile', id: teamId}, 'Profile');
      }
      return <ProfilePage/>;
    case 'team':
      if (window.history.state.id !== teamId) {
        window.history.pushState({page: 'team', id: teamId}, 'Team');
      }
      return <TeamsPage/>;
    case 'roleEvaluation':
      return <RoleEvaluation/>
    case 'teamEvaluation':
      return <TeamEvaluation/>
    default:
      return null;
  }
}