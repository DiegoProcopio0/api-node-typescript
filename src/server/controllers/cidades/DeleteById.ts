import type { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";

import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { CidadeProvider } from "../../database/providers/cidades";

interface IParamProps {
  id?: number;
}

export const deleteByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    }),
  ),
}));

export const deleteById = async (req: Request, res: Response) => {
  const id = +req.params.id;

  if (!id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: { default: "O parâmetro 'id' precisa ser informado." },
    });
  }

  const result = await CidadeProvider.deleteById(id);

  if (result instanceof Error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: { default: result.message },
    });
  }

  res.status(StatusCodes.NO_CONTENT).send();
};
