export default class UserIsVerifiedController {
    static async isVerified(req, res){
        try{
            if(res.locals.user)
                res.status(200).json({});
            else
                throw new Error("");
        } catch (err){
            res.status(400).json({ error: "Something bad happened" })
        }
    }
}