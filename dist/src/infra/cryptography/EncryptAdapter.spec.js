"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const EncryptAdapter_1 = require("./EncryptAdapter");
jest.mock('bcrypt', () => ({
    async hash() {
        return await new Promise((resolve) => resolve('hash'));
    },
    async compare() {
        return await new Promise((resolve) => resolve(true));
    }
}));
const salt = 12;
const makeSut = () => {
    return new EncryptAdapter_1.EncryptAdapter(salt);
};
describe('Bcrypt Adapter', () => {
    test('should call hash with correct values', async () => {
        const sut = makeSut();
        const hashSpy = jest.spyOn(bcrypt_1.default, 'hash');
        await sut.hash('any_value');
        expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
    });
    test('should return a valid hash on sucess', async () => {
        const sut = makeSut();
        const result = await sut.hash('any_value');
        expect(result).toBe('hash');
    });
    test('should throw if Bcrypt throws', async () => {
        const sut = makeSut();
        jest.spyOn(bcrypt_1.default, 'hash').mockReturnValueOnce(new Promise((resolve, reject) => {
            reject(new Error());
        }));
        const result = sut.hash('any_value');
        await expect(result).rejects.toThrow();
    });
    test('should call compare with correct values', async () => {
        const sut = makeSut();
        const hashSpy = jest.spyOn(bcrypt_1.default, 'compare');
        await sut.compare('any_value', 'any_hash');
        expect(hashSpy).toHaveBeenCalledWith('any_value', 'any_hash');
    });
    test('should return true when compare suceeds', async () => {
        const sut = makeSut();
        const result = await sut.compare('any_value', 'any_hash');
        expect(result).toBe(true);
    });
    test('should return false when compare suceeds', async () => {
        const sut = makeSut();
        jest
            .spyOn(bcrypt_1.default, 'compare')
            .mockReturnValueOnce(new Promise((resolve) => resolve(false)));
        const result = await sut.compare('any_value', 'any_hash');
        expect(result).toBe(false);
    });
    test('should throw if compare throws', async () => {
        const sut = makeSut();
        jest.spyOn(bcrypt_1.default, 'compare').mockReturnValueOnce(new Promise((resolve, reject) => {
            reject(new Error());
        }));
        const result = sut.compare('any_value', 'any_hash');
        await expect(result).rejects.toThrow();
    });
});
