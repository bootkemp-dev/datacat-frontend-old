import React from 'react';
import { Job, JobStatus, statusColors } from '../../interfaces/resources/jobs';
import Paper from '@material-ui/core/Paper';
import { makeStyles, Theme } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import HelpIcon from '@material-ui/icons/Help';
import ClearIcon from '@material-ui/icons/Clear';

interface Props {
  job: Job;
}

interface StylesProps {
  color: string;
}

const useStyles = makeStyles<Theme, StylesProps>({
  root: {
    maxWidth: '400px',
    borderRadius: '10px'
  },
  iconArea: {
    color: 'white',
    background: props => props.color,
    height: '5rem',
    width: '5rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '10px'
  },
  jobDataArea: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: '0.5rem'
  }
});

const JobCard: React.FC<Props> = ({ job }) => {
  const { status } = job;

  const color = statusColors.get(status)!;
  const classes = useStyles({ color });

  let icon;
  const iconFontSize = 'large';

  switch (status) {
    case JobStatus.UP:
      icon = <DoneIcon fontSize={iconFontSize} />;
      break;
    case JobStatus.DOWN:
      icon = <ClearIcon fontSize={iconFontSize} />;
      break;
    case JobStatus.NA:
      icon = <HelpIcon fontSize={iconFontSize} />;
      break;
  }

  // TODO: improve accessibility
  return (
    <Paper className={classes.root} elevation={3}>
      <Grid container>
        <Grid item className={classes.iconArea}>
          {icon}
        </Grid>
        <Grid item className={classes.jobDataArea}>
          <Typography>{job.jobName}</Typography>
          <Typography>{job.jobUrl}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default JobCard;
