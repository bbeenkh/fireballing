import { config as reactInternalConfig } from "@somefit/eslint-config/react-internal";

export default [
  ...reactInternalConfig,
  { ignores: ["dist/", "storybook-static/", ".storybook/"] },
];
