"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaAllocationRepository = void 0;
class PrismaAllocationRepository {
    constructor(_prismaClient) {
        this._prismaClient = _prismaClient;
    }
    map(object) {
        const allocation = {
            id: object.id,
            userId: object.userId,
            createdAt: new Date(object.createdAt),
            constructionId: object.constructionId,
            status: object.status
        };
        if (object.updatedAt) {
            allocation.updatedAt = new Date(object.updatedAt);
        }
        return allocation;
    }
    async insertAllocation(allocationData) {
        const allocation = await this._prismaClient.allocation.create({
            data: allocationData
        });
        return this.map(allocation);
    }
    async updateAllocation(allocationToUpdate) {
        const { id, ...data } = allocationToUpdate;
        const allocation = await this._prismaClient.allocation.update({
            data,
            where: { id }
        });
        return this.map(allocation);
    }
    async getAllocation(allocationId) {
        const result = await this._prismaClient.allocation.findUnique({
            where: { id: allocationId }
        });
        return this.map(result);
    }
    async getAllocations() {
        const result = await this._prismaClient.allocation.findMany({});
        return result.map(r => this.map(r));
    }
    async getAllocationByUserId(userId) {
        const result = await this._prismaClient.allocation.findMany({
            where: { userId }
        });
        return result.map(r => this.map(r));
    }
    async getAllocationByConstructionId(constructionId) {
        const result = await this._prismaClient.allocation.findMany({
            where: { constructionId }
        });
        return result.map(r => this.map(r));
    }
    async deleteAllocation(allocationId) {
        const allocation = await this.getAllocation(allocationId);
        if (!allocation) {
            throw new Error('[ENTITY - ALLOCATION]: Alocação não encontrada');
        }
        await this._prismaClient.allocation.delete({
            where: { id: allocationId }
        });
        return this.map(allocation);
    }
}
exports.PrismaAllocationRepository = PrismaAllocationRepository;
