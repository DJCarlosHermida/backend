import { Router } from "express";

export default class CustomeRouter {

    constructor() {
        this.router = Router(),
        this.init()
    }

    getRouter(){
        return this.router
    }

    get(path, ...functions) {
        this.router.get(path,
            this.customerResponses,
            this.resolveFunctions(functions))
    }

    post(path, ...functions) {
        this.router.post(path,
            this.customerResponses,
            this.resolveFunctions(functions))
    }

    put(path, ...functions) {
        this.router.put(path,
            this.customerResponses,
            this.resolveFunctions(functions))
    }

    delete(path, ...functions) {
        this.router.delete(path,
            this.customerResponses,
            this.resolveFunctions(functions))
    }

    resolveFunctions(functionsArray) {
        return functionsArray.map(fn => async () => {
            try {
                await fn.apply(this, params)
            } catch (error) {
                console.log(error)
            }
        })
    }

    customerResponses(req, res, next) {
        res.successResponse = (message) => res.json({ status: 'Success', message })
        res.errorResponse = (error) => res.json({ status: 'Error', message: error })
        next()
    }
}

