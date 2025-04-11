import "@mantine/core/styles.css"

import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom"
import { MantineProvider, Box } from "@mantine/core"
import { theme } from "./theme"
import { Home, Profile } from "./pages"
import { NavBarHeader } from "./components/NavBarHeader"
import { RecipeDetail } from "./pages/RecipeDetail"
import { ModalsProvider } from "@mantine/modals"
import { CategoryList } from "./components/CategoryList/CategoryList"

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
      <ModalsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<GlobalLayout />}>
              <Route index element={<Home />} />
              <Route path="profile" element={<Profile />} />
              <Route path="recipe/:id" element={<RecipeDetail />} />
              <Route path="category/:categoryName" element={<CategoryList />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ModalsProvider>
    </MantineProvider>
  )
}

export default App
