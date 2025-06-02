import { useState, useEffect } from "react"
import { Select, Loader } from "@mantine/core"
import { getCuisines } from "../../api"
import { useNavigate } from "react-router-dom"

export const CuisineDropdown = () => {
  const [cuisines, setCuisines] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCuisines = async () => {
      setLoading(true)
      setError(null)
      try {
        const fetchedCuisines = await getCuisines()
        setCuisines(fetchedCuisines)
      } catch (error) {
        setError("Error loading cuisines. Please try again.")
        console.error("Error fetching cuisines:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCuisines()
  }, [])

  const handleCuisineChange = (value: string | null) => {
    if (value) {
      navigate(`/cuisine/${value}`)
    }
  }

  if (loading) {
    return <Loader size="sm" />
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <Select
      label="Browse by Cuisine"
      placeholder="Select a cuisine"
      data={cuisines}
      onChange={handleCuisineChange}
      searchable
      clearable
      styles={{
        label: {
          textAlign: "left",
          width: "100%",
        },
        input: {
          width: "100%",
        },
      }}
    />
  )
}
