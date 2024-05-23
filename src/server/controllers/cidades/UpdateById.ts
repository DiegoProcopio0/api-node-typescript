import type { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";

import * as yup from "yup";
import { validation } from "../../shared/middlewares";

interface IParamProps {
  id?: number;
}

interface IBodyParams {
  nome: string;
}

export const getUpdateByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    }),
  ),
  body: getSchema<IBodyParams>(
    yup.object().shape({
      nome: yup.string().required(),
    }),
  ),
}));

export const UpdateById = async (
  req: Request<IParamProps, {}, IBodyParams>,
  res: Response,
) => {

  const { id } = req.params;

  if(Number(id) === 99) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    errors: {
      default: "Registro não encontrado" 
    }
  })

  res
    .status(StatusCodes.OK)
    .send();
};
