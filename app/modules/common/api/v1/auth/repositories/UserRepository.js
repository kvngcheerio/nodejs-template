const mongoose = require('mongoose');
const roleModel = require('../models/role');
const activationModel = require('../models/account_activation');
const subscriptionModel = require('../models/subscription');
const _ = require('lodash');

const {pagination, page} = require(__utils + 'helpers');


class UserRepository {

    // userModel;

    constructor() {
        this.userModel = mongoose.model('User');
        this.activationModel = mongoose.model('AccountActivation');
        this.subscriptionModel = mongoose.model('Subscription');
    }

    async createUser(data) {
        //console.log(data)
        let code = Math.floor(100000 + Math.random() * 900000);
        let activate = {}
        activate.token = code;
        activate.email = data.email;

        let token = await this.activationModel.create(activate);

        if(token){

        if (!data.role) {
            data.account_type = 'business';
            let role = await roleModel.findOne({name:'business'}).exec();
            
            if (role)
                data.role_id = role._id;
            else
                return {error: 'Error creating user'}
        }

        const userObject = await this.getUserByEmail(data.email);

        if (!_.isEmpty(userObject))
            return {error: 'The user email has already been taken '};

        data.password = await (new this.userModel).encryptPassword(data.password);
        let sub = await subscriptionModel.findOne({name: 'free_trial'}).exec();
        data.subscription_id = sub._id;
        
        return this.userModel.create(data);
       
        }
    };

    async createUserByPhone(data){
        if (!data.role) {
            data.account_type = 'user';

            let role = await roleModel.findOne({name: 'user'}).exec();

            if (role)
                data.role = role.id;
            else
                return {error: 'Error creating user'}
        }

        if (data.email){
            const userObject = await this.getUserByEmail(data.email);

            if (!_.isEmpty(userObject))
                return {error: 'The user email has already been taken '};
        }
        else {
            delete data['email']
        }

        const userObject = await this.getUserByPhoneNumber(data.phone_number);

        if (!_.isEmpty(userObject))
            return {error: 'The user phone number has already been taken '};

       
        return (this.userModel.create(data));
    }

    async getUsers(data, PaginationVal, pageVal) {
        let searchData = {};

        if (data.account_type){
            searchData = {
                ...searchData,
                account_type: data.account_type
            };
        }
        if (data.role){
            searchData = {
                ...searchData,
                role: data.role
            };
        }
        const paginationRes = pagination(PaginationVal);
        const pageRes = page(pageVal);

        return await this.userModel.find(searchData)
            .skip((pageRes - 1) * paginationRes)
            .limit(paginationRes)
            .sort({createdAt: -1})
            .exec();

    }

    async updateUser(id, userData) {
        if (userData.email) {
            const userObject = await this.getUserByEmail(userData.email);
            if (!_.isEmpty(userObject) && userObject._id + '' != id)
                return {error: 'The user email has already been taken.'};
        }

        if (userData.password) {
            const user = await this.userModel.findOne({_id: id}).select('+password')

            if (!user) return {error: 'Invalid User'}
            const confirmPass = await user.validPassword(userData.password);
            if (!confirmPass) return {error: 'Old Password incorrect'}

            userData.password = await (new this.userModel).encryptPassword(userData.new_password);
        }

        return await this.userModel.findByIdAndUpdate({_id: id},
            userData, {new: true});
    }

    async deleteUser(id) {
        return this.userModel.findByIdAndDelete(id);
    };

    async getUser(id) {
        return await this.userModel
            .findOne({_id: id})
            .exec();
    }

    async getUserBalance(id) {
       user = this.getUser(id);
       return user.balance;
    }

    async getUserByEmail(email) {
        return await this.userModel
            .findOne({email: email})
            .exec();
    }

    async getUserByPhoneNumber(phone_number) {
        return await this.userModel
            .findOne({phone_number})
            .populate('role')
            .populate('company')
            .exec();
    }

    async activateUser(email) {
    const userObject = await this.getUserByEmail(email);
    if (!userObject){
    return {error: 'User account does not exist'};
    }
    return await this.userModel.findByIdAndUpdate({_id: userObject._id},
        {status: 'active'}, {new: true});
    }


}

module.exports = UserRepository;
