# Lit Lib

A basic lit library stub for exporting lit components as a npm ready package.

## Configuration

### `package.json`

#### `name`

Set the name field to whatever your npm package should be called

#### `version`

Set the version to match your published npm version

#### `files, type, main, module, types`

These fields should be left alone, as they're required to resolve the submodules in the published package as well as the entry point

#### `scripts`

| script name     | execution behaviour                                                                                                                                                                                                       |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| dev             | starts up a dev environment based on the index.html                                                                                                                                                                       |
| build           | builds all referenced files starting at the index.ts entry point, copies the type declarations to the dist folder, and alters the package.json to make the package publish-ready. See vite.config.ts for more information |
| test            | runs and watches test files inside the test folder with vitest and happy-dom                                                                                                                                              |
| test:run        | runs tests once                                                                                                                                                                                                           |
| test:cover      | provides test coverage reports                                                                                                                                                                                            |
| analyze         | uses lit-analyser to find possible issues with the codebase                                                                                                                                                               |
| lint            | finds eslint-related issues                                                                                                                                                                                               |
| lint:fix        | finds and fixes auto fixable eslint-related issues                                                                                                                                                                        |
| format          | formats all files using prettier                                                                                                                                                                                          |
| lint:staged     | executes lint-staged to process all staged files on commit                                                                                                                                                                |
| prepare         | automatically installs husky when `pnpm i` is ran                                                                                                                                                                         |
| package         | publishes the dist folder to npm                                                                                                                                                                                          |
| package:dry-run | dry-runs a publish to npm                                                                                                                                                                                                 |

### `vite.config.ts`

### `@jensk/rollup-plugin-package-process`

Copies over the `package.json` file and allows developers to modify the output.

## Usage

After publishing, using the package is straightforward.

### File structure & `import`/`export` conventions

Importing files can be done in either of two ways;

The first method imports a specific component from the entry point or specific file which must be defined as a lit component after importing.

```ts
import { CardElement } from "lit-lib";
// OR
import { CardElement } from "lit-lib/components/card";

customElements.define("card-element", CardElement);
```

The second method imports with side effects, meaning the components will be defined once the file is imported. Therefore, it is no longer necessary to manually define each component after importing.

```ts
import "lit-lib/components/button";
// OR
import("lit-lib/components/button");
```

To facilitate both methods of importing components, it is recommended the provided component structure in the template is maintained. Meaning each component has its own folder, which contains an `index.ts` file and a `styles.css` file. Inside the `index.ts` file, the `LitElement` should be decorated using the `@customElement` decorator from the `lit/decorators.js` package. On top of that, each component should use a named export, instead of a default export. This will result in better type autocompletion when specific files are imported. Lastly, each element should be exported from the `index.ts` file inside the root of the `src` folder

### Defining CSS

To define css for your component you can opt to use the regular lit `css` template function. However, vite offers an alternative method which could improve code structure. Using the `?inline` query parameter a css file can be imported as a string, effectively allowing developers to use proper .css files, instead of css-in-js. After you've imported a css file like shown in either of the component examples, it can be added to the styles through the `unsafeCSS` method exported from the `lit` package.

### Declaring defined customElements

After creating an element, it should be defined globally, so IDEs can register that it exists. This can be done by adding it to the global `HTMLElementTagNameMap`. See example components.
