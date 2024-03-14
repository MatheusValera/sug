"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPermissionsService = void 0;
class GetPermissionsService {
    constructor(_permissionRepository) {
        this._permissionRepository = _permissionRepository;
    }
    async handler(id) {
        if (!id) {
            return new Error('No id provided');
        }
        const permissions = await this._permissionRepository.getPermissionToUserByUserId(id);
        return permissions;
    }
}
exports.GetPermissionsService = GetPermissionsService;
