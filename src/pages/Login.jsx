import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { verifyUser } from "../mock-jwt-auth/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "90vh",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(4),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
}));

function Login() {
  const classes = useStyles();

  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("test@123");
  const [error, setError] = useState({
    email: "",
    password: "",
    auhtFail: "",
  });

  const navigate = useNavigate();
  useEffect(() => {
    const userToken = localStorage.getItem("clientUserToken");
    if (userToken) {
      console.log("36 login");
      navigate("/dashboard");
    }
  }, []);

  const loginSubmit = () => {
    if (email && password) {
      let userCredentials = {
        email,
        password,
      };
      const isAuthenticated = verifyUser(userCredentials);
      console.log("isAuthenticated", isAuthenticated);
      if (isAuthenticated) {
        navigate("/dashboard");
      } else {
        const errObj = {
          auhtFail: "Email or password is incorrect",
        };
        setError(errObj);
      }
    } else {
      const errObj = {
        email: email?.length > 0 ? "" : "Please enter Email",
        password: password?.length > 0 ? "" : "Please enter Password",
      };
      console.log("64 erobj", errObj);
      setError(errObj);
    }
  };
  return (
    <Grid
      container
      component="main"
      className={classes.root}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        style={{ width: "90vh" }}
        item
        xs={12}
        sm={8}
        md={5}
        elevation={6}
        square
      >
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <div className={classes.form}>
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div style={{ textAlign: "center" }}>
              <h3 style={{ color: "red" }}>{error?.email}</h3>
              <h3 style={{ color: "red" }}>{error?.password}</h3>
              <h3 style={{ color: "red" }}>{error?.auhtFail}</h3>
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => loginSubmit()}
            >
              Sign In
            </Button>
            <h3
              style={{
                textAlign: "center",
                color: "#1976d2",
                cursor: "pointer",
              }}
              onClick={() => navigate("/register")}
            >
              Sign up for Music App
            </h3>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

export default Login;
