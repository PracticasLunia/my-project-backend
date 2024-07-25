export default function isVerified(req, res, next) {
    if (!req.user) {
        return res.status(401).json({ auth: false, message: 'Error, no user provided' });
    }
    if (!req.user.verified) {
        return res.status(401).json({ auth: false, message: 'User no verified' });
    }
    next();
}
