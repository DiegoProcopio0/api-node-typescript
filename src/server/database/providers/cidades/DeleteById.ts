import { ICidade } from "../../models";
import { Knex } from "../../knex";
import { ETablesNames } from "../../ETablesNames";

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const result = await Knex(ETablesNames.cidade).where("id", "=", id).del();

    if (result > 0) return;

    return Error("Erro ao deletar registro!");
  } catch (error) {
    console.log("Erro ao deletar registro >>", error);
    return Error("Erro ao deletar registro!");
  }
};
