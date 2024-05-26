import type { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";

import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { IPessoa } from "../../database/models";
import { PessoaProvider } from "../../database/providers/pessoas";

interface IBodyProps extends Omit<IPessoa, "id"> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      nomeCompleto: yup.string().required().min(3).max(150),
      email: yup.string().required().email(),
      cidadeId: yup.number().integer().required().min(1).moreThan(0),
    }),
  ),
}));

export const create = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response,
) => {
  const result = await PessoaProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: result.message },
    });
  }

  res.status(StatusCodes.CREATED).json(Number(result));
};
