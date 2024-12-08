import Model from '../models/index.js';
import validation from '../utils/validation.js';
export default {
    createUser: validation.asyncHandler(async (req, res) => {
        const user = new Model.UserModel(req.body);
        const savedUser = await user.save();
        validation.success(res, "User Create Successfully", savedUser);
    })
};
