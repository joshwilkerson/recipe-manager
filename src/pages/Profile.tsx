import { Flex, Title } from "@mantine/core"
import { NavButton } from "../components"
import { getSpacingUnit } from "../functions/getSpacingUnit"

export const Profile = () => {
  return (
    <Flex direction="column" align="start" gap={getSpacingUnit(2)}>
      <Title order={1}>Profile</Title>
      <NavButton to="/" text="Home" />
    </Flex>
  )
}
