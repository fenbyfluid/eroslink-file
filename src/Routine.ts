import { JavaSerializable, ObjectInputStream } from "java-object-serialization";
import { AbstractIngredient } from "./AbstractIngredient";
import { SerializeReadHelper } from "./SerializeReadHelper";

export class Routine implements JavaSerializable {
  name: string | null = null;
  description: string | null = null;
  ingredients: AbstractIngredient[] = [];

  readObject(stream: ObjectInputStream) {
    const reader = new SerializeReadHelper(stream);

    const version = reader.readStringObject();
    if (version !== "V1-20011017") {
      throw new Error("bad Routine version");
    }

    this.name = reader.readStringObject();
    this.description = reader.readStringObject();

    this.ingredients = [];
    const length = reader.readInt();
    for (let i = 0; i < length; ++i) {
      this.ingredients.push(reader.readObject());
    }

    if (!reader.isReadAndCheckCrcOk()) {
      throw new Error("Routine data is corrupted");
    }
  }
}

ObjectInputStream.RegisterObjectClass(Routine, "com.erostek.eroslink.Routine", "3448188839253229806");
