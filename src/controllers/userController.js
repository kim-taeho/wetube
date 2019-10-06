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

export const githubLogin = passport.authenticate("github", {
    successFlash: "Welcome",
    failureFlash: "Can't log in at this time"
  });

export const githubLoginCallback = async (_, __, profile, cb) => {
    const { _json: { id, avatar_url: avatarUrl, name, email } } = profile;
    try {
        const user = await User.findOne({email});
        if(user){
            // eslint-disable-next-line no-unused-expressions
            user.githubID = id;
            user.save();
            return cb(null, user); // 1번째 매개변수는 error(null이니까 no error)
        } 
            const newUser = await User.create(
                {
                    email,
                    name,
                    gihubID: id,
                    avatarUrl
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

// eslint-disable-next-line no-unused-vars
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

export const getMe = async (req, res) => {
    try {
    // eslint-disable-next-line no-underscore-dangle
    const user = await User.findById(req.user._id).populate("videos");
    // console.log("user by findOne", user);
    // console.log("req.user", req.user);
    res.render("userDetail", { pageTitle: "User Detail", user });
    } catch(error){
        res.redirect(routes.home);
    }
}

export const userDetail = async (req, res) => {
    const { params: { id } } = req;
    try {
        const user = await User.findById(id).populate("videos");
        // console.log(user);
        res.render("userDetail", { pageTitle: "User Detail", user });
    } catch(error) {
        res.redirect(routes.home);
    }
}

export const getEditProfile = (req, res) => {
    res.render("editProfile", { pageTitle: "Edit Profile" });
}

export const postEditProfile = async (req, res) => {
    const {
        body: { name, email },
        file
    } = req;
    // console.log(req.body.name);

    // console.log("before change");
    // const fi_user = await User.findOne( { _id: req.user._id });
    // console.log(fi_user);

    try{
        await User.findOneAndUpdate({
            // eslint-disable-next-line no-underscore-dangle
            _id: req.user._id
        },
        {
            name, 
            email,
            avatarUrl: file ? file.path : req.user.avatarUrl
        },
        {
            new: true
        });

        // console.log("after change user");
        // const fi_user = await User.findOne( { _id: req.user._id });
        // console.log(fi_user);
        res.redirect(routes.me);
    }catch(error){
        res.redirect(`users/${routes.editProfile}`);
    }
}

export const getChangePassword = (req, res) => {
    res.render("changePassword", { pageTitle: "Change Password" });
}

export const postChangePassword = async (req, res) => {
    const {
        body: {
            oldPassword,
            newPassword,
            newPassword1
        }
    } = req;
    try {
        if (newPassword !== newPassword1) {
            res.status(400);
            res.redirect(`/users/${routes.changePassword}`);
            return;
        }
        await req.user.changePassword(oldPassword, newPassword);
        console.log('change password');
        res.redirect(routes.me);
    } catch(error) {
        res.redirect(`/users/${routes.changePassword}`);
    }
}