"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const PrismaClient_1 = require("../../../infra/prisma/PrismaClient");
const EncryptAdapter_1 = require("../../../infra/cryptography/EncryptAdapter");
const UserRepository_1 = require("../../repository/user/UserRepository");
const UserPermissionsRepository_1 = require("../../repository/user/permissions/UserPermissionsRepository");
// import { IUser } from '../../../domain/data/entity/IUser'
class User {
    constructor(_id, _cpf, _city, _road, _name, _phone, _admin, _office, _zipCode, _createdAt, _updatedAt, _password, _permissions, _numberHouse, _neighborhood, _email) {
        this._id = _id;
        this._cpf = _cpf;
        this._city = _city;
        this._road = _road;
        this._name = _name;
        this._phone = _phone;
        this._admin = _admin;
        this._office = _office;
        this._zipCode = _zipCode;
        this._createdAt = _createdAt;
        this._updatedAt = _updatedAt;
        this._password = _password;
        this._permissions = _permissions;
        this._numberHouse = _numberHouse;
        this._neighborhood = _neighborhood;
        this._email = _email;
        this._userRepository = new UserRepository_1.PrismaUserRepository(PrismaClient_1.prismaClient.getClient());
        this._permissionsRepository = new UserPermissionsRepository_1.PrismaPermissionsUserRepository(PrismaClient_1.prismaClient.getClient());
    }
    // async addUser (): Promise<IUser> {
    // const isValid = this.validateAttributes()
    // if (!isValid) {
    //   return null
    // }
    // const save = this._userRepository.insertUser(user)
    //   return save
    // }
    async getUser() {
        if (!this._email) {
            throw new Error('[USER] - Email not provided');
        }
        const result = await this._userRepository.getUser('email', this._email);
        if (result) {
            this._id = result.id;
            this._cpf = result.cpf;
            this._city = result.city;
            this._road = result.road;
            this._name = result.name;
            this._phone = result.phone;
            this._admin = result.admin;
            this._office = result.office;
            this._zipCode = result.zipCode;
            this._password = result.password;
            this._updatedAt = result.updatedAt;
            this._createdAt = result.createdAt;
            this._numberHouse = result.numberHouse;
            this._neighborhood = result.neighborhood;
            this._permissions = await this._permissionsRepository.getPermissionToUserByUserId(this._id);
        }
    }
    async comparePassword(passwordToCompare) {
        const salt = parseInt(process.env.SALT);
        const encryptAdapter = new EncryptAdapter_1.EncryptAdapter(salt);
        if (!this._password && this._email) {
            await this.getUser();
        }
        if (!passwordToCompare) {
            return false;
        }
        const isMatch = await encryptAdapter.compare(passwordToCompare, this._password);
        return isMatch;
    }
    // private validateAttributes? (user: Omit<IUser, 'id'>): boolean {
    // }
    getId() {
        return this._id;
    }
    getObjectUser() {
        return {
            id: this._id,
            cpf: this._cpf,
            city: this._city,
            road: this._road,
            name: this._name,
            email: this._email,
            phone: this._phone,
            admin: this._admin,
            office: this._office,
            zipCode: this._zipCode,
            password: this._password,
            updatedAt: this._updatedAt,
            createdAt: this._createdAt,
            permissions: this._permissions,
            numberHouse: this._numberHouse,
            neighborhood: this._neighborhood
        };
    }
}
exports.User = User;
