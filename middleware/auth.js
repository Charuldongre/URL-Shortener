const {getUser}=require("../service/auth");
//STATEFULL
// async function restrictToLoggedinUserOnly(req,res,next){
//     const userUid=req.cookies?.uid;

//     if(!userUid) return res.redirect("/login");
//     const user =getUser(userUid);

//     if(!user) return res.redirect("/login");

//     req.user=user;
//     next();
// }

// async function checkAuth(req,res,next){
//     const userUid=req.cookies?.uid;

    
//     const user =getUser(userUid);

  

//     req.user=user;
//     next();
// }

//STATELESS
// async function restrictToLoggedinUserOnly(req,res,next){
//     const userUid=req.headers["authorization"];

//     if(!userUid) return res.redirect("/login");
//     const token=userUid.split("Bearer ")[1];
//     const user =getUser(token);

//     if(!user) return res.redirect("/login");

//     req.user=user;
//     next();
// }
// async function checkAuth(req, res, next) {
//     const userUid = req.cookies?.uid;
//     const user = getUser(userUid);

//     if (user) {
//         req.user = user;
//     }
//     // Don't block or redirect — this middleware is only setting req.user if possible
//     next();
// }

//AUTHORIZATION

function checkForAuthentication(req,res,next){
    const tokenCookie = req.cookies?.token;
    req.user=null;

    if(!tokenCookie) return next();
   
    const token= tokenCookie;
    const user=getUser(token);

    req.user=user;
    return next();
}

function restrictTo(Roles){
   return function(req,res,next){
    if (!req.user) return res.redirect("/login");

    if(!Roles.includes(req.user.role)) return res.end("UnAuthorized");

    return next();
   }
}


module.exports={
    // restrictToLoggedinUserOnly,
    // checkAuth,
    checkForAuthentication,
    restrictTo,
}