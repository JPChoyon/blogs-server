import { Request, Response } from 'express';
import { userServices } from './user.service';
import httpStatus from 'http-status-codes';
import sendResponse from '../../utils/sendResponse';

const createUser = async (req: Request, res: Response) => {
  const userData = req.body;

  const existingUser = await userServices.findUserByEmail(userData.email);
  if (existingUser) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST, // 400 Bad Request
      success: false,
      message: 'Email is already in use',
      data: null,
    });
  }
  const result = await userServices.createUserInDB(userData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
};
export const userController = {
  createUser,
};
