import { AbstractIngredient } from "./AbstractIngredient";
import { JavaSerializable, ObjectInputStream } from "java-object-serialization";
import { SerializeReadHelper } from "./SerializeReadHelper";

export class MultiAIngredient extends AbstractIngredient implements JavaSerializable {
  startPercent: number = 0.0;
  endPercent: number = 0.0;
  setIntensity: boolean = false;
  setFrequency: boolean = false;
  setPulseWidth: boolean = false;
  fullRange: boolean = false;

  readObject(stream: ObjectInputStream) {
    const reader = new SerializeReadHelper(stream);

    const version = reader.readStringObject();
    if (version !== "V1-20011231" && version !== "V2-20030226") {
      throw new Error("bad MultiAIngredient version");
    }

    this.startPercent = reader.readDouble();
    this.endPercent = reader.readDouble();
    this.setIntensity = reader.readBoolean();
    this.setFrequency = reader.readBoolean();
    this.setPulseWidth = reader.readBoolean();

    if (version === "V1-20011231") {
      this.fullRange = true;
    } else {
      this.fullRange = reader.readBoolean();
    }

    if (!reader.isReadAndCheckCrcOk()) {
      throw new Error("MultiAIngredient data is corrupted");
    }
  }
}

ObjectInputStream.RegisterObjectClass(MultiAIngredient, "com.erostek.eroslink.MultiAIngredient", "2219200672153964470");
