import routes from "../routers/routes";
import Video from "../models/Video";

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
    } catch (error) {
        console.log(error);
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
        searchingBy: searchingBy,
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
    //console.log(req);
    const newVideo = await Video.create({
        fileURL: path,
        title: title,
        description: description
    });
    // To Do : upload and save video
    res.redirect(routes.videoDetail(newVideo.id));
}

export const videoDetail = async (req, res) => {
    const {
        params: {
            id
        }
    } = req; // req.params.id와 같음 
    try {
        const video = await Video.findById(id);
        // Video는 mongoose파일 mongoose의 기능
        res.render("videoDetail", {
            pageTitle: video.title,
            video: video
        });
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
    //console.log(id);
    try {
        const video = await Video.findById(id);
        res.render("editVideo", {
            pageTitle: `edit ${video.title}`,
            video: video
        });
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
            title: title,
            description: description
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