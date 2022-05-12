//gives the page the information on who the logged in user is
function passUserToView(req, res, next) {
  res.locals.user = req.user ? req.user : null
  next()
}
//determined if the user is logged in and can access the full website
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect('/auth/google')
}
//exports for routing
export {
  passUserToView,
  isLoggedIn,
}