module.exports = {
  parser: "babel-eslint",
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ["standard", "prettier"],
  plugins: ["prettier"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": ["warn"],
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off",
    "no-unused-vars": [
      "error",
      {
        vars: "local",
        args: "none",
      },
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
}
