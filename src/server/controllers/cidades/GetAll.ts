import type { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";

import * as yup from "yup";
import { validation } from "../../shared/middlewares";

interface IQueryProps {
  page?: number;
  limit?: number;
  filter?: string;
}

export const getAllValidation = validation((getSchema) => ({
  body: getSchema<IQueryProps>(
    yup.object().shape({
      page: yup.number().moreThan(0),
      limit: yup.number().moreThan(0),
      filter: yup.string(),
    }),
  ),
}));

export const getAll = async (
  req: Request<{}, {}, {}, IQueryProps>,
  res: Response,
) => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("GET Não implementado");
};
