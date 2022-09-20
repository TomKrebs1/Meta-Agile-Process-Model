import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import React from "react";
import {Grid, Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Background from "../assets/teamwork.jpg";
import LandingHero from "./landingHero";
import LandingFooter from "./landingFooter";
import Image from "../assets/map.jpg"

const useStyles = makeStyles((theme) => ({
    content: {
        padding: theme.spacing(2),
        marginBottom: theme.spacing(6),
        maxWidth: 1280,
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(2),
        height: 1300,
        borderRadius: 0,
    },
    heroImage: {
        height: LandingHero().height + 200,
        backgroundPosition: 'center center',
        position: 'relative',
        maxHeight: '1000px',
        backgroundImage: 'url(' + Background + ')',
        backgroundSize: 'cover',
    },
    landing: {
        textAlign: 'center',
        padding: theme.spacing(8, 0),
    }
}));

export default function LandingPage() {
    const classes = useStyles();

    return (
        <div className={classes.heroImage}>
            <Container className={classes.content}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <LandingHero/>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <img src={Image} alt="map"/>
                            <Typography variant="subtitle1" className={classes.landing}>
                                Die im studentischen Labor beschriebenen Erfahrungen provozieren die zentrale Frage, ob
                                der Ansatz, immer wieder neue Prozessmodelle zu entwickeln, überhaupt der richtige ist.
                                MAP verfolgt deswegen einen anderen Weg: Es werden die Rahmenbedingungen für den
                                Prozess festgelegt, aber dem Team wird genügend Raum gegeben, den geeigneten agilen
                                Teamprozess selbst zu finden. Dabei findet insbesondere eine organisationspsychologische
                                Betrachtung des Teams statt.
                                <ul>
                                    <li>
                                      Der <b>Kommunikator</b> muss mit offenen Augen am Projekt teilnehmen und Probleme der
                                        Kommunikation erkennen und beheben. Er muss ein Problem strukturiert
                                        analysieren und dem Team kommunizieren. Er muss z.B. weder visionär noch
                                        implementierend sein, und die Arbeit unter Druck muss auch nicht zu seinen
                                        Stärken gehören.
                                    </li>
                                    <li>
                                      Der <b>Ideengeber</b> ist erfahren und bereit zur Kommunikation, außerdem visionär
                                        und kreativ. Üblicherweise mangelt es ihm an kritischem Hinterfragen. Kosten
                                        spielen in der Regel kaum eine Rolle in seinen Überlegungen. Belastbar muss er
                                        nicht sein.
                                    </li>
                                    <li>
                                      Der <b>Experte/Fachspezialist</b> hat seine Stärken im strukturierten, analytischen,
                                        planenden Vorgehen. Er ist erfahren, durchaus auch offen für andere Meinungen,
                                        hat
                                        aber auch eine klare Vorliebe für das „Machen“, das Implementieren der Lösung.
                                    </li>
                                    <li>
                                      Der <b>Technische Problemlöser/Troubleshooter</b> fährt zu voller Leistung auf, wenn
                                        er unter Druck steht. Seine Erfahrung, sein kritisch-strukturiertes und
                                        analytisches Denken helfen ihm in verfahrenen Situationen, „die Karre aus dem
                                        Dreck zu ziehen“. „Normale“ Projektarbeiten, wie Planung der Iterationen oder
                                        Kostenschätzung, interessieren ihn meist weniger.
                                    </li>
                                    <li>
                                      Der <b>Teamworker</b> ist der „Implementierer“126 im Team. Er übernimmt mit seinem
                                        Mini-Team eine User Story und implementiert sie selbstständig mit seinen
                                        Kollegen. Er ist oft erfahren und meist auch durchaus in der Lage, seine Ziele
                                        unter
                                        Druck zu erreichen. Diese Eigenschaften stehen jedoch nicht im Vordergrund.
                                        Die Erfahrungen im studentischen Labor zeigen eher, dass der Teamworker wenig
                                        Interesse hat, an übergreifenden Teamarbeiten, wie z.B. der Erstellung von
                                        User Stories, teilzunehmen.
                                    </li>
                                    <li>
                                        Der <b>Qualitätsprüfer</b> hat nur ein Ziel: Er will die maximale Qualität von Produkt
                                        und Prozess sicherstellen. Er ist erfahren und kritisch, denkt strukturiert, und
                                        er behält die Kosten im Auge. Oftmals ist er „orthogonal“ zum Team, ist also
                                        geschaffen für die Rolle des Qualitätssicherers. Im Gegensatz zur klassischen
                                        Projektrolle braucht er aber im agilen Team mehr Kommunikationsfähigkeiten.
                                    </li>
                                </ul>
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <LandingFooter/>
        </div>
    );
}