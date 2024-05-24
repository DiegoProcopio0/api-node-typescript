import type { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";

import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { ICidade } from "../../database/models";

interface IBodyProps extends Omit<ICidade, "id"> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      nome: yup.string().required().min(3).max(100),
    }),
  ),
}));

export const create = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response,
) => {
  res.status(StatusCodes.CREATED).send({ nome: req.body.nome });
};
