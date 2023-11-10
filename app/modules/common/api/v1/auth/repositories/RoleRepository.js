const mongoose = require('mongoose');
require('../models/role');

const {pagination, page} = require(__utils + 'helpers');

class RoleRepository {

    constructor() {
        this.roleModel = mongoose.model('Role');
    }

    async createRole(data) {
        let existingRoleName = await this.getRoleByName(data.name);
        if (!!existingRoleName){
            return {error: `There is an existing role with the name ${data.name}`}
        }

        return this.roleModel.create(data);
    };

    async getRoles(PaginationVal, pageVal) {

        const paginationRes = pagination(PaginationVal);
        const pageRes = page(pageVal);

        return await this.roleModel.find({})
            .skip((pageRes - 1) * paginationRes)
            .limit(paginationRes)
            .sort({createdAt: -1})
            .exec();

    }

    async getRoleType(type) {
        return await this.roleModel.find({name: {$regex: type}})
            .exec();
    }

    async updateRole(id, userData) {
        return await this.roleModel.findByIdAndUpdate({_id: id},
            userData, {new: true});
    }

    async deleteRoleById(id) {
        return this.roleModel.restore(id);
    };

    async restoreRole(id){
        return this.roleModel.restore(id);
    };

    async getRole(id) {
        return await this.roleModel
            .findOne({_id: id})
            .exec();
    }

    async getRoleByName(name) {
        return await this.roleModel
            .findOne({name: name})
            .exec();
    }
}

module.exports = RoleRepository;

