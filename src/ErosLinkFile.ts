import { ObjectInputStream } from "java-object-serialization";
import { SerializeReadHelper } from "./SerializeReadHelper";
import { Routine } from "./Routine";
import { Preset } from "./Preset";

// com.erostek.eroslink.ErosLinkHelper.loadSerial
// TODO: This doesn't seem to be correct yet, but it isn't really important.
function loadSerial(reader: SerializeReadHelper): string | null {
  const str1 = reader.readStringObject();
  const str2 = reader.readStringObject();
  const str3 = reader.readStringObject();
  if (str3 === null) {
    return null;
  }

  const characters = str3.split("");
  for (let i = 0; i < characters.length; ++i) {
    let c = characters[i].charCodeAt(0);
    if ((i % 2) === 0) {
      if (i > 3) {
        c -= 24; // TODO
      } else {
        c -= 23; // TODO
      }
    } else if (i > 4) {
      c -= 32;
    } else {
      c -= 34;
    }

    characters[i] = String.fromCharCode(c);
  }

  return characters.reverse().join("");
}

// com.erostek.eroslink.Context
export class ErosLinkFile {
  serial: string | null;
  boxInfo: { internalRev: number, majorVersion: number, minorVersion: number, model: number } | null;
  date: string | null;
  triggers: any[];
  parameters: any[];
  routines: Routine[];
  presets: Preset[];

  constructor(file: Uint8Array) {
    const stream = new ObjectInputStream(file);
    const reader = new SerializeReadHelper(stream);

    const version = reader.readStringObject();
    if (version !== "Context V1-20020725" && version !== "Context V2-20030519") {
      throw new Error("bad Context version");
    }

    this.serial = loadSerial(reader);

    // An empty string.
    reader.readStringObject();

    this.boxInfo = null;
    if (version !== "Context V1-20020725") {
      const wasConnected = reader.readBoolean();
      if (wasConnected) {
        this.boxInfo = {
          internalRev: reader.readByte(),
          majorVersion: reader.readByte(),
          minorVersion: reader.readByte(),
          model: reader.readByte(),
        };
      }
    }

    this.date = reader.readStringObject();

    this.triggers = this.readListModel(reader);
    this.parameters = this.readListModel(reader);
    this.routines = this.readListModel(reader);
    this.presets = this.readListModel(reader);

    if (!reader.isReadAndCheckCrcOk()) {
      throw new Error("Context data is corrupted");
    }
  }

  // com.erostek.eroslink.Context._$95299
  // Not sure on the real name for this.
  private readListModel(reader: SerializeReadHelper): any[] {
    const values = [];
    const length = reader.readInt();
    for (let i = 0; i < length; ++i) {
      values.push(reader.readObject());
    }

    return values;
  }
}
