import passport from "passport";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import User from "./models/User";
import routes from "./routers/routes";
import { githubLoginCallback, facebookLoginCallback } from "./controllers/userController";

passport.use(User.createStrategy());

passport.use(
    new GithubStrategy(
    {
        clientID: process.env.GH_ID,
        clientSecret: process.env.GH_SECRET,
        callbackURL: `http://localhost:4000${routes.githubCallback}`
    }, 
    githubLoginCallback
    )
);

passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FB_ID,
            clientSecret: process.env.FB_SECRET,
            callbackURL: `https://pretty-lionfish-74.localtunnel.me/${routes.facebookCallback}`
        },
        facebookLoginCallback
    )
)
// passport.serializeUser(User.serializeUser());
// cookie에는 id만 담김 (default 설정)
// passport.deserializeUser(User.deserializeUser());
passport.serializeUser((user, done) => done(null, user));
// passport.deserializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

