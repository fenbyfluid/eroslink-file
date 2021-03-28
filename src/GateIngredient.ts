import { AbstractIngredient } from "./AbstractIngredient";
import { JavaSerializable, ObjectInputStream } from "java-object-serialization";
import { SerializeReadHelper } from "./SerializeReadHelper";

export class GateIngredient extends AbstractIngredient implements JavaSerializable {
  onTimeSeconds: number = 0.0;
  offTimeSeconds: number = 0.0;

  readObject(stream: ObjectInputStream) {
    const reader = new SerializeReadHelper(stream);

    const version = reader.readStringObject();
    if (version !== "V1-20020723") {
      throw new Error("bad GateIngredient version");
    }

    this.onTimeSeconds = reader.readDouble();
    this.offTimeSeconds = reader.readDouble();

    if (!reader.isReadAndCheckCrcOk()) {
      throw new Error("GateIngredient data is corrupted");
    }
  }
}

ObjectInputStream.RegisterObjectClass(GateIngredient, "com.erostek.eroslink.GateIngredient", "2870378091326621964");
