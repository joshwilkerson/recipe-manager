import "@mantine/core/styles.css"

import { BrowserRouter, Route, Routes } from "react-router-dom"
import { MantineProvider, Box } from "@mantine/core"
import { theme } from "./theme"
import { Home, Profile } from "./pages"
import {NavBarHeader} from "./components/NavBarHeader"

const GlobalLayout = ({ children }: { children: React.ReactNode }) => {
  return <Box>
    <NavBarHeader />
    {children}</Box>
}
const App = () => {
  return (
    <MantineProvider theme={theme}>
      <GlobalLayout>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile/" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </GlobalLayout>
    </MantineProvider>
  )
}

export default App
