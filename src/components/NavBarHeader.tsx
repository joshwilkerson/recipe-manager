import { Burger, Container, Group, Button, Text } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import classes from "./NavBar.module.css"
import { Link, useLocation } from "react-router-dom"

export function NavBarHeader() {
  const [opened, { toggle }] = useDisclosure(false)
  const location = useLocation()
  const currentRoute = location.pathname

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Text fw={700} size="lg">
          Gournet Guides
        </Text>
        <Group gap={5} visibleFrom="xs">
          <Button
            component={Link}
            to="/"
            variant={currentRoute === "/" ? "filled" : "outline"}
          >
            Home
          </Button>
        </Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  )
}
