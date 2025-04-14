// const sessionIdToUserMap= new Map();

// function setUser(id,user){
//   sessionIdToUserMap.set(id,user);
// }

// function getUser(id){
//     return sessionIdToUserMap.get(id);
// }



// module.exports={
//     setUser,
//     getUser,
// }


//STATELLESS

const jwt = require('jsonwebtoken');
const secret = "charul@000";

function setUser(user) {
  return jwt.sign({ id: user._id, email: user.email, role:user.role }, secret);
}


function getUser(token){
  if(!token) return null;
  return jwt.verify(token, secret);
}

module.exports={
  setUser,
  getUser,
}