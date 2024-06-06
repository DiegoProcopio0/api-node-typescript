import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";
import { createUser, loginUser } from "../testUtils";

describe("Pessoas - Create", () => {
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

  it("Deve criar um registro", async () => {
    const res1 = await testServer
      .post("/pessoas")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        nomeCompleto: "Diego Procopio",
        email: "maildsss@mail.com",
        cidadeId,
      });

    expect(res1.body).toBe(1);
    expect(res1.status).toBe(StatusCodes.CREATED);
  });

  it("Deve retornar erro com cidadeId não encontrado", async () => {
    const res1 = await testServer
      .post("/pessoas")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
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
