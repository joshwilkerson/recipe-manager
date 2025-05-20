import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
  Title,
  SimpleGrid,
  Card,
  Image,
  Text,
  Loader,
  Alert,
  Button,
  Container,
  Select,
} from "@mantine/core"
import { getMealByCuisine, getCategories } from "../../api"
import type { Meal } from "../../types"
import styles from "./CuisineList.module.css"
import { handleRecipeClick } from "../../shared/recipeUtils"

export const CuisineList = () => {
  const { CuisineName } = useParams<{ CuisineName: string }>()
  const navigate = useNavigate()
  const [meals, setMeals] = useState<Meal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    const fetchMeals = async () => {
      if (!CuisineName) return

      setLoading(true)
      setError(null)
      try {
        console.log("Fetching meals for cuisine:", CuisineName)
        const fetchedMeals = await getMealByCuisine(CuisineName)
        console.log("Fetched meals:", fetchedMeals)
        setMeals(fetchedMeals)
      } catch (error) {
        console.error("Error fetching meals:", error)
        setError("Error loading meals. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchMeals()
  }, [CuisineName])

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

  const onRecipeClick = (meal: Meal) => {
    handleRecipeClick({ idMeal: meal.id, strMeal: meal.title } as any, navigate)
  }

  const handleCategoryChange = (value: string | null) => {
    if (value) {
      navigate(`/category/${value}`)
    }
  }

  if (!CuisineName) {
    return (
      <Container>
        <Alert color="red" title="Error">
          No cuisine specified
        </Alert>
      </Container>
    )
  }

  return (
    <Container>
      <div className={styles.cuisineContainer}>
        <Title order={2} className={styles.cuisineTitle}>
          {CuisineName} Cuisine Recipes
        </Title>

        {error && (
          <Alert variant="light" color="red" title="Something went wrong">
            <Button
              variant="filled"
              color="blue"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </Alert>
        )}

        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "left",
              padding: "2rem",
            }}
          >
            <Loader size="xl" />
          </div>
        ) : meals.length === 0 ? (
          <Alert color="yellow" title="No recipes found">
            No recipes found for this cuisine. Please try another cuisine.
          </Alert>
        ) : (
          <SimpleGrid
            cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
            className={styles.cuisineGrid}
          >
            {meals.map((meal) => (
              <Card
                key={meal.id}
                className={styles.cuisineCard}
                onClick={() => onRecipeClick(meal)}
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
              >
                <Card.Section>
                  <Image
                    src={meal.thumbnail}
                    height={160}
                    alt={meal.title}
                    className={styles.cuisineImage}
                  />
                </Card.Section>

                <Text fw={500} size="lg" mt="md" className={styles.cuisineName}>
                  {meal.title}
                </Text>
              </Card>
            ))}
          </SimpleGrid>
        )}
      </div>
    </Container>
  )
}
