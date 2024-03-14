"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const PrismaClient_1 = require("./PrismaClient");
describe('prismaClient', () => {
    let originalPrismaClient;
    beforeAll(() => {
        originalPrismaClient = PrismaClient_1.prismaClient._prismaClient;
    });
    beforeEach(() => {
        PrismaClient_1.prismaClient._prismaClient = null;
    });
    afterEach(() => {
        PrismaClient_1.prismaClient._prismaClient = originalPrismaClient;
    });
    it('should return a PrismaClient instance', () => {
        const client = PrismaClient_1.prismaClient.getClient();
        expect(client).toBeInstanceOf(client_1.PrismaClient);
    });
    it('should return the same instance on subsequent calls', () => {
        const client1 = PrismaClient_1.prismaClient.getClient();
        const client2 = PrismaClient_1.prismaClient.getClient();
        expect(client1).toBe(client2);
    });
});
