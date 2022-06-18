import { AbstractIngredient } from "./AbstractIngredient";
import { JavaSerializable, ObjectInputStream } from "java-object-serialization";
import { SerializeReadHelper } from "./SerializeReadHelper";

export class RawIngredient extends AbstractIngredient implements JavaSerializable {
  rawBytesString: string | null = null;

  public toArray(): (number | string)[] | null {
    if (this.rawBytesString === null) {
      return null;
    }

    return this.rawBytesString
      .trim()
      .replace(/[\t\n\r]/g, " ")
      .split(/ +/)
      .map(chunk => {
        if (chunk.charAt(0) === "*") {
          return chunk.substring(1);
        } else {
          return Number.parseInt(chunk);
        }
      });
  }

  readObject(stream: ObjectInputStream) {
    const reader = new SerializeReadHelper(stream);

    const version = reader.readStringObject();
    if (version !== "V1-20020713") {
      throw new Error("bad RawIngredient version");
    }

    this.rawBytesString = reader.readStringObject();

    if (this.rawBytesString !== null) {
      const characters = this.rawBytesString.split("");

      for (let i = 0; i < characters.length; ++i) {
        let c = characters[i].charCodeAt(0);
        if ((i % 2) === 0) {
          if (i > 6) {
            c -= 24;
          } else {
            c -= 23;
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
