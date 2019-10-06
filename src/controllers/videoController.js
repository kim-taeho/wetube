import routes from "../routers/routes";
import Video from "../models/Video";
import User from "../models/User";
import Comment from "../models/Comment";

export const home = async (req, res) => {
    try {
        const videos = await Video.find({}).sort({
            _id: -1
        });
        res.render("home", {
            pageTitle: "Home",
            videos
            // videos: videos 
        });
        // console.log(videos.fieldname);
    } catch (error) {
        res.render("home", {
            pageTitle: "Home",
            videos: []
        });
    }
}

export const search = async (req, res) => {
    // term이 저장된 위치가 URL의 쿼리부분
    const {
        query: {
            term: searchingBy
        }
    } = req;
    let videos = [];
    try {
        videos = await Video.find({
            title: {$regex: searchingBy, $options: "i"}
        })
    } catch (error) {
        console.log(error);
    }
    // const searchingBy = req.query.term;
    res.render("search", {
        pageTitle: "Search",
        searchingBy,
        videos
    });
}

export const getUpload = (req, res) => {
    res.render("upload", {
        pageTitle: "Upload"
    });
}

export const postUpload = async (req, res) => {
    const {
        body: {
            title,
            description
        },
        file: {
            path
        }
    } = req;
    // console.log(req.user._id);
    const newVideo = await Video.create({
        fileURL: path,
        title,
        description,
        creator: req.user._id
    });
    // console.log(newVideo);
    // console.log(req.user);
    const user = await User.findOne( { email : req.user.email} );
    user.videos.push(newVideo._id);
    user.save();
    // req.user.videos.push(newVideo._id);
    // console.log(req.user);
    // req.user.save(function(){});
    // To Do : upload and save video
    res.redirect(routes.videoDetail(newVideo._id));
}

export const videoDetail = async (req, res) => {
    const {
        params: {
            id
        }
    } = req; // req.params.id와 같음 
    
    try {
        const video = await Video.findById(id).populate("creator").populate("comments");
        // console.log(video);
        // Video는 mongoose파일 mongoose의 기능
        res.render("videoDetail", {
            pageTitle: video.title,
            video
        });
        // console.log(req.user._id);
        // console.log(video.creator._id);
    } catch (error) {
        res.redirect(routes.home);
    }
}

export const getEditVideo = async (req, res) => {
    const {
        params: {
            id
        }
    } = req;
    // console.log(id);
    try {
        console.log("Error at finById");
        const video = await Video.findById(id);
        console.log("Error after finish finById");
        if(String(video.creator) !== req.user._id){
            throw Error();
        } else {
            res.render("editVideo", {
                pageTitle: `edit ${video.title}`,
                video
            });
        }
    } catch (error) {
        res.redirect(routes.home);
    }
}

export const postEditVideo = async (req, res) => {
    const {
        params: {
            id
        },
        body: {
            title,
            description
        }
    } = req;
    try {
        await Video.findOneAndUpdate({
            _id: id
        }, {
            title,
            description
        });
        res.redirect(routes.videoDetail(id));
    } catch (error) {
        res.redirect(routes.home);
    }
}

export const deleteVideo = async (req, res) => {
    const {
        params: {
            id
        }
    } = req;
    try {
        await Video.findOneAndRemove({
            _id: id
        });
        res.redirect(routes.home);
    } catch (error) {
        res.redirect(routes.home);
    }
    res.render("deleteVideo", {
        pageTitle: "DelteVideo"
    });
}

export const postRegisterView = async (req, res) => {
    const {
        params: { id }
    } = req;
    try{
        const video = await Video.findById(id);
        console.log(video.views);
        video.views += 1;
        video.save();
        res.status(200);
    } catch(error){
        res.status(400);
        res.end();
    } finally {
        res.end();
    }
}

export const postAddComment = async (req, res) => {
    const {
        params: { id },
        body: { comment }
    } = req;
    try {
        const video = await Video.findById(id);
        const newComment = await Comment.create({
            text: comment,
            creator: req.user._id
        });
        video.comments.push(newComment._id);
        video.save();
    } catch(error) {
        res.status(400);
    } finally {
        res.end();
    }
}