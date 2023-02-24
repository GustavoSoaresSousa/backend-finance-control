import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';

export interface DecodedUser extends Omit<User,'_id'> {
  id: string;
}

export class AuthService{
  public async hashPassword(password: string, salt = 10): Promise<string>{
    return await bcrypt.hash(password, salt)
  }

  public async comparePassword(password: string, passwordDb: string): Promise<boolean>{
    return await bcrypt.compare(password, passwordDb);
  }
  
  public generateToken(payload: object): string {
    return jwt.sign(payload, 'some-key', {
      expiresIn: 2000000000
    });
  }

  public decodeToken(token: string): DecodedUser {
    return jwt.verify(token, 'some-key') as DecodedUser;
  }
}