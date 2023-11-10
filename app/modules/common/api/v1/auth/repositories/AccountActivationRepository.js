const mongoose = require('mongoose');


class AccountActivationRepository {


    constructor() {
        this.accountActivationModel = mongoose.model('AccountActivation');
    }

    async createAccountActivation(data) {


        const activationObject = await this.getAccountActivation(data);

        if (!_.isEmpty(activationObject))
        await this.deleteActivation(data.email)
        data.token = Math.floor(100000 + Math.random() * 900000);
        return this.accountActivationModel.create({data});
    };


    
    async deleteActivation(email) {
        return this.accountActivationModel.findOneAndDelete({email: email});
    };

    async getActivation(data) {
        return await this.accountActivationModel
            .findOne({email: data.email, token: data.token})
            .exec();
    }

}

module.exports = AccountActivationRepository;
