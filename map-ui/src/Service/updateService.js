import {gql} from "@apollo/client/core";

export const UPDATE_GENERAL_ATTRIBUTES = gql`
    mutation UpdateGeneralAttributes(
        $id: ID!,
        $communication: Boolean,
        $experience: Boolean,
        $resilience: Boolean
    ) {
        updateGeneralAttribute (
            input: {
                id: $id,
                communication: $communication,
                experience: $experience,
                resilience: $resilience
            }){
            id
            communication
            experience
            resilience
        }
    }
`;

export const UPDATE_PROJECT_ATTRIBUTES = gql`
    mutation UpdateProjectAttributes(
        $id: ID!,
        $visionary: Boolean,
        $creative: Boolean,
        $costConscious: Boolean,
        $criticallyQuestioning: Boolean,
        $structured: Boolean,
        $analytical: Boolean,
        $planning: Boolean,
        $implementationOriented: Boolean
    ) {
        updateProjectAttribute (
            input: {
                id: $id
                visionary: $visionary
                creative: $creative
                costConscious: $costConscious
                criticallyQuestioning: $criticallyQuestioning
                structured: $structured
                analytical: $analytical
                planning: $planning
                implementationOriented: $implementationOriented
            }){
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
`;

export const CREATE_TEAM = gql`
    mutation AddNewTeam($teamName: String, $personToCreate: String) {
        addNewTeam(
            input: {
                teamName: $teamName
                personToCreate: $personToCreate
            }){
            id
            teamName
            inviteToken
        }
    }
`;

export const JOIN_TEAM = gql`
    mutation PersonTeamJoin($teamToken: String!, $personId: ID!) {
        personTeamJoin(
            input: {
                teamToken: $teamToken
                personId: $personId
            }){
            id
            teamName
            inviteToken
        }
    }
`;

export const UPDATE_PERSON = gql`
    mutation UpdatePerson(
        $id: ID!,
        $userName: String,
        $firstName: String,
        $lastName: String,
        $darkModeOn: Boolean
    ) {
        updatePerson(
            input: {
                id: $id
                userName: $userName
                firstName: $firstName
                lastName: $lastName
                darkModeOn: $darkModeOn
            }){
            id
            userName
            firstName
            lastName
            darkModeOn
        }
    }
`;

export const CREATE_ASSESSMENT = gql`
    mutation CreateAssessment(
        $assessmentOwnerId: ID!,
        $assessmentTargetId: ID!,
        $teamId: ID!,
    ) {
        addPersonAssessment(
            input: {
                assessmentOwnerId: $assessmentOwnerId
                assessmentTargetId: $assessmentTargetId
                teamId: $teamId
            }){
            generalAttribute{
                id
                communication
                experience
                resilience
            }
            projectAttribute{
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

export const UPDATE_ASSESSMENT = gql`
    mutation UpdateAssessment(
        $assessmentOwnerId: ID!,
        $assessmentTargetId: ID!,
        $teamId: ID!,
        $isActive: Boolean
    ) {
        updatePersonAssessment(
            input: {
                assessmentOwnerId: $assessmentOwnerId
                assessmentTargetId: $assessmentTargetId
                teamId: $teamId
                isActive: $isActive
            }){
            generalAttribute{
                id
                communication
                experience
                resilience
            }
            projectAttribute{
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
            isActive
        }
    }
`;
