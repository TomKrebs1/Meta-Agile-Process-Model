import {activeTeamId, cache, drawerWidth, route, userName} from "../Service/cache";
import {makeStyles} from "@material-ui/core/styles";
import {Card, CardContent, CardHeader, Fab, IconButton} from "@material-ui/core";
import React from "react";
import {ArrowBack, Assessment, MoreVert} from "@material-ui/icons";
import TeamChart from "../Evaluation/teamChart";
import {useQuery, useReactiveVar} from "@apollo/client";
import {GET_CALCULATION, GET_PERSON, GET_TEAM} from "../Service/queryService";
import {gql} from "@apollo/client/core";
import {getDisplayName} from "@apollo/client/react/hoc/hoc-utils";
import {fieldNameFromStoreName} from "@apollo/client/cache";

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        width: '100%',
        padding: theme.spacing(6, 2),
        [theme.breakpoints.up('lg')]: {
            width: `calc(100% - ${drawerWidth()}px)`,
            marginLeft: drawerWidth(),
        },
    },
    card: {
        height: '100%',
        width: '100%',
        maxWidth: 960,
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '33%',
    },
    cardContent: {
        flexGrow: 1,
    },
    nav: {
        display: 'flex',
        position: 'relative',
        top: theme.spacing(-3),
        padding: theme.spacing(0, 2),
    },
    back: {
        flexGrow: 1,
    },
    content: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}));


export default function TeamRoles() {
    const classes = useStyles();
    const active = useReactiveVar(activeTeamId);
    const memberData = {}
    let teamRoles = {
        troubleShooter: {name: '', affinity: 0},
        expert: {name: '', affinity: 0},
        teamworker: {name: '', affinity: 0},
        creativeMind: {name: '', affinity: 0},
        communicator: {name: '', affinity: 0},
        qualityTester: {name: '', affinity: 0}
    }

    const handleBack = () => {
        route('teamRoles');
    }

    const {
        error: getTeamError,
        loading: getTeamLoading,
        data: getTeamData
    } = useQuery(GET_TEAM,
        {
            variables: {id: active},
            fetchPolicy: 'network-only',
        });

    const {
        error: getCalculationError,
        loading: getCalculationLoading,
        data: getCalculationData
    } = useQuery(GET_CALCULATION,
        {
            variables: {teamId: activeTeamId()},
            fetchPolicy: 'network-only',
        });

    if (getCalculationLoading) {
        return null;
    }
    if (getCalculationError) {
        return `Error! ${getCalculationError}`;
    }

    let x = {}
    getCalculationData.getAssessmentCalculationForTeam.forEach(

        users => {
            const member = cache.readFragment({
                id: `PersonDto:${users.personId}`,
                fragment: gql`
                      fragment getUserName on PersonDto {
                          userName
                      }
                  `,
            })

            memberData[member.userName] = {}

            for (const role of users.roles) {
                memberData[member.userName][role.roleName] = role.affinity
            }
            console.log('memberData: ', memberData)
            console.log('member: ', member)
        },
    )

    // console.log('getTeam: ', getTeamData.getTeam)
    for (const [key, value] of Object.entries(memberData)) {
        console.log('value: ', value)

        if (value.troubleShooter > teamRoles.troubleShooter.affinity) {
            teamRoles.troubleShooter.name = key
            teamRoles.troubleShooter.affinity = value.troubleShooter
        }

        if (value.communicator > teamRoles.communicator.affinity) {
            teamRoles.communicator.name = key
            teamRoles.communicator.affinity = value.communicator
        }

        if (value.expert > teamRoles.expert.affinity) {
            teamRoles.expert.name = key
            teamRoles.expert.affinity = value.expert
        }

        if (value.qualityTester > teamRoles.qualityTester.affinity) {
            teamRoles.qualityTester.name = key
            teamRoles.qualityTester.affinity = value.qualityTester
        }

        if (value.teamworker > teamRoles.teamworker.affinity) {
            teamRoles.teamworker.name = key
            teamRoles.teamworker.affinity = value.teamworker
        }

        if (value.creativeMind > teamRoles.creativeMind.affinity) {
            teamRoles.creativeMind.name = key
            teamRoles.creativeMind.affinity = value.creativeMind
        }
    }

    console.log('teamRoles: ', teamRoles);

    return (
        <div className={classes.cardGrid}>
            <div className={classes.nav}>
                <div className={classes.back}>
                    <Fab onClick={handleBack}>
                        <ArrowBack/>
                    </Fab>
                </div>
            </div>
            <div className={classes.content}>
                <Card className={classes.card}>
                    <CardHeader
                        avatar={<Assessment/>}
                        title="Team Roles"
                        subheader="Recommendation"
                        action={
                            <IconButton>
                                <MoreVert/>
                            </IconButton>
                        }
                    />
                    <CardContent className={classes.cardContent}>
                        Technischer Problemlöser / Troubleshooter: {teamRoles.troubleShooter.name}<br/>
                        Ideengeber: {teamRoles.creativeMind.name}<br/>
                        Kommunikator: {teamRoles.communicator.name}<br/>
                        Qualitätsprüfer: {teamRoles.qualityTester.name}<br/>
                        Experte / Fachspezialist: {teamRoles.expert.name}<br/>
                        Teamworker: {teamRoles.teamworker.name}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}