const shortid = require("shortid");
const URL = require("../models/url");
const { resumeToPipeableStream } = require("react-dom/server");

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;

    const shortId = shortid.generate();

    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: [],
        createdBy:req.user._id,
    });
    
    return res.render('home',{
        id:shortId
    })
    
}

async function handleGetAnalytics(req,res){
    const shortId=req.params.shortId;
    const result=await URL.findOne({shortId});
    return res.json({totalClicks:result.visitHistory.length,analytics:result.visitHistory})
}
module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
};
