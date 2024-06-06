import { IUsuario } from "../src/server/database/models";

export const createUser: Omit<IUsuario, "id"> = {
  email: "testuser@example.com",
  nome: "Teste",
  senha: "password123",
};

export const loginUser: Omit<IUsuario, "nome" | "id"> = {
  email: "testuser@example.com",
  senha: "password123",
};
