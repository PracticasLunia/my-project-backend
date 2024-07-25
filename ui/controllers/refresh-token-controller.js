import { refreshTokens } from "../../utils/jwt.js";

export default class RefreshTokenController {
    static async refresh(req, res){
        try{
            const tokens = await refreshTokens(req, res);
            res.status(200).json(tokens);
        } catch (err){
            console.log(err);
            res.status(err.status || 400).json({ error: "Something bad happened" })
        }
    }
}