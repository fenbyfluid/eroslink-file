import { JavaSerializable, ObjectInputStream } from "java-object-serialization";
import { SerializeReadHelper } from "./SerializeReadHelper";

export class AbstractIngredient implements JavaSerializable {
  instanceName: string | null = null;
  alsoDoIngredientName: string | null = null;
  useDefaultBackgroundColor: boolean = true;
  backgroundColor: number = 0;

  readObject(stream: ObjectInputStream) {
    const reader = new SerializeReadHelper(stream);

    const version = reader.readStringObject();
    if (version !== "V1-20011109" && version !== "V2-20030330") {
      throw new Error("bad AbstractIngredient version");
    }

    this.instanceName = reader.readStringObject();
    this.alsoDoIngredientName = reader.readStringObject();

    if (version === "V1-20011109") {
      this.useDefaultBackgroundColor = true;
      this.backgroundColor = 0;
    } else {
      this.useDefaultBackgroundColor = reader.readBoolean();
      this.backgroundColor = reader.readInt();
    }

    if (!reader.isReadAndCheckCrcOk()) {
      throw new Error("AbstractIngredient data is corrupted");
    }
  }
}

ObjectInputStream.RegisterObjectClass(AbstractIngredient, "com.erostek.eroslink.AbstractIngredient", "9884959880645212484");
