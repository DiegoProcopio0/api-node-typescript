import { IPessoa } from "../../models";
import { Knex } from "../../knex";
import { ETablesNames } from "../../ETablesNames";

export const getById = async (id: number): Promise<IPessoa | Error> => {
  try {
    const result = await Knex(ETablesNames.pessoa)
      .select("*")
      .where("id", "=", id)
      .first();

    if (result) return result;

    return Error("Erro ao deletar registro!");
  } catch (error) {
    console.log("Erro ao deletar registro >>", error);
    return Error("Erro ao deletar registro!");
  }
};
