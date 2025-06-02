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
import { getMealByCategory, getCuisines, getCategories } from "../../api"
import type { Meal } from "../../types"
import styles from "./CategoryList.module.css"
import { handleRecipeClick } from "../../shared/recipeUtils"

export const CategoryList = () => {
  const { categoryName } = useParams<{ categoryName: string }>()
  const navigate = useNavigate()
  const [meals, setMeals] = useState<Meal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [cuisines, setCuisines] = useState<string[]>([])
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    const fetchMeals = async () => {
      if (!categoryName) return

      setLoading(true)
      setError(null)
      try {
        console.log("Fetching meals for category:", categoryName)
        const fetchedMeals = await getMealByCategory(categoryName)
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
  }, [categoryName])

  useEffect(() => {
    const fetchCuisines = async () => {
      try {
        const fetchedCuisines = await getCuisines()
        setCuisines(fetchedCuisines)
      } catch (error) {
        console.error("Error fetching cuisines:", error)
      }
    }
    fetchCuisines()
  }, [])

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

  const handleCuisineChange = (value: string | null) => {
    if (value) {
      navigate(`/cuisine/${value}`)
    }
  }

  const handleCategoryChange = (value: string | null) => {
    if (value) {
      navigate(`/category/${value}`)
    }
  }

  if (!categoryName) {
    return (
      <Container>
        <Alert color="red" title="Error">
          No category specified
        </Alert>
      </Container>
    )
  }

  return (
    <Container>
      <div className={styles.listContainer}>
        <Title order={2} className={styles.listTitle}>
          {categoryName} Recipes
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
            No recipes found for this category. Please try another category.
          </Alert>
        ) : (
          <SimpleGrid
            cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
            className={styles.listGrid}
          >
            {meals.map((meal) => (
              <Card
                key={meal.id}
                className={styles.categoryCard}
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
                    className={styles.categoryImage}
                  />
                </Card.Section>

                <Text
                  fw={500}
                  size="lg"
                  mt="md"
                  className={styles.categoryName}
                >
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
