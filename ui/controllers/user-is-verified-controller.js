export default class UserIsVerifiedController {
    static async isVerified(req, res){
        try{
            res.status(200).json({});
        } catch (err){
            res.status(400).json({ error: "Something bad happened" })
        }
    }
}