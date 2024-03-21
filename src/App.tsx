import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home, Profile } from "./pages"

const GlobalLayout = ({ children }: { children: React.ReactNode }) => {
  return <div style={{ padding: "2em" }}>{children}</div>
}
const App = () => {
  return (
    <GlobalLayout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </GlobalLayout>
  )
}

export default App
