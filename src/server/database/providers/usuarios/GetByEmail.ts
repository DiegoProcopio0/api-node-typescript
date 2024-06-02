import { IUsuario } from "../../models";
import { Knex } from "../../knex";
import { ETablesNames } from "../../ETablesNames";

export const getByEmail = async (email: string): Promise<IUsuario | Error> => {
  try {
    const result = await Knex(ETablesNames.usuario)
      .select("*")
      .where("email", "=", email)
      .first();

    if (result) return result;

    return Error("Erro ao deletar registro!");
  } catch (error) {
    console.log("Erro ao deletar registro >>", error);
    return Error("Erro ao deletar registro!");
  }
};
