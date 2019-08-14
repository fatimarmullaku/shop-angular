export class UsersModel {
  id: number;
  email: string;
  password: string;
  isVerified: boolean;
  recordStatus: string;
  createDateTime: Date;
  updateDateTime: Date;
  description: string;
  version: bigint;
}
