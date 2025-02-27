import "@mantine/core/styles.css"

import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom"
import { MantineProvider, Box } from "@mantine/core"
import { theme } from "./theme"
import { Home, Profile } from "./pages"
import { NavBarHeader } from "./components/NavBarHeader"

const GlobalLayout = () => {
  return (
    <Box>
      <NavBarHeader />
      <Outlet />
    </Box>
  )
}

const App = () => {
  return (
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GlobalLayout />}>
            <Route index element={<Home />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App
