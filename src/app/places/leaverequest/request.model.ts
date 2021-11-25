export class Request {
  constructor(
    public id: string,
    public userId: string,
    public name: string,
    public type: string,
    public reason: string,
    public approval: string,
    public dateFrom: Date,
    public dateTo: Date,
  ) {}
}