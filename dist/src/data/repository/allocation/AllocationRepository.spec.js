"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const AllocationRepository_1 = require("./AllocationRepository");
jest.mock('@prisma/client', () => ({
    PrismaClient: jest.fn().mockImplementation(() => ({
        allocation: {
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn()
        }
    }))
}));
const makeSut = () => {
    const prismaMock = new client_1.PrismaClient();
    const sut = new AllocationRepository_1.PrismaAllocationRepository(prismaMock);
    return {
        sut,
        prismaMock
    };
};
describe('PrismaAllocationRepository', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should insert allocation', async () => {
        const { sut, prismaMock } = makeSut();
        const data = { userId: 1, constructionId: 1 };
        const allocationExpected = { id: 1, userId: 1, constructionId: 1 };
        // @ts-expect-error
        prismaMock.allocation.create.mockResolvedValue(allocationExpected);
        const result = await sut.insertAllocation(data);
        expect(result).toEqual(allocationExpected);
        expect(prismaMock.allocation.create).toHaveBeenCalledWith({ data: data });
    });
    it('should update allocation', async () => {
        const { sut, prismaMock } = makeSut();
        const allocationToUpdate = { id: 1, userId: 2, constructionId: 1 };
        const allocationExpected = { id: 1, userId: 2, constructionId: 1 };
        // @ts-expect-error
        prismaMock.allocation.update.mockResolvedValue(allocationExpected);
        const result = await sut.updateAllocation(allocationToUpdate);
        expect(result).toEqual(allocationExpected);
        expect(prismaMock.allocation.update).toHaveBeenCalledWith({
            data: expect.objectContaining({ userId: allocationToUpdate.userId, constructionId: allocationToUpdate.constructionId }),
            where: { id: allocationToUpdate.id }
        });
    });
    it('should get allocation by id', async () => {
        const { sut, prismaMock } = makeSut();
        const allocation = { id: 1, userId: 1, constructionId: 1 };
        // @ts-expect-error
        prismaMock.allocation.findUnique.mockResolvedValue(allocation);
        const result = await sut.getAllocation(1);
        expect(result).toEqual(allocation);
        expect(prismaMock.allocation.findUnique).toHaveBeenCalledWith({
            where: { id: 1 }
        });
    });
    it('should get all allocations', async () => {
        const { sut, prismaMock } = makeSut();
        const allocation = [];
        // @ts-expect-error
        prismaMock.allocation.findMany.mockResolvedValue(allocation);
        const result = await sut.getAllocations();
        expect(result).toEqual(allocation);
        expect(prismaMock.allocation.findMany).toHaveBeenCalledWith({});
    });
    it('should get allocations by construction id', async () => {
        const { sut, prismaMock } = makeSut();
        const constructionId = 1;
        const allocation = [];
        // @ts-expect-error
        prismaMock.allocation.findMany.mockResolvedValue(allocation);
        const result = await sut.getAllocationByConstructionId(constructionId);
        expect(result).toEqual(allocation);
        expect(prismaMock.allocation.findMany).toHaveBeenCalledWith({
            where: { constructionId }
        });
    });
    it('should get allocations by construction id', async () => {
        const { sut, prismaMock } = makeSut();
        const userId = 1;
        const allocation = [];
        // @ts-expect-error
        prismaMock.allocation.findMany.mockResolvedValue(allocation);
        const result = await sut.getAllocationByUserId(userId);
        expect(result).toEqual(allocation);
        expect(prismaMock.allocation.findMany).toHaveBeenCalledWith({
            where: { userId }
        });
    });
    it('should delete allocation', async () => {
        const { sut, prismaMock } = makeSut();
        const allocationId = 1;
        const allocation = { id: 1, userId: 1, constructionId: 1 };
        // @ts-expect-error
        prismaMock.allocation.findUnique.mockResolvedValue(allocation);
        // @ts-expect-error
        prismaMock.allocation.delete.mockResolvedValue(allocation);
        const result = await sut.deleteAllocation(allocationId);
        expect(result).toEqual(allocation);
        expect(prismaMock.allocation.findUnique).toHaveBeenCalledWith({
            where: { id: allocationId }
        });
        expect(prismaMock.allocation.delete).toHaveBeenCalledWith({
            where: { id: allocationId }
        });
    });
    it('should delete allocation', async () => {
        const { sut, prismaMock } = makeSut();
        const allocationId = 2;
        const allocation = null;
        // @ts-expect-error
        prismaMock.allocation.findUnique.mockResolvedValue(allocation);
        // @ts-expect-error
        prismaMock.allocation.delete.mockResolvedValue(allocation);
        const result = sut.deleteAllocation(allocationId);
        await expect(result).rejects.toThrow(Error('[ENTITY - ALLOCATION]: Alocação não encontrada'));
    });
});
