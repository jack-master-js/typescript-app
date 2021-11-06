import {User} from '../entity/User'

class UserService {
    /**
     * @api {GET} /user 获取用户
     * @apiGroup User
     * @apiQuery {String} id 用户ID
     */
    async root(req: any, res: any, next: any) {
        try {
            let users = await User.findOne(req.query.id);
            res.content(users)
        } catch (error) {
            next(error)
        }
    }
}

export default new UserService()
