export default function isVerified(req, res, next) {
    if (!res.locals.user) {
        return res.status(401).json({ auth: false, message: 'Error, no user provided' });
    }
    if (!res.locals.user.verified) {
        return res.status(401).json({ auth: false, message: 'User no verified' });
    }
    next();
}
