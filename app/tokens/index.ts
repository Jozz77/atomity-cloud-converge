import { colors } from "./colors";
import { spacing } from "./spacing";
import { radius } from "./radius";

export const tokens = {
  colors,
  spacing,
  radius,
} as const;

export type Tokens = typeof tokens;
