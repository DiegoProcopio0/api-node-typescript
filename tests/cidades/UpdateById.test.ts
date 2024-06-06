import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";
import { createUser, loginUser } from "../testUtils";

describe("Cidades - UpdateById", () => {
  let accessToken: string = "";

  beforeAll(async () => {
    await testServer.post("/cadastrar").send(createUser);

    const result = await testServer.post("/entrar").send(loginUser);

    accessToken = result.body.accessToken;
  });
  it("Deve atualizar um registro", async () => {
    const res1 = await testServer
      .put("/cidades/1")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        nome: "Rio Grande do sul",
      });

    expect(res1.status).toBe(StatusCodes.NO_CONTENT);
  });

  it("Deve retornar erro com registro não encontrado", async () => {
    const res1 = await testServer
      .get("/cidades/99")
      .set("Authorization", `Bearer ${accessToken}`)
      .send();

    expect(res1.status).toBe(StatusCodes.BAD_REQUEST);
    expect(res1.body).toEqual({
      errors: { default: "Erro ao deletar registro!" },
    });
  });
});
