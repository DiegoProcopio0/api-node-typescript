import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { validation } from "../../shared/middlewares";
import { IUsuario } from "../../database/models";
import { UsuariosProvider } from "../../database/providers/usuarios";
import { JWTService, PasswordCrypto } from "../../shared/services";

interface IBodyProps extends Omit<IUsuario, "id" | "nome"> {}

export const signInValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      email: yup.string().email().required().min(6).max(150),
      senha: yup.string().required().min(6).max(150),
    }),
  ),
}));

export const SignIn = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response,
) => {
  const { email, senha } = req.body;

  const result = await UsuariosProvider.getByEmail(email);

  if (result instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: { default: "Email ou senha são inválidos" },
    });
  }

  const veriFyPassword = await PasswordCrypto.veriFyPassword(
    senha,
    result.senha,
  );

  if (!veriFyPassword) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: { default: "Email ou senha são inválidos" },
    });
  }

  const accessToken = JWTService.sign({ uid: result.id });

  if (accessToken === "JWT_SECRET_NOT_FOUND") {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: "Erro ao gerar o token de acesso" },
    });
  }

  return res.status(StatusCodes.OK).json({ accessToken });
};
