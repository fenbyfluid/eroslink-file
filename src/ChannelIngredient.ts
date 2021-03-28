import { AbstractIngredient } from "./AbstractIngredient";
import { JavaSerializable, ObjectInputStream } from "java-object-serialization";
import { SerializeReadHelper } from "./SerializeReadHelper";

class Channel implements JavaSerializable {
  value: number = 0;

  readObject(stream: ObjectInputStream) {
    const reader = new SerializeReadHelper(stream);

    const version = reader.readStringObject();
    if (version !== "V1-20020725") {
      throw new Error("bad Channel version");
    }

    this.value = reader.readShort();

    if (!reader.isReadAndCheckCrcOk()) {
      throw new Error("Channel data is corrupted");
    }
  }

  // Mirror-ish the Java version, which returns a singleton object for each value.
  readResolve(): "A" | "B" | "BOTH" {
    switch (this.value) {
      case 1:
        return "A";
      case 2:
        return "B";
      case 3:
        return "BOTH";
      default:
        throw new Error("invalid channel");
    }
  }
}

ObjectInputStream.RegisterObjectClass(Channel, "com.erostek.eroslink.ChannelIngredient$Channel", "10332034024603954032");

export class ChannelIngredient extends AbstractIngredient implements JavaSerializable {
  channel: "A" | "B" | "BOTH" | null = null;

  readObject(stream: ObjectInputStream) {
    const reader = new SerializeReadHelper(stream);

    const version = reader.readStringObject();
    if (version !== "V1-20020718") {
      throw new Error("bad ChannelIngredient version");
    }

    this.channel = reader.readObject();

    if (!reader.isReadAndCheckCrcOk()) {
      throw new Error("ChannelIngredient data is corrupted");
    }
  }
}

ObjectInputStream.RegisterObjectClass(ChannelIngredient, "com.erostek.eroslink.ChannelIngredient", "79906390503894974");
