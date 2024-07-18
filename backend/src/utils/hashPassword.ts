import bcrypt from 'bcrypt';
import { config } from 'dotenv';

config();

const { CRYPT_SALT = '10' } = process.env;

export const hashPassword = async (
  password: string | undefined
): Promise<string | undefined> => {
  try {
    if (!password) return;

    const salt = await bcrypt.genSalt(+CRYPT_SALT);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }

  throw new Error();
};
