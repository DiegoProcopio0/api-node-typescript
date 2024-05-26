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

    return Error("Erro registro não encontrado!");
  } catch (error) {
    console.log("Erro ao buscar registro >>", error);
    return Error("Erro ao buscar registro!");
  }
};
