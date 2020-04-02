const firebaseAdmin = require("./../services/auth/firebaseAuthService");
const catchAsync = require("./../utils/authCatchAsync");

const getAuthToken = req => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  } else {
    return null;
  }
};

exports.checkIfAuthenticated = catchAsync(async (req, res, next) => {
  const authToken = getAuthToken(req);
  const userInfo = await firebaseAdmin.auth().verifyIdToken(authToken);
  req.authId = userInfo.uid;
  return next();
});
