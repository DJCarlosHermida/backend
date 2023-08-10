import Router from './customeRouter.js'

export default class UsersRouter extends Router {
    init(){
        this.get('/', (req,res) => {
            res.succesResponse('Error be came')
        })
    }

}