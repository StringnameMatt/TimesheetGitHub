export class Jobs {
  constructor(
    public id: string,
    public businessName: string,
    public phoneNumber: number,
    public emailAddress: string,
    public businessType: string,
    public jobAddress: string,
    public imageUrl: string,
    public placeId: string,
  ) {}
}