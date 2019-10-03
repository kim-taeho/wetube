import multer from "multer";
import routes from "../routers/routes";

export const multerVideo = multer({ dest: "uploads/videos/" });

export const localMiddleware = (req, res, next) => {
    res.locals.siteName = "WeTube";
    res.locals.routes = routes;
    res.locals.user={
        isAuthenticated: false,
        id: 1
    }
    next(); // 이 경우에 localMiddleware선언한 지점이 connection과 router 사이라서
};

export const uploadVideo = multerVideo.single("videoName");