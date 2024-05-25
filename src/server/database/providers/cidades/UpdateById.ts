import { ICidade } from "../../models";
import { Knex } from "../../knex";
import { ETablesNames } from "../../ETablesNames";

export const updateById = async (
  id: number,
  cidade: Omit<ICidade, "id">,
): Promise<void | Error> => {
  try {
    const result = await Knex(ETablesNames.cidade)
      .update(cidade)
      .where("id", "=", id);

    if (result > 0) return;

    return Error("Erro ao deletar registro!");
  } catch (error) {
    console.log("Erro ao deletar registro >>", error);
    return Error("Erro ao deletar registro!");
  }
};
