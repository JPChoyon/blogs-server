import { userServices } from './user.service';
import httpStatus from 'http-status-codes';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const createUser = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await userServices.createUserInDB(userData);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User registered successfully',
    data: {
      _id: result._id,
      name: result.name,
      email: result.email,
    },
  });
});
export const userController = {
  createUser,
};
