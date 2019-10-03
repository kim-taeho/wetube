import passport from "passport";
import routes from "../routers/routes";
import User from "../models/User";

export const getJoin = (req, res) => {
    res.render("join", { pageTitle: "join" });
}

export const postJoin = async (req, res, next) => {
    // console.log(req.body);
    const {
        body: { name, email, password, password2}
    } = req;
    if(password !== password2){
        res.status(400); // 400:bad request
        res.render("join", { pageTitle: "join" });
    } else {
        try {
            const user = await User({
                name,
                email
            });
            await User.register(user, password);
            next();
        } catch(error){
            console.log(error);
            res.redirect(routes.home);
        }
        // To Do: register User
        // To Do: Log user in
        
    }
}

export const getLogin = (req, res) => {
    res.render("login", { pageTitle: "Login" });
}

export const postLogin = passport.authenticate('local', {
    failureRedirect: routes.login,
    successRedirect: routes.home
});

export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = (accessToken, refreshToken, profile, cb) => {
    console.log(accessToken, refreshToken, profile, cb);
}

export const postGithubLogin = (req, res) => {
    res.send(routes.home);
}

export const logout = (req, res) => {
    req.logout();
    // To Do : Process log out
    res.redirect(routes.home);
}

export const users = (req, res) => {
    res.render("users", { pageTitle: "User" });
}

export const userDetail = (req, res) => {
    res.render("userDetail", { pageTitle: "User Detail" });
}

export const editProfile = (req, res) => {
    res.render("editProfile", { pageTitle: "Edit Profile" });
}

export const changePassword = (req, res) => {
    res.render("changePassword", { pageTitle: "Change Password" });
}