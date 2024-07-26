export default class UserIsAdminController {
    static async isAdmin(req, res){
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