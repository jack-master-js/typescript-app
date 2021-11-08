import { User } from '../common/entity/User';
import { page } from '../common/utils';
import xlsx from 'node-xlsx';

class UserService {
    /**
     * @api {GET} /api/users 获取用户
     * @apiGroup User
     * @apiQuery {String} id 用户ID
     */
    async getUser(req: any, res: any, next: any) {
        try {
            let user = await User.findOne(req.query.id);
            res.content(user);
        } catch (error) {
            next(error);
        }
    }

    /**
     * @api {POST} /api/users 新增用户
     * @apiGroup User
     * @apiUse UserEntity
     */
    async saveUser(req: any, res: any, next: any) {
        try {
            await User.save(req.body);
            res.success();
        } catch (error) {
            next(error);
        }
    }

    /**
     * @api {PATCH} /api/users 更新用户
     * @apiGroup User
     * @apiBody {String} id 用户ID
     */
    async updateUser(req: any, res: any, next: any) {
        try {
            await User.update(req.body.id, req.body);
            res.success();
        } catch (error) {
            next(error);
        }
    }

    /**
     * @api {DELETE} /api/users 删除用户
     * @apiGroup User
     * @apiBody {String} id 用户ID
     */
    async deleteUser(req: any, res: any, next: any) {
        try {
            await User.delete(req.body.id);
            res.success();
        } catch (error) {
            next(error);
        }
    }

    /**
     * @api {GET} /api/users/list 获取用户列表
     * @apiGroup User
     * @apiQuery {Number} pageIndex 分页序号
     * @apiQuery {Number} pageSize 分页数量
     * @apiQuery {String} [name] 姓名
     * @apiQuery {Number} [age] 年龄
     */
    async getUserList(req: any, res: any, next: any) {
        try {
            const { pageIndex, pageSize, ...where } = req.query;
            const query = page(pageIndex, pageSize, where);
            let [users, count] = await User.findAndCount(query);
            res.content(users, count);
        } catch (error) {
            next(error);
        }
    }

    /**
     * @api {DELETE} /api/users/list 批量删除用户
     * @apiGroup User
     * @apiBody {Array} ids 用户ID
     */
    async deleteUserList(req: any, res: any, next: any) {
        try {
            await User.delete(req.body.ids);
            res.success();
        } catch (error) {
            next(error);
        }
    }

    /**
     * @api {GET} /api/users/export 导出用户数据
     * @apiGroup User
     * @apiDescription 此接口需用浏览器打开实现下载
     */
    async exportUserList(req: any, res: any, next: any) {
        try {
            const data = [
                [1, 2, 3],
                [true, false, null, 'sheetjs'],
                ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'],
                ['baz', null, 'qux'],
            ];
            let buffer = xlsx.build([{ name: 'mySheetName', data: data }]);
            res.attachment('mySheetName.xlsx');
            res.send(buffer);
        } catch (error) {
            next(error);
        }
    }
}

export default new UserService();
