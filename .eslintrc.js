module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "standard-with-typescript",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json"],
  },
  plugins: ["react"],
  rules: {
    // MEMO: eslint-plugin-reactと競合するのでOFF
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    // MEMO: https://github.com/react-hook-form/react-hook-form/discussions/8020
    "@typescript-eslint/no-misused-promises": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
