import { ICidade } from "../../models";
import { Knex } from "../../knex";
import { ETablesNames } from "../../ETablesNames";

export const create = async (
  cidade: Omit<ICidade, "id">,
): Promise<number | Error> => {
  try {
    const [result] = await Knex(ETablesNames.cidade)
      .insert(cidade)
      .returning("id");

    if (typeof result === "object") return result.id;
    if (typeof result === "number") return result;

    return Error("Erro ao cadastrar registro!");
  } catch (error) {
    console.log("Erro ao cadastrar registro >>", error);
    return Error("Erro ao cadastrar registro!");
  }
};
