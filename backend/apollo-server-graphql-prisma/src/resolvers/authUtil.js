const authenticated = (next) => (root, args, context, info) => {
    console.log(context.currentUser)
    if (!context.currentUser) {
        throw new Error(`Unauthenticated!`);
    }

    return next(root, args, context, info);
};

const validateRole = role => next => (root, args, context, info) => {
    if (context.currentUser.role !== role) {
        throw new Error(`Unauthorized`)
    }

    return next(root, args, context, info)
}

module.exports = {
    authenticated,
    validateRole
}