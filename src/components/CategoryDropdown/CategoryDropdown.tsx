import { useState, useEffect } from "react"
import { Select, Loader } from "@mantine/core"
import { getCategories } from "../../api"
import { useNavigate } from "react-router-dom"

export const CategoryDropdown = () => {
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true)
      setError(null)
      try {
        const fetchedCategories = await getCategories()
        setCategories(fetchedCategories)
      } catch (error) {
        setError("Error loading categories. Please try again.")
        console.error("Error fetching categories:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const handleCategoryChange = (value: string | null) => {
    if (value) {
      navigate(`/category/${value}`)
    }
  }

  return (
    <Select
      label="Browse by category"
      placeholder="Select a category"
      data={categories}
      onChange={handleCategoryChange}
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
