import Router from './customeRouter.js'

class UsersRouter extends Router {
    init() {
        this.get('/', (req, res) => {
            res.succesResponse('All is good')
        })

        this.get('/error', (req, res) => {
            res.successResponse('Error be came')
        })

    }

}

export const usersRouter = new UsersRouter()