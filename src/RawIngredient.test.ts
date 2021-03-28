import { RawIngredient } from "./RawIngredient";
import { ObjectInputStream } from "java-object-serialization";
import { SerializeReadHelper } from "./SerializeReadHelper";

test("deserialize raw ingredient", () => {
  const data = "rO0ABXNyACJjb20uZXJvc3Rlay5lcm9zbGluay5SYXdJbmdyZWRpZW50dcjUdWs5VK4DAAFMAAdfJDI3NzM5dAASTGphdmEvbGFuZy9TdHJpbmc7eHIAJ2NvbS5lcm9zdGVrLmVyb3NsaW5rLkFic3RyYWN0SW5ncmVkaWVudIkubqOA2HlEAwACTAAHXyQyNzE3M3EAfgABTAAHXyQyNzE4MnEAfgABeHB0AAtWMS0yMDAxMTEwOXQAATF0AA48Tm90aGluZyBFbHNlPncIAAAAAF0Ll1V4dAALVjEtMjAwMjA3MTN0AD1HWsKPUjdZT8KaSEBIUMKQUDhWUMKYSEBIVMKQUDhVesKYSEBIVMKQUDjChXrCmEhAeVTCkFA4woFRwphIdwgAAAAA5KmTtXg=";
  const serialized = Buffer.from(data, "base64");
  const stream = new ObjectInputStream(serialized);
  const reader = new SerializeReadHelper(stream);

  const ingredient = reader.readObject();
  expect(ingredient).toBeInstanceOf(RawIngredient);
  expect(ingredient.rawBytesString).toBe("0x9a 0x4a 0xbe 0x40 0xb5 0x40 0x86 0x00 0x87 0x80");
});
