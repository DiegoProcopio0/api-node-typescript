import { IPessoa } from "../../models";
import { Knex } from "../../knex";
import { ETablesNames } from "../../ETablesNames";

export const getAll = async (
  page: number,
  limit: number,
  filter: string,
): Promise<IPessoa[] | Error> => {
  try {
    const result = await Knex(ETablesNames.pessoa)
      .select("*")
      .orWhere("nomeCompleto", "like", `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    return result;
  } catch (error) {
    console.log("Erro ao deletar registro >>", error);
    return Error("Erro ao deletar registro!");
  }
};
