const { AuthenticationError } = require("apollo-server-express");

const authenticated = (next) => (root, args, context, info) => {
  const hasUser = context.currentUser
    ? Object.keys(context.currentUser).length === 0
    : null;
  if (hasUser) {
    throw new AuthenticationError(`you must be logged in!`);
  }

  return next(root, args, context, info);
};

const validateRole = (role) => (next) => (root, args, context, info) => {
  if (context.currentUser.role !== role) {
    throw new Error(`Unauthorized`);
  }

  return next(root, args, context, info);
};

module.exports = {
  authenticated,
  validateRole,
};
