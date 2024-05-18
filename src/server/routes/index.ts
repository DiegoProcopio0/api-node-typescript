import { Router } from "express";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.get("/", (req, res) => {
  type TParams = { teste?: string };

  const { teste } = req.query as TParams;

  res.status(StatusCodes.ACCEPTED).send("hello world " + teste);
});

router.post("/teste", (req, res) => {
  const body = req.body;

  res.status(201).send(body);
});

export { router };
