import { AbstractIngredient } from "./AbstractIngredient";
import { ChannelIngredient } from "./ChannelIngredient";
import { ExtTriggerIngredient } from "./ExtTriggerIngredient";
import { GateFromIngredient } from "./GateFromIngredient";
import { GateIngredient } from "./GateIngredient";
import { MultiAGateIngredient } from "./MultiAGateIngredient";
import { MultiAIngredient } from "./MultiAIngredient";
import { MultiARampIngredient } from "./MultiARampIngredient";
import { RampIngredient } from "./RampIngredient";
import { RawIngredient } from "./RawIngredient";
import { SetValueIngredient } from "./SetValueIngredient";
import { TimeGotoIngredient } from "./TimeGotoIngredient";

export {
  AbstractIngredient,
  ChannelIngredient,
  ExtTriggerIngredient,
  GateFromIngredient,
  GateIngredient,
  MultiAGateIngredient,
  MultiAIngredient,
  MultiARampIngredient,
  RampIngredient,
  RawIngredient,
  SetValueIngredient,
  TimeGotoIngredient,
};

export type Ingredient = AbstractIngredient
  | ChannelIngredient
  | ExtTriggerIngredient
  | GateFromIngredient
  | GateIngredient
  | MultiAGateIngredient
  | MultiAIngredient
  | MultiARampIngredient
  | RampIngredient
  | RawIngredient
  | SetValueIngredient
  | TimeGotoIngredient;

export { Routine } from "./Routine";
export { Preset } from "./Preset";

export { DesignerFile } from "./DesignerFile";
