import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";
import { createUser, loginUser } from "../testUtils";

describe("Pessoas - GetById", () => {
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

  it("Deve retornar um registro", async () => {
    const create = await testServer
      .post("/pessoas")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        nomeCompleto: "Diego Procopio",
        email: "maildsss@mail.com",
        cidadeId,
      });

    expect(create.status).toBe(StatusCodes.CREATED);

    const res1 = await testServer
      .get(`/pessoas/${create.body}`)
      .set("Authorization", `Bearer ${accessToken}`);

    expect(res1.status).toBe(StatusCodes.OK);
    expect(res1.body).toEqual({
      id: 1,
      cidadeId: 1,
      nomeCompleto: "Diego Procopio",
      email: "maildsss@mail.com",
    });
  });

  it("Deve retornar erro com registro não encontrado", async () => {
    const res1 = await testServer
      .get("/pessoas/99")
      .set("Authorization", `Bearer ${accessToken}`)
      .send();

    expect(res1.status).toBe(StatusCodes.BAD_REQUEST);
    expect(res1.body).toEqual({
      errors: { default: "Erro registro não encontrado!" },
    });
  });
});
