import { hash, compare } from "bcryptjs";

//Encript password:
export const encrypt = async (pass: string) => {
  return await hash(pass, 8);
};

//check password:
export const verifyEncrypt = async (pass: string, hashPash: string) => {
  return await compare(pass, hashPash);
};
