import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/ban-types": "off", //For empty props
      "no-var": "off",
      "prefer-const": "off",  //For usePath()
      "@typescript-eslint/no-empty-object-type": "off", // For empty Props types
      "@typescript-eslint/no-non-null-asserted-optional-chain": "off", // For optional chaining
      "@typescript-eslint/no-explicit-any": "off"
    }
  }
];

export default eslintConfig;
