import { Burger, Container, Group, Button, Image, Text } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import classes from "./NavBar.module.css"
import { Link, useLocation } from "react-router-dom"
import GurometGuideLogo from "../pictures/GurometGuide.jpeg"

export function NavBarHeader() {
  const [opened, { toggle }] = useDisclosure(false)
  const location = useLocation()
  const currentRoute = location.pathname

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Group gap="sm">
          <Text fw={600} size="lg">
            Gourmet Guides
          </Text>
        </Group>
        <Group gap={5} visibleFrom="xs">
          <Button
            component={Link}
            to="/"
            variant={currentRoute === "/" ? "filled" : "outline"}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/profile"
            variant={currentRoute === "/profile" ? "filled" : "outline"}
          >
            Recipes
          </Button>
        </Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  )
}
