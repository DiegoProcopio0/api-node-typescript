import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import {
  CidadeController,
  PessoaController,
  UsuarioController,
} from "../controllers";
import { ensureAuthenticate } from "../shared/middlewares";

const router = Router();

router.get("/", (req, res) => {
  res.status(StatusCodes.OK).send("hello world");
});

router.post(
  "/cidades",
  ensureAuthenticate,
  CidadeController.createValidation,
  CidadeController.create,
);

router.get(
  "/cidades",
  ensureAuthenticate,
  CidadeController.getAllValidation,
  CidadeController.getAll,
);

router.get(
  "/cidades/:id",
  ensureAuthenticate,
  CidadeController.getByIdValidation,
  CidadeController.getById,
);

router.put(
  "/cidades/:id",
  ensureAuthenticate,
  CidadeController.getUpdateByIdValidation,
  CidadeController.UpdateById,
);

router.delete(
  "/cidades/:id",
  ensureAuthenticate,
  CidadeController.deleteByIdValidation,
  CidadeController.deleteById,
);

router.get(
  "/pessoas",
  ensureAuthenticate,
  PessoaController.getAllValidation,
  PessoaController.getAll,
);

router.get(
  "/pessoas/:id",
  ensureAuthenticate,
  PessoaController.getByIdValidation,
  PessoaController.getById,
);

router.post(
  "/pessoas",
  ensureAuthenticate,
  PessoaController.createValidation,
  PessoaController.create,
);

router.delete(
  "/pessoas/:id",
  ensureAuthenticate,
  PessoaController.deleteByIdValidation,
  PessoaController.deleteById,
);

router.put(
  "/pessoas/:id",
  ensureAuthenticate,
  PessoaController.getUpdateByIdValidation,
  PessoaController.UpdateById,
);

router.post(
  "/entrar",
  UsuarioController.signInValidation,
  UsuarioController.SignIn,
);

router.post(
  "/cadastrar",
  UsuarioController.signUpValidation,
  UsuarioController.signUp,
);

export { router };
