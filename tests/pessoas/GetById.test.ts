import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Pessoas - GetById", () => {
  let cidadeId: undefined | number = undefined;
  beforeAll(async () => {
    const resCreate = await testServer.post("/cidades").send({
      nome: "havai",
    });

    cidadeId = resCreate.body;
  });

  it("Deve retornar um registro", async () => {
    const create = await testServer.post("/pessoas").send({
      nomeCompleto: "Diego Procopio",
      email: "maildsss@mail.com",
      cidadeId,
    });

    expect(create.status).toBe(StatusCodes.CREATED);

    const res1 = await testServer.get(`/pessoas/${create.body}`);

    expect(res1.status).toBe(StatusCodes.OK);
    expect(res1.body).toEqual({
      id: 1,
      cidadeId: 1,
      nomeCompleto: "Diego Procopio",
      email: "maildsss@mail.com",
    });
  });

  it("Deve retornar erro com registro não encontrado", async () => {
    const res1 = await testServer.get("/pessoas/99").send();

    expect(res1.status).toBe(StatusCodes.BAD_REQUEST);
    expect(res1.body).toEqual({
      errors: { default: "Erro registro não encontrado!" },
    });
  });
});
