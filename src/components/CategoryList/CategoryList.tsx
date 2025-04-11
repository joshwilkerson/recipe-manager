import { useState, useEffect } from "react"
import {
  Button,
  SimpleGrid,
  Title,
  Loader,
  Alert,
  Group,
  Container,
  Center,
} from "@mantine/core"
import { getMealByCategory } from "../../api"
import type { Meal } from "../../types"
import { getSpacingUnit } from "../../functions/getSpacingUnit"
import { FeaturedRecipesCard } from "../featured_recipes/card"
import styles from "./CategoryList.module.css"

const INITIAL_DISPLAY_COUNT = 4

const CATEGORIES = [
  "Beef",
  "Chicken",
  "Dessert",
  "Lamb",
  "Pasta",
  "Pork",
  "Seafood",
  "Side",
  "Starter",
  "Vegan",
  "Vegetarian",
  "Breakfast",
  "Goat",
  "Miscellaneous",
] as const

type Category = (typeof CATEGORIES)[number]

export const CategoryList = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | "">("")
  const [meals, setMeals] = useState<Meal[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY_COUNT)

  useEffect(() => {
    const fetchMeals = async () => {
      if (!selectedCategory) return

      setLoading(true)
      setError(null)
      try {
        const fetchedMeals = await getMealByCategory(selectedCategory)
        setMeals(fetchedMeals)
      } catch (error) {
        setError("Error loading meals. Please try again.")
        console.error("Error fetching meals:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMeals()
    setDisplayCount(INITIAL_DISPLAY_COUNT)
  }, [selectedCategory])

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category)
  }

  const handleViewMore = () => {
    setDisplayCount(meals.length)
  }

  const handleClearCategory = () => {
    setSelectedCategory("")
    setMeals([])
    setDisplayCount(INITIAL_DISPLAY_COUNT)
  }

  const displayedMeals = meals.slice(0, displayCount)
  const hasMoreMeals = meals.length > displayCount

  return (
    <Container size="xl" className={styles.categoryContainer}>
      <section className={styles.categorySection}>
        <Title order={2} className={styles.sectionTitle}>
          Browse by Category
        </Title>

        <Group gap="xs" className={styles.categoryButtons}>
          {CATEGORIES.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "filled" : "outline"}
              onClick={() => handleCategorySelect(category)}
              className={styles.categoryButton}
            >
              {category}
            </Button>
          ))}
          <Button
            variant="outline"
            onClick={handleClearCategory}
            className={styles.clearButton}
          >
            Clear
          </Button>
        </Group>
      </section>

      {selectedCategory && (
        <section className={styles.mealsSection}>
          <Title order={3} className={styles.sectionTitle}>
            {selectedCategory} Recipes
          </Title>

          {error && (
            <Alert variant="light" color="red" title="Something went wrong">
              {error}
            </Alert>
          )}

          {loading ? (
            <div className={styles.loadingContainer}>
              <Loader size="xl" />
            </div>
          ) : (
            <>
              <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
                {displayedMeals.map((meal) => (
                  <FeaturedRecipesCard
                    key={meal.id}
                    id={meal.id}
                    imageUrl={meal.thumbnail}
                    title={meal.title}
                    description=""
                    isLoading={false}
                  />
                ))}
              </SimpleGrid>

              {hasMoreMeals && (
                <Center mt={getSpacingUnit(3)}>
                  <Button onClick={handleViewMore} variant="outline" size="md">
                    View More {selectedCategory} Recipes
                  </Button>
                </Center>
              )}
            </>
          )}
        </section>
      )}
    </Container>
  )
}
