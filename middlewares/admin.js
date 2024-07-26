export default function isAdmin(req, res, next) {
    if (!res.locals.user) {
        return res.status(401).json({ auth: false, message: 'Error, no user provided' });
    }
    if (!res.locals.user.admin) {
        return res.status(401).json({ auth: false, message: 'User no admin' });
    }
    next();
}
