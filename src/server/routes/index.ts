import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import { CidadeController } from "../controllers";

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

export { router };
