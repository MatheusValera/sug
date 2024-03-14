"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const PermissionsRepository_1 = require("./PermissionsRepository");
jest.mock('@prisma/client', () => ({
    PrismaClient: jest.fn().mockImplementation(() => ({
        permission: {
            findUnique: jest.fn()
        }
    }))
}));
const makeSut = () => {
    const prismaMock = new client_1.PrismaClient();
    const sut = new PermissionsRepository_1.PrismaPermissionRepository(prismaMock);
    return {
        sut,
        prismaMock
    };
};
describe('PrismaPermissionRepository', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should get permission by id', async () => {
        const { sut, prismaMock } = makeSut();
        const permissionId = 1;
        const permissionData = {
            id: permissionId,
            description: 'Permission 1'
        };
        // @ts-expect-error
        prismaMock.permission.findUnique.mockResolvedValue(permissionData);
        const result = await sut.get(permissionId);
        expect(result).toEqual(permissionData);
        expect(prismaMock.permission.findUnique).toHaveBeenCalledWith({ where: { id: permissionId } });
    });
    it('should return null when getting non-existing permission by id', async () => {
        const { sut, prismaMock } = makeSut();
        const permissionId = 1;
        // @ts-expect-error
        prismaMock.permission.findUnique.mockResolvedValue(null);
        const result = await sut.get(permissionId);
        expect(result).toBeNull();
        expect(prismaMock.permission.findUnique).toHaveBeenCalledWith({ where: { id: permissionId } });
    });
});
