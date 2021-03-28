# ErosLink Routine File Parser

## Example

```typescript
import { ErosLinkFile } from "eroslink-file";

const data = fs.readFileSync("path/to/routine.elk");
const context = new ErosLinkFile(data);

for (const routine of context.routines) {
  console.log(`Routine "${routine.name}" has ${routine.ingredients.length} ingredients`);
}
```

## Status

All ingredients are implemented and all the included routine files can be fully loaded, but not all of the file format is covered, and the API surface isn't stable.

## License

[MIT](https://choosealicense.com/licenses/mit/)
