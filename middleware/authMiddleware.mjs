export const requireAuth = (req, res, next) => {
  // Check if user is authenticated, for example, by checking the session or token
  // Here, you can use the session or token stored in the request to verify the user's authentication status
  // If the user is authenticated, call next() to proceed to the next middleware
  // If not authenticated, send an error response
  if (req.session && req.session.isAuthenticated) {
    next(); // User is authenticated, proceed to the next middleware
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
