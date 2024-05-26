import { IPessoa } from "../../models";
import { Knex } from "../../knex";
import { ETablesNames } from "../../ETablesNames";

export const updateById = async (
  id: number,
  pessoa: Omit<IPessoa, "id">,
): Promise<void | Error> => {
  try {
    const result = await Knex(ETablesNames.pessoa)
      .update(pessoa)
      .where("id", "=", id);

    if (result > 0) return;

    return Error("Erro ao deletar registro!");
  } catch (error) {
    console.log("Erro ao deletar registro >>", error);
    return Error("Erro ao deletar registro!");
  }
};
