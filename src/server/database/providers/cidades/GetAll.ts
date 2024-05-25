import { ICidade } from "../../models";
import { Knex } from "../../knex";
import { ETablesNames } from "../../ETablesNames";

export const getAll = async (
  page: number,
  limit: number,
  filter: string,
  id = 0,
): Promise<ICidade[] | Error> => {
  try {
    const result = await Knex(ETablesNames.cidade)
      .select("*")
      .where("id", Number(id))
      .orWhere("nome", "like", `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    if (id > 0 && result.every((item) => item.id !== id)) {
      const resultsById = await Knex(ETablesNames.cidade)
        .select("*")
        .where("id", "=", id)
        .first();

      if (resultsById) return [...result, resultsById];
    }

    return result;
  } catch (error) {
    console.log("Erro ao deletar registro >>", error);
    return Error("Erro ao deletar registro!");
  }
};
