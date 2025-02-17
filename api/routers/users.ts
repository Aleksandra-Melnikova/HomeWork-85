import express from "express";
import User from "../models/User";
import { Error } from "mongoose";
import auth from "../middlewear/auth";
import { RequestWithUser } from "../middlewear/auth";
import { OAuth2Client } from "google-auth-library";
import config from "../config";

const usersRouter = express.Router();

const client = new OAuth2Client(config.google.client_id);

usersRouter.post("/google", async (req, res, next) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: req.body.credential,
      audience: config.google.client_id,
    });
    const payload = ticket.getPayload();
    if (!payload) {
      res.status(400).send({ error: "Google login error!" });
      return;
    }

    const email = payload["email"];
    const id = payload["sub"];
    const displayName = payload["name"];
    const avatar = payload["picture"];
    if (!email) {
      res.status(400).send({ error: "Not enough user data to continue" });
      return;
    }

    let user = await User.findOne({ googleID: id });

    if (!user) {
      user = new User({
        username: email,
        displayName: displayName,
        password: crypto.randomUUID(),
        googleID: id,
        avatar: avatar,
      });
    }
    user.generateToken();

    await user.save();

    res.send({ message: "Login with Google successful!", user });
  } catch (e) {
    next(e);
  }
});

usersRouter.post("/register", async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });
    user.generateToken();
    await user.save();
    res.send({ user, message: "Register successfully" });
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send(error);
      return;
    }
    next(error);
  }
});

usersRouter.post("/sessions", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    res.status(400).send({ error: "Username not found" });
    return;
  }
  const isMatch = await user.checkPassword(req.body.password);
  if (!isMatch) {
    res.status(400).send({ error: "Password is wrong" });
    return;
  }
  user.generateToken();
  await user.save();
  res.send({ message: "Username and password correct!", user });
});

usersRouter.delete("/sessions", auth, async (req, res, next) => {
  const reqWithAuth = req as RequestWithUser;
  const userFromAuth = reqWithAuth.user;
  try {
    const user = await User.findOne({ _id: userFromAuth._id });
    if (user) {
      user.generateToken();
      await user.save();
    }
    res.send({
      message: "Success logout",
    });
  } catch (e) {
    next(e);
  }
});

usersRouter.post("/secret", auth, async (req, res) => {
  const expressReq = req as RequestWithUser;
  const user = expressReq.user;

  res.send({
    message: "Secret message",
    user: user,
  });
});

export default usersRouter;
