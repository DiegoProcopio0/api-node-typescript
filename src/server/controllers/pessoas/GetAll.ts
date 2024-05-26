import type { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";

import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { CidadeProvider } from "../../database/providers/cidades";

interface IQueryProps {
  id?: number;
  page?: number;
  limit?: number;
  filter?: string;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(
    yup.object().shape({
      page: yup.number().moreThan(0).optional(),
      limit: yup.number().moreThan(0).optional(),
      id: yup.number().integer().optional().default(0),
      filter: yup.string().optional(),
    }),
  ),
}));

export const getAll = async (
  req: Request<{}, {}, {}, IQueryProps>,
  res: Response,
) => {
  const { page, limit, filter, id } = req.query!;

  const result = await CidadeProvider.getAll(
    page || 1,
    limit || 7,
    filter || "",
    Number(id),
  );

  console.log("result", result);

  const count = await CidadeProvider.count(filter);

  if (count instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: count.message },
    });
  } else if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: result.message },
    });
  }

  res.setHeader("access-control-expose-headers", "x-total-count");
  res.setHeader("x-total-count", count);

  res.status(StatusCodes.OK).json(result);
};
