import JWTUtils from "../../utils/jwt.js";

export default class RefreshTokenController {
    static async refresh(req, res){
        try{
            const tokens = JWTUtils.refreshTokens(req, res);
            res.status(200).json(tokens);
        } catch (err){
            res.status(err.status || 400).json({ error: err.message });
        }
    }
}