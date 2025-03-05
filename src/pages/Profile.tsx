import { Flex, Title } from "@mantine/core"
import { getSpacingUnit } from "../functions/getSpacingUnit"

export const Profile = () => {
  return (
    <Flex direction="column" align="start" gap={getSpacingUnit(2)}>
      <Title order={1}>Profile</Title>
    </Flex>
  )
}
