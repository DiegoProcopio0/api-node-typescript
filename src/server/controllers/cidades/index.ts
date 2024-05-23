import * as create from "./Create";
import * as deleteById from "./DeleteById";
import * as getAll from "./GetAll";
import * as getById from "./GetById";
import * as UpdateById from "./UpdateById";

export const CidadeController = {
  ...create,
  ...getAll,
  ...getById,
  ...UpdateById,
  ...deleteById,
};
