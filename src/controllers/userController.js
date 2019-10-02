import routes from "../routers/routes";

export const getJoin = (req, res) => {
    res.render("join", { pageTitle: "join" });
}

export const postJoin = (req, res) => {
    // console.log(req.body);
    const {
        body: { name, email, password, password2}
    } = req;
    if(password !== password2){
        res.status(400); // 400:bad request
        res.render("join", { pageTitle: "join" });
    } else {
        // To Do: register User
        // To Do: Log user in
        res.redirect(routes.home);
    }
}

export const getLogin = (req, res) => {
    res.render("login", { pageTitle: "Login" });
}

export const postLogin = (req, res) => {
    res.redirect(routes.home);
}

export const logout = (req, res) => {
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