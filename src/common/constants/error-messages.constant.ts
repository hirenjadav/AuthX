import { ErrorCodes } from './error-codes.constant';

export const ErrorMessages: Record<ErrorCodes, string> = {
  [ErrorCodes.USER_NOT_FOUND]: 'User not found.',
  [ErrorCodes.EMAIL_ALREADY_EXISTS]: 'Email already exists.',
  [ErrorCodes.INVALID_PASSWORD]: 'Invalid password provided.',
  [ErrorCodes.UNAUTHORIZED]: 'Unauthorized access.',
  [ErrorCodes.FORBIDDEN]: 'Access forbidden.',
  [ErrorCodes.INTERNAL_SERVER_ERROR]: 'Something went wrong.',
  [ErrorCodes.BAD_REQUEST]: 'Bad request.',
};
