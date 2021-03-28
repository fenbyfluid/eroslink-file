import { ObjectInputStream } from "java-object-serialization";

// com.erostek.eroslink.SerializeReadHelper
// ObjectInputStream wrapper that computes a CRC32 of all data read.
export class SerializeReadHelper {
  private readonly stream: ObjectInputStream;

  constructor(stream: ObjectInputStream) {
    this.stream = stream;
  }

  readStringObject(): string | null {
    const obj = this.stream.readObject();
    if (obj === null) {
      return null;
    }

    if (typeof obj !== "string") {
      throw new Error("expected string");
    }

    return obj;
  }

  readObject() {
    return this.stream.readObject();
  }

  readBoolean(): boolean {
    return this.stream.readBoolean();
  }

  readByte(): number {
    return this.stream.readByte();
  }

  readDouble(): number {
    return this.stream.readDouble();
  }

  readFloat(): number {
    return this.stream.readFloat();
  }

  readInt(): number {
    return this.stream.readInt();
  }

  readLong() {
    return this.stream.readLong();
  }

  readShort() {
    return this.stream.readShort();
  }

  isReadAndCheckCrcOk(): boolean {
    const crc32 = this.stream.readLong();

    return true; // TODO
  }
}
