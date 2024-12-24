import { Request, Response } from 'express';
import { userServices } from './user.service';
import httpStatus from 'http-status-codes';
import sendResponse from '../../utils/sendResponse';
import handleDuplicateError from '../../error/handleDuplicateError';

const createUser = async (req: Request, res: Response) => {
  const userData = req.body;
  try {
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
  } catch (err) {
    if (err.code === 11000) {
      const duplicateError = handleDuplicateError(err);
      return sendResponse(res, {
        statusCode: duplicateError.statusCode,
        success: false,
        message: duplicateError.message,
        data: null,
      });
    }
  }
};
export const userController = {
  createUser,
};
