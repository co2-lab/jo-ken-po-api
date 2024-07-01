export enum Messages {
  CHALLENGE_CREATED = 'Challenge created',
  USER_NOT_FOUND = 'User not found',
  INTERNAL_SERVER_ERROR = 'Internal server error',
  NO_BETS_FOUND = 'No bets found',
  BETS_MISMATCH = 'The bet amount does not match the original value',
  BET_AMOUNT_INVALID = 'The bet amount must be between 10 and 10,000',
  NO_USERS_FOUND = 'No users found',
  NO_WINNERS_FOUND = 'No winners found',
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  BET_NOT_MATCH = 'The bet amount does not match the original value',
  USER_CREATED = 'User created',
  EMAIL_AND_PASSWORD_REQUIRED = 'Email and password are required',
  INCORRECT_PASSWORD = 'Incorrect password',
  AUTHENTICATION_SUCCESS = 'Authentication successful',
  EMAIL_NOT_PROVIDED = 'Email is required',
  PASSWORD_NOT_PROVIDED = 'Password is required',
  USER_ALREADY_EXISTS = 'User already exists'
}
