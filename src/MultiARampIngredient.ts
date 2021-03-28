import { RampIngredient } from "./RampIngredient";
import { JavaSerializable, ObjectInputStream } from "java-object-serialization";
import { SerializeReadHelper } from "./SerializeReadHelper";

export class MultiARampIngredient extends RampIngredient implements JavaSerializable {
  multiASetIntensity: boolean = false;
  multiASetFrequency: boolean = false;
  multiASetPulseWidth: boolean = false;
  multiAAffectsMin: boolean = false;
  otherBound: number = 0.0;

  readObject(stream: ObjectInputStream) {
    const reader = new SerializeReadHelper(stream);

    const version = reader.readStringObject();
    if (version !== "V1-20030305") {
      throw new Error("bad MultiARampIngredient version");
    }

    this.multiASetIntensity = reader.readBoolean();
    this.multiASetFrequency = reader.readBoolean();
    this.multiASetPulseWidth = reader.readBoolean();
    this.multiAAffectsMin = reader.readBoolean();
    this.otherBound = reader.readDouble();

    if (!reader.isReadAndCheckCrcOk()) {
      throw new Error("MultiARampIngredient data is corrupted");
    }
  }
}

ObjectInputStream.RegisterObjectClass(MultiARampIngredient, "com.erostek.eroslink.MultiARampIngredient", "9760390132124100081");
