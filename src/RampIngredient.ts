import { AbstractIngredient } from "./AbstractIngredient";
import { JavaSerializable, ObjectInputStream } from "java-object-serialization";
import { SerializeReadHelper } from "./SerializeReadHelper";

export class RampIngredient extends AbstractIngredient implements JavaSerializable {
  startPercent: number = 0.0;
  endPercent: number = 0.0;
  timeSeconds: number = 0.0;
  andThen: string | null = null;
  setIntensity: boolean = false;
  setFrequency: boolean = false;
  setPulseWidth: boolean = false;
  fullRange: boolean = false;

  readObject(stream: ObjectInputStream) {
    const reader = new SerializeReadHelper(stream);

    const version = reader.readStringObject();
    if (version !== "V1-20011107" && version !== "V2-20030226") {
      throw new Error("bad RampIngredient version");
    }

    this.startPercent = reader.readDouble();
    this.endPercent = reader.readDouble();
    this.timeSeconds = reader.readDouble();
    this.andThen = reader.readStringObject();
    this.setIntensity = reader.readBoolean();
    this.setFrequency = reader.readBoolean();
    this.setPulseWidth = reader.readBoolean();

    if (version === "V1-20011107") {
      this.fullRange = true;
    } else {
      this.fullRange = reader.readBoolean();
    }

    if (!reader.isReadAndCheckCrcOk()) {
      throw new Error("RampIngredient data is corrupted");
    }
  }
}

ObjectInputStream.RegisterObjectClass(RampIngredient, "com.erostek.eroslink.RampIngredient", "12729286752313604554");
