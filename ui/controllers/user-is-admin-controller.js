export default class UserIsAdminController {
    static async isAdmin(req, res){
        try{
            res.status(200).json({});
        } catch (err){
            res.status(400).json({ error: "Something bad happened" })
        }
    }
}