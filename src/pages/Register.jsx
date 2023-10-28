import { Button, Grid, TextField, Typography } from "@mui/material";

import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { register } from "../mock-jwt-auth/auth";
import { useNavigate } from "react-router-dom";

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

function Register() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registerUser = () => {
    console.log(name, email, password);
    if (name && email && password) {
      const userObj = { name, email, password };
      const res = register(userObj);
      console.log("36 res", res);
      navigate("/login");
    } else {
      const errObj = {
        name: name?.length > 0 ? "" : "Please enter Name",
        email: email?.length > 0 ? "" : "Please enter Email",
        password: password?.length > 0 ? "" : "Please enter Password",
      };
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
            Register
          </Typography>
          <div className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={error.name}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error.email}
            />
            <TextField
              variant="outlined"
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
              error={error.password}
            />
            <div style={{ textAlign: "center" }}>
              <h3 style={{ color: "red" }}>{error?.name}</h3>
              <h3 style={{ color: "red" }}>{error?.email}</h3>
              <h3 style={{ color: "red" }}>{error?.password}</h3>
            </div>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={registerUser}
            >
              Register
            </Button>
            <h3
              style={{
                textAlign: "center",
                color: "#1976d2",
                cursor: "pointer",
              }}
              onClick={() => navigate("/login")}
            >
              Already have an account? Log in
            </h3>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

export default Register;
