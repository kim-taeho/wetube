import multer from "multer";
import routes from "../routers/routes";

export const multerVideo = multer({ dest: "uploads/videos/" });
export const multerAvatar = multer({ dest: "uploads/avatars/"});

export const localMiddleware = (req, res, next) => {
    res.locals.siteName = "WeTube";
    res.locals.routes = routes;
    res.locals.loggedUser = req.user || null;
    next(); // 이 경우에 localMiddleware선언한 지점이 connection과 router 사이라서
};

export const onlyPublic = (req, res, next) => {
    if (req.user) {
      res.redirect(routes.home);
    } else {
      next();
    }
  };
  
  export const onlyPrivate = (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect(routes.home);
    }
  };

export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");