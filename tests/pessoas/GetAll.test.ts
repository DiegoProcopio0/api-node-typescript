import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";
import { createUser, loginUser } from "../testUtils";

describe("Cidades - GetAll", () => {
  let cidadeId: undefined | number = undefined;
  let accessToken: string = "";
  beforeAll(async () => {
    await testServer.post("/cadastrar").send(createUser);

    const result = await testServer.post("/entrar").send(loginUser);

    accessToken = result.body.accessToken;

    const resCreate = await testServer
      .post("/cidades")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        nome: "havai",
      });

    cidadeId = resCreate.body;
  });

  it("Deve retornar registros", async () => {
    const res1 = await testServer
      .post("/pessoas")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        nomeCompleto: "Diego Procopio",
        email: "maildsss@mail.com",
        cidadeId,
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer
      .get("/pessoas")
      .set("Authorization", `Bearer ${accessToken}`);

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
