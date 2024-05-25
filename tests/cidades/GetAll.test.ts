import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - GetAll", () => {
  it("Deve retornar registros", async () => {
    const res1 = await testServer
      .post("/cidades")
      .send({ nome: "Caxias do sul" });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer.get("/cidades");

    const resCount = resBuscada.header["x-total-count"];

    expect(resBuscada.status).toBe(StatusCodes.OK);
    expect(resBuscada.body).toEqual([
      {
        id: 1,
        nome: "Caxias do sul",
      },
    ]);
    expect(+resCount).toBeGreaterThan(0);
    expect(resBuscada.body.length).toBeGreaterThan(0);
  });
});
