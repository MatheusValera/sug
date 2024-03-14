"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaUserRepository = void 0;
class PrismaUserRepository {
    constructor(_prismaClient) {
        this._prismaClient = _prismaClient;
    }
    async insertUser(data) {
        if (!data.cpf) {
            throw new Error('[ENTITY- USER]: CPF Obrigatório');
        }
        const user = await this._prismaClient.user.findUnique({ where: { cpf: data.cpf } });
        if (user) {
            throw new Error('[ENTITY- USER]: Usuário já cadastrado');
        }
        data.createdAt = new Date();
        const register = await this._prismaClient.user.create({ data });
        return register;
    }
    async updateUser(userToUpdate) {
        if (!userToUpdate.cpf) {
            throw new Error('[ENTITY- USER]: CPF Obrigatório');
        }
        const user = await this._prismaClient.user.findUnique({ where: { cpf: userToUpdate.cpf } });
        if (!user) {
            throw new Error('[ENTITY- USER]: Usuário não encontrado');
        }
        const data = {
            city: userToUpdate.city,
            road: userToUpdate.road,
            name: userToUpdate.name,
            email: userToUpdate.email,
            phone: userToUpdate.phone,
            admin: userToUpdate.admin,
            office: userToUpdate.office,
            zipCode: userToUpdate.zipCode,
            password: userToUpdate.password,
            numberHouse: userToUpdate.numberHouse,
            neighborhood: userToUpdate.neighborhood,
            updatedAt: new Date()
        };
        const register = await this._prismaClient.user.update({ data, where: { cpf: userToUpdate.cpf } });
        return register;
    }
    async getUsers() {
        const listUser = await this._prismaClient.user.findMany({});
        return listUser;
    }
    async getUser(key, value) {
        const search = {};
        search[key] = value;
        const user = await this._prismaClient.user.findUnique({ where: search });
        return user;
    }
    async deleteUser(id) {
        const user = await this.getUser('id', id);
        if (!user) {
            throw new Error('[ENTITY- USER]: Usuário não encontrado');
        }
        const deleted = await this._prismaClient.user.delete({ where: { id } });
        return deleted;
    }
}
exports.PrismaUserRepository = PrismaUserRepository;
