import { IPessoa } from "../../models";
import { Knex } from "../../knex";
import { ETablesNames } from "../../ETablesNames";

export const create = async (
  pessoa: Omit<IPessoa, "id">,
): Promise<number | Error> => {
  try {
    const [result] = await Knex(ETablesNames.pessoa)
      .insert(pessoa)
      .returning("id");

    if (typeof result === "object") return result.id;
    if (typeof result === "number") return result;

    return Error("Erro ao cadastrar registro!");
  } catch (error) {
    console.log("Erro ao cadastrar registro >>", error);
    return Error("Erro ao cadastrar registro!");
  }
};
