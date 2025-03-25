import { useState, useCallback } from "react"
import debounce from "lodash/debounce"
import { getMealByName } from "../../api"
import type { Meal } from "../../types"
import { IoClose, IoSearchOutline } from "react-icons/io5"
import styles from "./SearchBar.module.css"
import { Input, CloseButton, Box, Loader } from "@mantine/core"
import { useNavigate } from "react-router-dom" // Add this import

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [searchResults, setSearchResults] = useState<Meal[]>([])
  const navigate = useNavigate() // Add this hook

  const searchMeals = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    try {
      setIsLoading(true)
      const results = await getMealByName(query)
      setSearchResults(results || [])
    } catch (error) {
      console.error("Error searching meals:", error)
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const debouncedSearch = useCallback(
    debounce((query: string) => searchMeals(query), 500),
    []
  )

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSearchQuery(value)
    debouncedSearch(value)
  }

  const handleClear = () => {
    setSearchQuery("")
    setSearchResults([])
  }

  // Add this function to handle recipe click
  const handleRecipeClick = (mealId: string) => {
    navigate(`/recipe/${mealId}`)
    handleClear() // Clear the search after navigation
  }

  return (
    <div className={styles.searchWrapper}>
      <div className={styles.searchContainer}>
        <Box pos="relative">
          <Input
            placeholder="Search Recipe by name"
            value={searchQuery}
            onChange={handleInputChange}
            rightSectionPointerEvents="all"
            mt="md"
            leftSection={<IoSearchOutline />}
            rightSection={
              <CloseButton
                aria-label="Clear input"
                onClick={handleClear}
                style={{ display: searchQuery ? undefined : "none" }}
                icon={<IoClose size={20} />}
              />
            }
          />
          {searchQuery && (
            <div className={styles.searchResultsContainer}>
              {isLoading ? (
                <div className={styles.loading}>
                  <Loader size="sm" type="dots" />
                </div>
              ) : searchResults.length > 0 ? (
                <div className={styles.searchResults}>
                  {searchResults.map((meal) => (
                    <div
                      key={meal.id}
                      className={styles.searchResultItem}
                      onClick={() => handleRecipeClick(meal.id)}
                      role="button"
                      tabIndex={0}
                      style={{ cursor: "pointer" }}
                    >
                      <span className={styles.resultTitle}>{meal.title}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.noResults}>No results found</div>
              )}
            </div>
          )}
        </Box>
      </div>
    </div>
  )
}

export default SearchBar
