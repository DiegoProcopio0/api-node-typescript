import { compare, genSalt, hash } from "bcryptjs";

const SALT_RANDOM = 8;

const hashPassword = async (password: string): Promise<string> => {
  const saltGenerate = await genSalt(SALT_RANDOM);

  const hashPass = await hash(password, saltGenerate);

  return hashPass;
};

const veriFyPassword = async (
  password: string,
  hashPassword: string,
): Promise<boolean> => {
  return await compare(password, hashPassword);
};

export const PasswordCrypto = {
  hashPassword,
  veriFyPassword,
};
