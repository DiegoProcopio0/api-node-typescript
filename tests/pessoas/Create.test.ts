import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - Create", () => {
  it("Deve criar um registro", async () => {
    const resCreate = await testServer.post("/cidades").send({
      nome: "São Paulo",
    });

    expect(resCreate.status).toBe(StatusCodes.CREATED);

    const res1 = await testServer.post("/pessoas").send({
      nomeCompleto: "Diego Procopio",
      email: "maildsss@mail.com",
      cidadeId: 1,
    });

    expect(res1.status).toBe(StatusCodes.CREATED);
    expect(res1.body).toBe(1);
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
