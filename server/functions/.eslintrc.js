module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021, // Specify the ECMAScript version
    sourceType: "module", // CommonJS modules are specified in the TypeScript configuration, so keep this as 'module'.
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  rules: {
    // Add your project-specific rules here
    // You may disable any rules that conflict with CommonJS usage.
    "import/extensions": "off", // Disable extension checking in imports
  },
};
