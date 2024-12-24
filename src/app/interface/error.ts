export type TError = {
  path: string | number;
  message: string;
}[];

export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  error: TError;
};
// {
//   "success": false,
//   "message": "Validation error",
//   "statusCode": 400,
//   "error": { "details" },
//   "stack": "error stack"
// }
