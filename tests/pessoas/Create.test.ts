import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Pessoas - Create", () => {
  let cidadeId: undefined | number = undefined;
  beforeAll(async () => {
    const resCreate = await testServer.post("/cidades").send({
      nome: "havai",
    });

    cidadeId = resCreate.body;
  });

  it("Deve criar um registro", async () => {
    const res1 = await testServer.post("/pessoas").send({
      nomeCompleto: "Diego Procopio",
      email: "maildsss@mail.com",
      cidadeId,
    });

    expect(res1.body).toBe(1);
    expect(res1.status).toBe(StatusCodes.CREATED);
  });

  it("Deve retornar erro com cidadeId não encontrado", async () => {
    const res1 = await testServer.post("/pessoas").send({
      nomeCompleto: "Diego Procopio",
      email: "maildsss@mail.com",
      cidadeId: 99,
    });

    expect(res1.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toEqual({
      errors: { default: "A cidade usada no cadastro não foi encontrada!" },
    });
  });
});
