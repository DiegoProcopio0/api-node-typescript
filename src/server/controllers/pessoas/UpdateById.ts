import type { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";

import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { ICidade } from "../../database/models";
import { CidadeProvider } from "../../database/providers/cidades";

interface IParamProps {
  id?: number;
}

interface IBodyParams extends Omit<ICidade, "id"> {}

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
  const id = req.params.id;
  const nome = req.body;

  if (!id) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: "O parâmetro 'id' precisa ser informado." },
    });
  }

  const result = CidadeProvider.updateById(id, nome);

  if (result instanceof Error)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: { result: result.message },
      },
    });

  res.status(StatusCodes.NO_CONTENT).json(result);
};
