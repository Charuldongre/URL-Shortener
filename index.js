const express=require("express");
const {connectToMongoDB}=require("./connect");
// const {restrictToLoggedinUserOnly,checkAuth} = require("./middleware/auth");
const {checkForAuthentication, restrictTo} = require("./middleware/auth");
const URL =require('./models/url');
const path=require('path')
const cookieParser=require('cookie-parser');

const urlRoute=require("./routes/url");
const staticRoute=require("./routes/staticRouter");
const userRoute=require('./routes/user');

const app=express();

const PORT=9000;

connectToMongoDB('mongodb://localhost:27017/urlDB')
.then(()=>console.log("MongoDB Connected"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthentication)


app.set("view engine","ejs");
app.set("views",path.resolve("./views"))


// app.use("/url",restrictToLoggedinUserOnly,urlRoute);
app.use("/url",restrictTo('NORMAL'),urlRoute);
// app.use("/",checkAuth,staticRoute);
app.use("/",staticRoute);
app.use("/user",userRoute);


app.get("/test",async(req,res)=>{
  const allUrls=await URL.find({});
  return res.render('home',{
    urls: allUrls,
  });
})


app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
  
    const entry = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      },
      { new: true } // Make sure it returns the updated document
    );
  
    if (!entry) {
      return res.status(404).json({ error: 'Short URL not found' });
    }
  
    res.redirect(entry.redirectURL);
  });
  

app.listen(PORT,()=>console.log(`Server Started at PORT:${PORT}`));