import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

jest.useFakeTimers();

describe("Pessoas - UpdateById", () => {
  let cidadeId: undefined | number = undefined;
  beforeAll(async () => {
    const resCreate = await testServer.post("/cidades").send({
      nome: "havai",
    });

    cidadeId = resCreate.body;
  });
  it("Deve atualizar um registro", async () => {
    const create = await testServer.post("/pessoas").send({
      nomeCompleto: "Diego Procopio",
      email: "maildsss@mail.com",
      cidadeId,
    });

    const res1 = await testServer.put(`/pessoas/${create.body}`).send({
      nomeCompleto: "Diego Silva",
      email: "email@mail.com",
      cidadeId: 1,
    });

    expect(res1.status).toBe(StatusCodes.NO_CONTENT);
  });

  it("Deve retornar erro com registro não encontrado", async () => {
    const res1 = await testServer.get("/pessoas/99").send();

    expect(res1.status).toBe(StatusCodes.BAD_REQUEST);
    expect(res1.body).toEqual({
      errors: { default: "Erro registro não encontrado!" },
    });
  });
});
