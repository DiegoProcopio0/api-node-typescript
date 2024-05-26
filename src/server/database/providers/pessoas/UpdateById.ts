import { ETablesNames } from "../../ETablesNames";
import { IPessoa } from "../../models";
import { Knex } from "../../knex";

export const updateById = async (
  id: number,
  pessoa: Omit<IPessoa, "id">,
): Promise<void | Error> => {
  try {
    const [{ count }] = await Knex(ETablesNames.cidade)
      .where("id", "=", pessoa.cidadeId)
      .count<[{ count: number }]>("* as count");

    if (count === 0) {
      return new Error("A cidade usada no cadastro não foi encontrada!");
    }

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
