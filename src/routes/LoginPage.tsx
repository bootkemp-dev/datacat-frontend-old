//materialUI
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import React from 'react';
import useLoginForm from '../hooks/forms/useLoginForm';
import { FlashMessage } from '../interfaces/FlashMessage';
import { Redirect, useLocation } from 'react-router-dom';
import Layout from '../components/shared/Layout';
import useLogin from '../hooks/auth/useLogin';
import useToken from '../hooks/auth/useToken';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const LoginPage: React.FC = () => {
  const { handleChange, handleSubmit, loginData, register } = useLoginForm();
  const login = useLogin();
  const token = useToken();

  const { state } = useLocation<FlashMessage>();

  const classes = useStyles();

  if (login.isSuccess) {
    token.persist(login.token!);

    return <Redirect to="/dashboard" />;
  }

  return (
    <Layout>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h2" variant="h5">
            Login
          </Typography>
          {state?.message && <Typography>{state?.message}</Typography>}
          <form
            className={classes.form}
            onSubmit={handleSubmit(data => login.sendRequest(data))}
          >
            <TextField
              {...register('username')}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={loginData.username}
              onChange={handleChange}
            />
            <TextField
              {...register('password')}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={loginData.password}
              onChange={handleChange}
            />
            {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
            {login.isError && (
              <Typography color="error">
                Error: {login.error?.message}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          </form>
          {login.isLoading && <LinearProgress color="primary" />}
        </div>
      </Container>
    </Layout>
  );
};

export default LoginPage;
