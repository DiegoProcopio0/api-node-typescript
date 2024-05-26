import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { IPessoa } from "../../database/models";
import { PessoaProvider } from "../../database/providers/pessoas";

interface IParamProps {
  id?: number;
}

interface IBodyParams extends Omit<IPessoa, "id"> {}

export const getUpdateByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    }),
  ),
  body: getSchema<IBodyParams>(
    yup.object().shape({
      nomeCompleto: yup.string().required().min(3).max(150),
      email: yup.string().required().email(),
      cidadeId: yup.number().integer().required().moreThan(0),
    }),
  ),
}));

export const UpdateById = async (
  req: Request<IParamProps, {}, IBodyParams>,
  res: Response,
) => {
  const id = req.params.id;
  const body = req.body;

  if (!id) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: "O parâmetro 'id' precisa ser informado." },
    });
  }

  const result = PessoaProvider.updateById(id, body);

  if (result instanceof Error)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: { result: result.message },
      },
    });

  res.status(StatusCodes.NO_CONTENT).json(result);
};
