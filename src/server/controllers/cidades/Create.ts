import type { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";

import * as yup from "yup";
import { validation } from "../../shared/middlewares";

interface ICidade {
  nome: string;
}

export const createValidation = validation((getSchema) => ({
  body: getSchema<ICidade>(
    yup.object().shape({
      nome: yup.string().required().min(3).max(100),
    }),
  ),
}));

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
  res.status(StatusCodes.CREATED).send(1);
};
