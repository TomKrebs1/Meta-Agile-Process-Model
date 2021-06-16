import {gql} from "@apollo/client/core";

export const GET_PERSON = gql`
    query GetPerson ($id: ID!, $userName: String!) {
        getPerson (id: $id, userName: $userName) {
            id
            userName
            firstName
            lastName
            generalAttribute {
                id
                communication
                experience
                resilience
            }
            projectAttribute {
                id
                visionary
                creative
                costConscious
                criticallyQuestioning
                structured
                analytical
                planning
                implementationOriented
            }
        }
    }
`;

export const GET_PERSONAL_TEAMS = gql`
    query GetPerson ($id: ID!, $userName: String!) {
        getPerson (id: $id, userName: $userName) {
            id
            joinedTeams {
                id
                teamName
                inviteToken
            }
        }
    }
`;

export const GET_TEAM = gql`
    query GetTeam ($id: ID!) {
        getTeam(id: $id) {
            id
            teamName
            inviteToken
            teamMembers {
                id
                userName
            }
            personAssessments {
                isActive
                assessmentTarget {
                    id
                    userName
                }
                generalAttribute {
                    id
                    communication
                    experience
                    resilience
                }
                projectAttribute {
                    id
                    visionary
                    creative
                    costConscious
                    criticallyQuestioning
                    structured
                    analytical
                    planning
                    implementationOriented
                }
            }
        }
    }
`;

export const GET_DARKMODE = gql`
    query GetDarkMode ($id: ID!, $userName: String!) {
        getPerson (id: $id, userName: $userName) {
            id
            darkModeOn
        }
    }
`;

export const GET_CALCULATION = gql `
    query GetAssessmentCalculationForTeam ($teamId: ID!) {
        getAssessmentCalculationForTeam (teamId: $teamId) {
            personId
            teamId
            roles {
                roleName
                affinity
                averageAffinity
            }
        }
    }
`;
