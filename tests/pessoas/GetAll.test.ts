import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - GetAll", () => {
  let cidadeId: undefined | number = undefined;
  beforeAll(async () => {
    const resCreate = await testServer.post("/cidades").send({
      nome: "havai",
    });

    cidadeId = resCreate.body;
  });

  it("Deve retornar registros", async () => {
    const res1 = await testServer.post("/pessoas").send({
      nomeCompleto: "Diego Procopio",
      email: "maildsss@mail.com",
      cidadeId,
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer.get("/pessoas");

    const resCount = resBuscada.header["x-total-count"];

    expect(resBuscada.status).toBe(StatusCodes.OK);
    expect(resBuscada.body).toEqual([
      {
        nomeCompleto: "Diego Procopio",
        email: "maildsss@mail.com",
        cidadeId: 1,
        id: 1,
      },
    ]);
    expect(+resCount).toBeGreaterThan(0);
    expect(resBuscada.body.length).toBeGreaterThan(0);
  });
});
