import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";
import { createUser, loginUser } from "../testUtils";

describe("Cidades - GetAll", () => {
  let accessToken: string = "";

  beforeAll(async () => {
    await testServer.post("/cadastrar").send(createUser);

    const result = await testServer.post("/entrar").send(loginUser);

    accessToken = result.body.accessToken;
  });
  it("Deve retornar registros", async () => {
    const res1 = await testServer
      .post("/cidades")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ nome: "Caxias do sul" });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer
      .get("/cidades")
      .set("Authorization", `Bearer ${accessToken}`);

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
