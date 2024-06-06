import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";
import { createUser, loginUser } from "../testUtils";

describe("Cidades - Create", () => {
  let accessToken: string = "";

  beforeAll(async () => {
    await testServer.post("/cadastrar").send(createUser);

    const result = await testServer.post("/entrar").send(loginUser);

    accessToken = result.body.accessToken;
  });

  it("Deve criar um registro", async () => {
    const res1 = await testServer
      .post("/cidades")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        nome: "São Paulo",
      });

    expect(res1.status).toBe(StatusCodes.CREATED);
    expect(typeof res1.body).toBe("number");
  });

  it("Deve retornar erro com nome muito curto", async () => {
    const res1 = await testServer
      .post("/cidades")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        nome: "s",
      });

    expect(res1.status).toBe(StatusCodes.BAD_REQUEST);
    expect(res1.body).toEqual({
      errorsResult: { body: { nome: "Deve ter pelo menos 3 caracteres" } },
    });
  });
});
