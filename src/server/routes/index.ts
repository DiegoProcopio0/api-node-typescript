import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import { CidadeController, PessoaController } from "../controllers";

const router = Router();

router.get("/", (req, res) => {
  res.status(StatusCodes.OK).send("hello world");
});

router.post(
  "/cidades",
  CidadeController.createValidation,
  CidadeController.create,
);

router.get(
  "/cidades",
  CidadeController.getAllValidation,
  CidadeController.getAll,
);

router.get(
  "/cidades/:id",
  CidadeController.getByIdValidation,
  CidadeController.getById,
);

router.put(
  "/cidades/:id",
  CidadeController.getUpdateByIdValidation,
  CidadeController.UpdateById,
);

router.delete(
  "/cidades/:id",
  CidadeController.deleteByIdValidation,
  CidadeController.deleteById,
);

router.get(
  "/pessoas",
  PessoaController.getAllValidation,
  PessoaController.getAll,
);

router.get(
  "/pessoas/:id",
  PessoaController.getByIdValidation,
  PessoaController.getById,
);

router.post(
  "/pessoas",
  PessoaController.createValidation,
  PessoaController.create,
);

router.delete(
  "/pessoas/:id",
  PessoaController.deleteByIdValidation,
  PessoaController.deleteById,
);

router.put(
  "/pessoas/:id",
  PessoaController.getUpdateByIdValidation,
  PessoaController.UpdateById,
);

export { router };
