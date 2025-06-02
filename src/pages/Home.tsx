import { Container, Stack, Paper, Group } from "@mantine/core"
import { FeaturedRecipes } from "../components/featured_recipes"
import SearchBar from "../components/SearchBar/SearchBar"
import { CategoryDropdown } from "../components/CategoryDropdown/CategoryDropdown"
import { CuisineDropdown } from "../components"
import styles from "./Home.module.css"

export const Home = () => {
  return (
    <Container className={styles.container}>
      <Stack gap="xl" className={styles.content}>
        <Paper shadow="sm" p="xl" radius="lg">
          <SearchBar />
        </Paper>

        <Group gap="md" grow>
          <Paper shadow="sm" p="md" radius="md">
            <CategoryDropdown />
          </Paper>
          <Paper shadow="sm" p="md" radius="md">
            <CuisineDropdown />
          </Paper>
        </Group>

        <Paper shadow="sm" p="xl" radius="lg">
          <FeaturedRecipes />
        </Paper>
      </Stack>
    </Container>
  )
}
