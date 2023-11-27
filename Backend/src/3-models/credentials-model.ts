import Joi from "joi";

class CredentialsModel {

    public email: string;
    public password: string;

    constructor(user: CredentialsModel) {
        this.email = user.email;
        this.password = user.password;

    }
    // add validation schema and validate function
    private static validationSchema = Joi.object({

    })




    
}
export default CredentialsModel;