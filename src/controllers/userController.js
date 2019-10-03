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

export const githubLoginCallback = async (_, __, profile, cb) => {
    const { _json: { id, avatar_url, name, email } } = profile;
    try {
        const user = await User.findOne({email: email});
        if(user){
            user.githubID = id,
            user.save();
            return cb(null, user); // 1번째 매개변수는 error(null이니까 no error)
        } 
            const newUser = await User.create(
                {
                    email,
                    name,
                    gihubID: id,
                    avatarUrl: avatar_url
                }
            );
            return cb(null, newUser);
    } catch(error) {
        return cb(error);
    }
}

export const postGithubLogin = (req, res) => {
    res.redirect(routes.home);
}

export const facebookLogin = passport.authenticate("facebook");

export const facebookLoginCallback = (accessToken, refreshToken, profile, cb) => {

}

export const postFacebookLogin = (req, res) => {
    res.redirect(routes.home);
}

export const logout = (req, res) => {
    req.logout();
    // To Do : Process log out
    res.redirect(routes.home);
}

export const users = (req, res) => {
    res.render("users", { pageTitle: "User" });
}

export const getMe = (req, res) => {
    res.render("userDetail", { pageTitle: "User Detail", user: req.user });
}

export const userDetail = async (req, res) => {
    const { params: { id } } = req;
    try {
        const user = await User.findById(id);
        res.render("userDetail", { pageTitle: "User Detail", user: user });
    } catch(error) {
        res.redirect(routes.home);
    }
}

export const getEditProfile = (req, res) => {
    res.render("editProfile", { pageTitle: "Edit Profile" });
}

export const changePassword = (req, res) => {
    res.render("changePassword", { pageTitle: "Change Password" });
}