export class Request {
  constructor(
    public id: string,
    public name: string,
    public type: string,
    public reason: string,
    public dateFrom: Date,
    public dateTo: Date,
  ) {}
}