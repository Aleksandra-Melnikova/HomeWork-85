import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { RegisterMutation } from "../../types";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Grid from "@mui/material/Grid2";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {googleLogin, login} from "./UserThunk.ts";
import { selectLoginError } from "./UserSlice.ts";
import {GoogleLogin} from "@react-oauth/google";

const Register = () => {
  const [form, setForm] = useState<RegisterMutation>({
    username: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  const loginError = useAppSelector(selectLoginError);
  const navigate = useNavigate();
  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(login(form)).unwrap();
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  const googleLoginHandler = async (credential: string) => {
    await dispatch(googleLogin(credential)).unwrap();
    navigate('/');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOpenIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {loginError ? (
          <Alert severity="error" sx={{ mt: 3, width: "100%" }}>
            {loginError.error}
          </Alert>
        ) : null}


        <Box sx={{ pt: 2 }}>
          <GoogleLogin
              onSuccess={(credentialResponse) => {
                if (credentialResponse.credential) {
                  void googleLoginHandler(credentialResponse.credential);
                }
              }}
              onError={() => {
                console.log('Login Failed');
              }}
          />
        </Box>

        <Box
          component="form"
          noValidate
          onSubmit={submitFormHandler}
          sx={{ mt: 3 }}
        >
          <Grid container direction={"column"} size={12} spacing={2}>
            <Grid size={12}>
              <TextField
                label="Username"
                name="username"
                value={form.username}
                onChange={inputChangeHandler}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                name="password"
                label="Password"
                type="password"
                value={form.password}
                onChange={inputChangeHandler}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign in
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid>
              <Link component={RouterLink} to="/register" variant="body2">
                No account yet? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
