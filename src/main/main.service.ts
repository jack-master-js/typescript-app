class MainService {
    home(req: any, res: any, next: any) {
        try {
            // throw {message: 'error'}
            res.success()
        } catch (error) {
            next(error)
        }
    }
}

export default new MainService()
