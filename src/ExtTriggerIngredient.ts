import { AbstractIngredient } from "./AbstractIngredient";
import { JavaSerializable, ObjectInputStream } from "java-object-serialization";
import { SerializeReadHelper } from "./SerializeReadHelper";

export class ExtTriggerIngredient extends AbstractIngredient implements JavaSerializable {
  andThen: string | null = null;

  readObject(stream: ObjectInputStream) {
    const reader = new SerializeReadHelper(stream);

    const version = reader.readStringObject();
    if (version !== "V1-20011211") {
      throw new Error("bad ExtTriggerIngredient version");
    }

    this.andThen = reader.readStringObject();

    if (!reader.isReadAndCheckCrcOk()) {
      throw new Error("ExtTriggerIngredient data is corrupted");
    }
  }
}

ObjectInputStream.RegisterObjectClass(ExtTriggerIngredient, "com.erostek.eroslink.ExtTriggerIngredient", "13880809489726259087");
