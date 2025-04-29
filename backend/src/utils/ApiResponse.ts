export class ApiResponse<T> {
  constructor(
    public success: boolean,
    public statusCode: number,
    public message: string,
    public data?: object | null,
    public error?: object | null,
  ) {}
}
