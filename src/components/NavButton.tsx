import { Link } from "react-router-dom"
import { Button } from "@mantine/core"

type NavButtonProps = {
  text: string
  to: string
}
export const NavButton = ({ text, to }: NavButtonProps) => {
  return (
    <Button component={Link} to={to}>
      {text}
    </Button>
  )
}
