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

  const parsed = ingredient.toArray();
  expect(parsed).toStrictEqual([0x9a, 0x4a, 0xbe, 0x40, 0xb5, 0x40, 0x86, 0x00, 0x87, 0x80]);
});

test("deserialize raw ingredient with module triggers", () => {
  const data = "rO0ABXNyACJjb20uZXJvc3Rlay5lcm9zbGluay5SYXdJbmdyZWRpZW50dcjUdWs5VK4DAAFMAAdfJDI3NzM5dAASTGphdmEvbGFuZy9TdHJpbmc7eHIAJ2NvbS5lcm9zdGVrLmVyb3NsaW5rLkFic3RyYWN0SW5ncmVkaWVudIkubqOA2HlEAwACTAAHXyQyNzE3M3EAfgABTAAHXyQyNzE4MnEAfgABeHB0AAtWMS0yMDAxMTEwOXQAATF0AA48Tm90aGluZyBFbHNlPncIAAAAAF0Ll1V4dAALVjEtMjAwMjA3MTN0AJ1HwoXCj1I3WE/CmkhAUVDCkFA4woN5wphIQEhQwpBQOMKEUMKYSEBQUMKQUDjChVDCmEhAfsKGwpBQOFJ+wphIQElQwpBQOFJ6wphIQEtKOFR+wphIQEpKOFN+wphIQHxQwpBQOMKFfcKYSEBIWMKQUDjChXnCmEhASVDCkFA4VXrCmEhASFjCkFA4UHrCmEhAfFDCkFA4woZ5wphIdwgAAAAA5KmTtXg=";
  const serialized = Buffer.from(data, "base64");
  const stream = new ObjectInputStream(serialized);
  const reader = new SerializeReadHelper(stream);

  const ingredient = reader.readObject();
  expect(ingredient).toBeInstanceOf(RawIngredient);
  expect(ingredient.rawBytesString).toBe("0xaf 0x0d 0xb0 0x80 0xb5 0x01 0xae 0x80 0xee 0x0d 0xf3 *2 0xf4 *3 0xb2 0x01 0xf2 0xff 0x8e 0x08 0x8d 0x00 0xac 0x09 0x86 0xc0");

  const parsed = ingredient.toArray();
  expect(parsed).toStrictEqual([0xaf, 0x0d, 0xb0, 0x80, 0xb5, 0x01, 0xae, 0x80, 0xee, 0x0d, 0xf3, "2", 0xf4, "3", 0xb2, 0x01, 0xf2, 0xff, 0x8e, 0x08, 0x8d, 0x00, 0xac, 0x09, 0x86, 0xc0]);
});

test("parse mixed base raw ingredient", () => {
  const ingredient = new RawIngredient();
  ingredient.rawBytesString = "0x10 10";

  const parsed = ingredient.toArray();
  expect(parsed).toStrictEqual([0x10, 0x0A]);
});

test("parse interactive init raw ingredient", () => {
  const ingredient = new RawIngredient();
  ingredient.rawBytesString = "0x85 0x03   0x86 01  0x9a 0x02   0xac 0x01   0xb5 0x01   0xbe 0x01";

  const parsed = ingredient.toArray();
  expect(parsed).toStrictEqual([0x85, 0x03, 0x86, 0x01, 0x9a, 0x02, 0xac, 0x01, 0xb5, 0x01, 0xbe, 0x01]);
});
