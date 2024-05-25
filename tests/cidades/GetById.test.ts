import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - GetById", () => {
  it("Deve retornar um registro", async () => {
    const create = await testServer.post("/cidades").send({
      nome: "São Paulo",
    });

    expect(create.status).toBe(StatusCodes.CREATED);

    const res1 = await testServer.get("/cidades/1");

    expect(res1.status).toBe(StatusCodes.OK);
    expect(res1.body).toEqual({
      id: 1,
      nome: "São Paulo",
    });
  });

  it("Deve retornar erro com registro não encontrado", async () => {
    const res1 = await testServer.get("/cidades/99").send();

    expect(res1.status).toBe(StatusCodes.BAD_REQUEST);
    expect(res1.body).toEqual({
      errors: { default: "Erro ao deletar registro!" },
    });
  });
});
