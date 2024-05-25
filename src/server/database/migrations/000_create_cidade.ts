import { Knex } from "knex";
import { ETablesNames } from "../ETablesNames";

export async function up(kenx: Knex) {
  return kenx.schema
    .createTable(ETablesNames.cidade, (table) => {
      table.bigIncrements("id").primary();
      table.string("nome", 150).checkLength("<=", 150).index().notNullable();

      table.comment("Tabela usada para armazenar cidades no sistema.");
    })
    .then(() => {
      console.log(`Tabela criada com sucesso! ${ETablesNames.cidade}`);
    });
}

export async function down(kenx: Knex) {
  return kenx.schema.dropTable(ETablesNames.cidade).then(() => {
    console.log(`Tabela removida com sucesso! ${ETablesNames.cidade}`);
  });
}
