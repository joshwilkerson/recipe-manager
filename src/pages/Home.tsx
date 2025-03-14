import { Container, Flex } from "@mantine/core"
import { getSpacingUnit } from "../functions/getSpacingUnit"
import { FeaturedRecipes } from "../components/featured_recipes"
import SearchBar from "../components/SearchBar/SearchBar"

export const Home = () => {
  return (
    <Container>
      <Flex direction="column" align="start" gap={getSpacingUnit(2)} mx="auto">
        <FeaturedRecipes />
      </Flex>
    </Container>
  )
}
