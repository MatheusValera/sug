"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaConstructionRepository = void 0;
class PrismaConstructionRepository {
    constructor(_prismaClient) {
        this._prismaClient = _prismaClient;
    }
    map(object) {
        const construction = {
            id: object.id,
            createdAt: new Date(object.createdAt),
            name: object.name,
            companyId: object.companyId,
            status: object.status
        };
        if (object.updatedAt) {
            construction.updatedAt = new Date(object.updatedAt);
        }
        return construction;
    }
    async insertConstruction(constructionData) {
        const construction = await this._prismaClient.construction.create({
            data: constructionData
        });
        const register = construction;
        return this.map(register);
    }
    async updateConstruction(constructionToUpdate) {
        const { id, ...data } = constructionToUpdate;
        const construction = await this._prismaClient.construction.update({
            data,
            where: { id }
        });
        const register = construction;
        return this.map(register);
    }
    async getConstruction(key, value) {
        const search = {};
        search[key] = value;
        const register = await this._prismaClient.construction.findUnique({
            where: search
        });
        return this.map(register);
    }
    async getConstructions() {
        const register = await this._prismaClient.construction.findMany({});
        return register.map(c => this.map(c));
    }
    async deleteConstruction(constructionId) {
        const construction = await this.getConstruction('id', constructionId);
        if (!construction) {
            throw new Error('[ENTITY - CONSTRUCTION]: Construção não encontrada');
        }
        await this._prismaClient.construction.delete({
            where: { id: constructionId }
        });
        return this.map(construction);
    }
}
exports.PrismaConstructionRepository = PrismaConstructionRepository;
