import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {useMutation} from "@apollo/client";
import {
  activeAssessmentProjectAttributeId,
  cache,
  errorMessage,
  errorSnackbar
} from "../Service/cache";
import {UPDATE_PROJECT_ATTRIBUTES} from "../Service/updateService";
import {gql} from "@apollo/client/core";

const useStyles = makeStyles((theme) => ({
  section: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: theme.spacing(0, 2)
  },
  header: {
    color: theme.palette.text.secondary,
  },
  divider: {
    marginBottom: theme.spacing(1),
  },
  checkBox: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function ProjectAttributes() {
  const classes = useStyles();

  const getProjectAttribute = cache.readFragment({
    id: `ProjectAttribute:${activeAssessmentProjectAttributeId()}`,
    fragment: gql`
        fragment getProjectAttribute on ProjectAttribute {
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
    `,
  })

  const [updateProjectAttributes] = useMutation(UPDATE_PROJECT_ATTRIBUTES);
  const handleChange = (event) => {
    updateProjectAttributes({
      variables: {
        id: getProjectAttribute.id,
        [event.target.name]: event.target.checked
      }
    }).catch((error) => {
      errorMessage(error.message);
      errorSnackbar(true);
    })
  };

  return (
      <div className={classes.section}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className={classes.header}>
              <Typography variant="subtitle1" gutterBottom>
                Project Related Human Characteristics
              </Typography>
              <Divider className={classes.divider}/>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.checkBox}>
              <FormGroup>
                <FormControlLabel
                    control={
                      <Checkbox
                          checked={getProjectAttribute.visionary}
                          onChange={handleChange}
                          name="visionary"
                          color="primary"
                      />
                    }
                    label="Visionary"
                />
                <FormControlLabel
                    control={
                      <Checkbox
                          checked={getProjectAttribute.creative}
                          onChange={handleChange}
                          name="creative"
                          color="primary"
                      />
                    }
                    label="Creative"
                />
                <FormControlLabel
                    control={
                      <Checkbox
                          checked={getProjectAttribute.costConscious}
                          onChange={handleChange}
                          name="costConscious"
                          color="primary"
                      />
                    }
                    label="Cost Conscious"
                />
                <FormControlLabel
                    control={
                      <Checkbox
                          checked={getProjectAttribute.criticallyQuestioning}
                          onChange={handleChange}
                          name="criticallyQuestioning"
                          color="primary"
                      />
                    }
                    label="Critical"
                />
              </FormGroup>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.checkBox}>
              <FormGroup>
                <FormControlLabel
                    control={
                      <Checkbox
                          checked={getProjectAttribute.structured}
                          onChange={handleChange}
                          name="structured"
                          color="primary"
                      />
                    }
                    label="Structured"
                />
                <FormControlLabel
                    control={
                      <Checkbox
                          checked={getProjectAttribute.analytical}
                          onChange={handleChange}
                          name="analytical"
                          color="primary"
                      />
                    }
                    label="Analytical"
                />
                <FormControlLabel
                    control={
                      <Checkbox
                          checked={getProjectAttribute.planning}
                          onChange={handleChange}
                          name="planning"
                          color="primary"
                      />
                    }
                    label="Planning"
                />
                <FormControlLabel
                    control={
                      <Checkbox
                          checked={getProjectAttribute.implementationOriented}
                          onChange={handleChange}
                          name="implementationOriented"
                          color="primary"
                      />
                    }
                    label="Implementing"
                />
              </FormGroup>
            </Paper>
          </Grid>
        </Grid>
      </div>
  );
}