export default function isAdmin(req, res, next) {
    if (!req.user) {
        return res.status(401).json({ auth: false, message: 'Error, no user provided' });
    }
    if (!req.user.admin) {
        return res.status(401).json({ auth: false, message: 'User no admin' });
    }
    next();
}
