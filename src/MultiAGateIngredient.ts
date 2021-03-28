import { AbstractIngredient } from "./AbstractIngredient";
import { JavaSerializable, ObjectInputStream } from "java-object-serialization";
import { SerializeReadHelper } from "./SerializeReadHelper";

export class MultiAGateIngredient extends AbstractIngredient implements JavaSerializable {
  minTimeSeconds: number = 0.0;
  maxTimeSeconds: number = 0.0;
  setOnTime: boolean = false;
  setOffTime: boolean = false;

  readObject(stream: ObjectInputStream) {
    const reader = new SerializeReadHelper(stream);

    const version = reader.readStringObject();
    if (version !== "V1-20020723") {
      throw new Error("bad MultiAGateIngredient version");
    }

    this.minTimeSeconds = reader.readDouble();
    this.maxTimeSeconds = reader.readDouble();
    this.setOnTime = reader.readBoolean();
    this.setOffTime = reader.readBoolean();

    if (!reader.isReadAndCheckCrcOk()) {
      throw new Error("MultiAGateIngredient data is corrupted");
    }
  }
}

ObjectInputStream.RegisterObjectClass(MultiAGateIngredient, "com.erostek.eroslink.MultiAGateIngredient", "14746168127036709790");
