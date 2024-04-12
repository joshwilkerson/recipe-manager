import { getSpacing } from "@mantine/core"
export const getSpacingUnit = (unitValue: number) => {
  return getSpacing(unitValue * 8)
}
