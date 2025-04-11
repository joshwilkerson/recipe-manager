import { Flex, Title } from "@mantine/core"
import { getSpacingUnit } from "../functions/getSpacingUnit"
import SearchBar from "../components/SearchBar/SearchBar"
import { CategoryList } from "../components/CategoryList/CategoryList"
import { AreaList } from "../components/AreaList/AreaList"

export const Profile = () => {
  return (
    <Flex direction="column" align="start" gap={getSpacingUnit(2)}>
      <Title order={1}>Recipes</Title>
      <SearchBar />
      <CategoryList />
      <AreaList />
    </Flex>
  )
}
