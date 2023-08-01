import { usersModel } from "../db/models/users.model.js";

export default class UsersManager {

    async findUser(data) {
        try {
            const user = await usersModel.find(data).explain('executionStats')
            return user
        } catch (error) {
            console.log(error);
        }
    }

    async addUsers(users) {
        try {
            await usersModel.create(users)
            return 'Users Added'
        } catch (error) {
            console.log(error);
        }
    }

    async paginateFun(limit, page ){
        try {
            const result = await usersModel.paginate({gender: "Male"}, {limit, page})
            const info = {
                count: result.totalDocs,
                pages: result.totalPages,
                next: result.hasNextPage ? `http://localhost:8080/users/paginate?page=${result.NextPage}` : null, 
                prev: result.hasPrevPage ? `http://localhost:8080/users/paginate?page=${result.PrevPage}` : null
            }
            return { info, results: result.docs }
        } catch (error) {
            console.log(error);
        } 
    }
} 