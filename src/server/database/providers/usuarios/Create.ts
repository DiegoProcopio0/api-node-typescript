import { IUsuario } from "../../models";
import { Knex } from "../../knex";
import { ETablesNames } from "../../ETablesNames";

export const create = async (
  usuario: Omit<IUsuario, "id">,
): Promise<number | Error> => {
  try {
    const [result] = await Knex(ETablesNames.usuario)
      .insert(usuario)
      .returning("id");

    if (typeof result === "object") return result.id;
    if (typeof result === "number") return result;

    return Error("Erro ao cadastrar registro!");
  } catch (error) {
    console.log("Erro ao cadastrar registro >>", error);
    return Error("Erro ao cadastrar registro!");
  }
};
