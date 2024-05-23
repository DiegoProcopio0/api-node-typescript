import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - Create", () => {
  it("Deve criar um registro", async () => {
    const res1 = await testServer.post("/cidades").send({
      nome: "São Paulo",
    });

    expect(res1.status).toBe(StatusCodes.CREATED);
    expect(typeof res1.body).toBe("object");
  });

  it("Deve retornar erro com nome muito curto", async () => {
    const res1 = await testServer.post("/cidades").send({
      nome: "s",
    });

    console.log(res1.body);

    expect(res1.status).toBe(StatusCodes.BAD_REQUEST);
    expect(res1.body).toEqual({
      errorsResult: { body: { nome: "Deve ter pelo menos 3 caracteres" } },
    });
  });
});
