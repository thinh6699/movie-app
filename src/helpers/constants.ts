export enum MOVIE_TYPE {
  TOP_RATED = 'top-rated',
  FAVORITE = 'favorite'
}

export enum RESPONSE_STATUS {
  SUCCESS = 200,
  NOT_FOUND = 404
}

export const MAX_INPUT_TEXT = 255
export const MAX_PASSWORD_TEXT = 64
export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
export const TIMEOUT = 500

export const PER_PAGE = 5

export const emailRegex =
  /^((?=[^@._+-])(([A-Za-z0-9._+-]))*@((([A-Za-z0-9])*([._-])?)([._-]))+((([A-Za-z0-9])){1,}))$/

export const passwordRegex =
  /^(?=.*[0-9])(?=.*[A-Za-z])(?=.*[!%@#&\-()_[\]{}:;`'",.+*?\\/~$^=<>|\\])[0-9A-Za-z!%@#&\-()_[\]{}:;`'",.+*?\\/~$^=<>|\\]{8,64}$/ // minimum 8 characters, at least one letter, one number and one special characters
