import { ICidade } from "../../models";
import { IPessoa } from "../../models/Pessoa";

declare module "knex/types/tables" {
  interface Tables {
    cidade: ICidade;
    pessoa: IPessoa;
    // usuario: IUsuario;
  }
}
