import type { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";

import * as yup from "yup";
import { validation } from "../../shared/middlewares";

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

export const deleteById = async (req: Request<IParamProps>, res: Response) => {
  const { id } = req.params;

  if(Number(id) === 99) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    errors: {
      default: "Registro não encontrado" 
    }
  })

  res
    .status(StatusCodes.NO_CONTENT)
    .send();
};
