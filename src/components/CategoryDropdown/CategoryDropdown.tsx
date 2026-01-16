import { useState, useEffect } from "react"
import { Select } from "@mantine/core"
import { getCategories } from "../../api"
import { useNavigate } from "react-router-dom"

export const CategoryDropdown = () => {
  const [categories, setCategories] = useState<string[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories()
        setCategories(fetchedCategories)
      } catch (error) {
        console.error("Error fetching categories:", error)
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
