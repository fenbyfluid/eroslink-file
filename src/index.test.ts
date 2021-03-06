import { AbstractIngredient, ChannelIngredient, DesignerFile, Routine } from "./index";

function bigintReplacer(key: string, value: any): any {
  return (typeof value === "bigint") ? value.toString() : value;
}

test("deserialize eroslink routine", () => {
  const data = "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";
  const serialized = Buffer.from(data, "base64");

  const context = new DesignerFile(serialized);
  // console.log(JSON.stringify(context, bigintReplacer, 2));

  expect(context.serial).toBe("7a7a9bf-234be-54b8-127e");
  expect(context.routines.length).toBe(3);

  const routine = context.routines[0];
  expect(routine).toBeInstanceOf(Routine);
  expect(routine.name).toBe("Continuous");
  expect(routine.ingredients.length).toBe(3);

  const ingredient = routine.ingredients[0];
  expect(ingredient).toBeInstanceOf(AbstractIngredient);
  expect(ingredient).toBeInstanceOf(ChannelIngredient);
  expect(ingredient.instanceName).toBe("1");

  if ("channel" in ingredient) {
    expect(ingredient.channel).toBe("BOTH");
  }

  if (ingredient instanceof ChannelIngredient) {
    expect(ingredient.channel).toBe("BOTH");
  }
});

const ROUTINE_PATH = __dirname + "/../routines";

function isErrnoException(error: unknown): error is NodeJS.ErrnoException {
  if (error === null || !(typeof error === 'object')) {
    return false;
  }

  return error.hasOwnProperty('errno');
}

try {
  const fs = require("fs");

  const recursiveReadRoutine = function (basePath: string, extension: RegExp, callback: (name: string, routine: Uint8Array) => void) {
    const directories = [];
    const children = fs.readdirSync(basePath, { withFileTypes: true });
    for (const child of children) {
      if (child.isDirectory()) {
        directories.push(child.name);
      } else if (child.isFile() && child.name.match(extension)) {
        const data = fs.readFileSync(basePath + "/" + child.name);
        callback(child.name.replace(extension, ""), data);
      }
    }
    for (const directory of directories) {
      recursiveReadRoutine(basePath + "/" + directory, extension, callback);
    }
  };

  recursiveReadRoutine(ROUTINE_PATH, /\.elk$/, (name, routine) => {
    test(`deserialize ${name} routine`, () => {
      const context = new DesignerFile(routine);
      // console.log(name, JSON.stringify(context, bigintReplacer, 2));
    });
  });

  /*
  recursiveReadRoutine(ROUTINE_PATH, /\.eis$/, (name, routine) => {
    test(`deserialize ${name} routine`, () => {
      const context = new InteractiveFile(routine);
      // console.log(name, JSON.stringify(context, bigintReplacer, 2));
    });
  });
  */
} catch (e) {
  if (isErrnoException(e) && e.code === "ENOENT") {
    console.log("routine tests wont run as no routine files found");
  } else {
    throw e;
  }
}
