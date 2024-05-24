import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - DeleteById", () => {
  it("Deve deletar um registro", async () => {
    const res1 = await testServer.delete("/cidades/1");

    expect(res1.status).toBe(StatusCodes.NO_CONTENT);
  });

  it("Deve retornar erro com registro não encontrado", async () => {
    const res1 = await testServer.get("/cidades/99").send();

    expect(res1.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toEqual({
       errors: { default: "Registro não encontrado" },
    });
  });
});
