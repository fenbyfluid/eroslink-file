import { AbstractIngredient } from "./AbstractIngredient";
import { JavaSerializable, ObjectInputStream } from "java-object-serialization";
import { SerializeReadHelper } from "./SerializeReadHelper";

export class TimeGotoIngredient extends AbstractIngredient implements JavaSerializable {
  timeSeconds: number = 0.0;
  andThen: string | null = null;

  readObject(stream: ObjectInputStream) {
    const reader = new SerializeReadHelper(stream);

    const version = reader.readStringObject();
    if (version !== "V1-20011108") {
      throw new Error("bad TimeGotoIngredient version");
    }

    this.timeSeconds = reader.readDouble();
    this.andThen = reader.readStringObject();

    if (!reader.isReadAndCheckCrcOk()) {
      throw new Error("TimeGotoIngredient data is corrupted");
    }
  }
}

ObjectInputStream.RegisterObjectClass(TimeGotoIngredient, "com.erostek.eroslink.TimeGotoIngredient", "688125513414001038");
