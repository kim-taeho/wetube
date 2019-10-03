import passport from "passport";
import routes from "../src/routers/routes";
import GithubStrategy from "passport-github";
import User from "./models/User";
import { githubLoginCallback } from "./controllers/userController";

passport.use(User.createStrategy());

passport.use(new GithubStrategy({
    clientID: process.env.GH_ID,
    clientSecret: process.env.GH_SECRET,
    callbackURL: `http://localhost:4000${routes.githubCallback}`
}, githubLoginCallback)
);

passport.serializeUser(User.serializeUser());
// cookie에는 id만 담김 (default 설정)
passport.deserializeUser(User.deserializeUser());