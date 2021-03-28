import { AbstractIngredient } from "./AbstractIngredient";
import { JavaSerializable, ObjectInputStream } from "java-object-serialization";
import { SerializeReadHelper } from "./SerializeReadHelper";

export class RawIngredient extends AbstractIngredient implements JavaSerializable {
  rawBytesString: string | null = null;

  readObject(stream: ObjectInputStream) {
    const reader = new SerializeReadHelper(stream);

    const version = reader.readStringObject();
    if (version !== "V1-20020713") {
      throw new Error("bad RawIngredient version");
    }

    this.rawBytesString = reader.readStringObject();

    if (this.rawBytesString) {
      const characters = this.rawBytesString.split("");

      // TODO: This doesn't seem to be correct yet either.
      for (let i = 0; i < characters.length; ++i) {
        let c = characters[i].charCodeAt(0);
        if ((i % 2) === 0) {
          if (i > 6) {
            c -= 24; // TODO
          } else {
            c -= 23; // TODO
          }
        } else if (i > 8) {
          c -= 32;
        } else {
          c -= 34;
        }

        characters[i] = String.fromCharCode(c);
      }

      this.rawBytesString = characters.reverse().join("");
    }

    if (!reader.isReadAndCheckCrcOk()) {
      throw new Error("RawIngredient data is corrupted");
    }
  }
}

ObjectInputStream.RegisterObjectClass(RawIngredient, "com.erostek.eroslink.RawIngredient", "8487267098554881198");
