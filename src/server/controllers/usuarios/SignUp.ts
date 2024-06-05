import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { IUsuario } from "../../database/models";
import { UsuariosProvider } from "../../database/providers/usuarios";

interface IBodyProps extends Omit<IUsuario, "id"> {}

export const signUpValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      nome: yup.string().required().min(4).max(150),
      email: yup.string().email().required().min(6).max(150),
      senha: yup.string().required().min(6).max(150),
    }),
  ),
}));

export const signUp = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response,
) => {
  const result = await UsuariosProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: result.message },
    });
  }

  res.status(StatusCodes.CREATED).json(Number(result));
};
