import { Container, Flex } from "@mantine/core"
import { getSpacingUnit } from "../functions/getSpacingUnit"
import { FeaturedRecipes } from "../components/featured_recipes"
import classes from "./Home.module.css"

export const Home = () => {
  return (
    <Container size="xl" className={classes.container}>
      <Flex
        direction="column"
        align="center"
        justify="center"
        gap={getSpacingUnit(2)}
        className={classes.content}
      >
        <FeaturedRecipes />
      </Flex>
    </Container>
  )
}
