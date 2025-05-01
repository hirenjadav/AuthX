import { ErrorCodes } from './error-codes.constant';

export const ErrorMessages: Record<ErrorCodes, string> = {
  [ErrorCodes.BAD_REQUEST]: 'Bad request.',
  [ErrorCodes.FORBIDDEN]: 'Access forbidden.',
  [ErrorCodes.UNAUTHORIZED]: 'Unauthorized access.',
  [ErrorCodes.INTERNAL_SERVER_ERROR]: 'Something went wrong.',

  [ErrorCodes.USER_NOT_FOUND]: 'User not found.',
  [ErrorCodes.USER_EMAIL_ALREADY_EXISTS]: 'Email already exists.',
  [ErrorCodes.INVALID_USER_CREDENTIALS]: 'Invalid credentials provided.',

  [ErrorCodes.APPLICATION_NOT_FOUND]: 'Application not found.',
};
