import { JavaSerializable, ObjectInputStream } from "java-object-serialization";
import { SerializeReadHelper } from "./SerializeReadHelper";

export class Preset implements JavaSerializable {
  name: string | null = null;
  routines: string[] = [];

  readObject(stream: ObjectInputStream) {
    const reader = new SerializeReadHelper(stream);

    const version = reader.readStringObject();
    if (version !== "V1-20011018") {
      throw new Error("bad Preset version");
    }

    this.name = reader.readStringObject();

    this.routines = [];
    const length = reader.readInt();
    for (let i = 0; i < length; ++i) {
      this.routines.push(reader.readStringObject()!);
    }

    if (!reader.isReadAndCheckCrcOk()) {
      throw new Error("Preset data is corrupted");
    }
  }
}

ObjectInputStream.RegisterObjectClass(Preset, "com.erostek.eroslink.Preset", "9066715381541207945");
