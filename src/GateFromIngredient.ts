import { AbstractIngredient } from "./AbstractIngredient";
import { JavaSerializable, ObjectInputStream } from "java-object-serialization";
import { SerializeReadHelper } from "./SerializeReadHelper";

class From implements JavaSerializable {
  value: number = 0;

  readObject(stream: ObjectInputStream) {
    const reader = new SerializeReadHelper(stream);

    const version = reader.readStringObject();
    if (version !== "V1-20020725") {
      throw new Error("bad From version");
    }

    this.value = reader.readShort();

    if (!reader.isReadAndCheckCrcOk()) {
      throw new Error("From data is corrupted");
    }
  }

  // Mirror-ish the Java version, which returns a singleton object for each value.
  readResolve(): "SET_VALUE" | "MULTI_A" | "ADV_P" {
    switch (this.value) {
      case 1:
        return "SET_VALUE";
      case 2:
        return "MULTI_A";
      case 3:
        return "ADV_P";
      default:
        throw new Error("invalid From");
    }
  }
}

ObjectInputStream.RegisterObjectClass(From, "com.erostek.eroslink.GateFromIngredient$From", "13441635889020800604");

export class GateFromIngredient extends AbstractIngredient implements JavaSerializable {
  onFrom: "SET_VALUE" | "MULTI_A" | "ADV_P" = "SET_VALUE";
  offFrom: "SET_VALUE" | "MULTI_A" | "ADV_P" = "SET_VALUE";

  readObject(stream: ObjectInputStream) {
    const reader = new SerializeReadHelper(stream);

    const version = reader.readStringObject();
    if (version !== "V1-20020718") {
      throw new Error("bad GateFromIngredient version");
    }

    this.onFrom = reader.readObject();
    this.offFrom = reader.readObject();

    if (!reader.isReadAndCheckCrcOk()) {
      throw new Error("GateFromIngredient data is corrupted");
    }
  }
}

ObjectInputStream.RegisterObjectClass(GateFromIngredient, "com.erostek.eroslink.GateFromIngredient", "1617202387615904078");
