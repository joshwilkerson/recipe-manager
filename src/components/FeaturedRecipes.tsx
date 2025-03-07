import {
  Card,
  Container,
  Group,
  SimpleGrid,
  Text,
  Title,
  Button,
  Skeleton,
} from "@mantine/core"
import classes from "./FeaturedRecipes.module.css"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { MealDbService, Meal } from "../services/mealDbService"

export function FeaturedRecipes() {
  const navigate = useNavigate()
  const [recipes, setRecipes] = useState<Meal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFeaturedRecipes = async () => {
      try {
        setLoading(true)
        setError(null)

        console.log("Fetching featured recipes...")

        const promises = Array(3)
          .fill(0)
          .map(() => MealDbService.getRandomMeal())

        const results = await Promise.all(promises)
        console.log("API results received:", results)

        const validMeals = results.filter((meal): meal is Meal => meal !== null)

        console.log("Valid meals found:", validMeals.length)

        if (validMeals.length === 0) {
          setError("No recipes found. Please try again.")
          return
        }
        validMeals.forEach((meal, index) => {
          console.log(`Meal ${index + 1}:`, {
            id: meal.id,
            title: meal.title,
            image: meal.image,
          })
        })

        setRecipes(validMeals)
      } catch (error) {
        console.error("Error fetching recipes:", error)
        setError("Failed to fetch recipes. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedRecipes()
  }, [])

  const handleCardClick = (recipeId: string) => {
    navigate(`/recipes/${recipeId}`)
  }

  const handleSaveClick = (e: React.MouseEvent, recipeId: string) => {
    e.stopPropagation()
    console.log(`Saving recipe ${recipeId}`)
    // Implement save functionality here
  }

  const handleRetry = () => {
    setLoading(true)
    setError(null)
    setRecipes([])

    const fetchFeaturedRecipes = async () => {
      try {
        const promises = Array(3)
          .fill(0)
          .map(() => MealDbService.getRandomMeal())

        const results = await Promise.all(promises)
        const validMeals = results.filter((meal): meal is Meal => meal !== null)

        if (validMeals.length === 0) {
          setError("No recipes found. Please try again.")
          return
        }

        setRecipes(validMeals)
      } catch (error) {
        console.error("Error fetching recipes:", error)
        setError("Failed to fetch recipes. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedRecipes()
  }

  // Loading state with skeleton UI
  if (loading) {
    return (
      <Container size="lg" py="xl">
        <Title order={2} className={classes.title} ta="left" mt="sm">
          Featured Recipes
        </Title>
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <Card key={index} shadow="md" radius="md" padding="xl">
                <Skeleton height={200} mb="md" />
                <Skeleton height={20} width="70%" mb="sm" />
                <Skeleton height={60} mb="md" />
              </Card>
            ))}
        </SimpleGrid>
      </Container>
    )
  }

  // Error state with retry button
  if (error) {
    return (
      <Container size="lg" py="xl">
        <Title order={2} className={classes.title} ta="left" mt="sm">
          Featured Recipes
        </Title>
        <Text color="red" mb="md">
          {error}
        </Text>
        <Button onClick={handleRetry} variant="filled">
          Retry
        </Button>
      </Container>
    )
  }

  // Success state with recipes
  const features = recipes.map((recipe) => (
    <Card
      key={recipe.id}
      shadow="md"
      radius="md"
      className={classes.card}
      padding="xl"
      onClick={() => handleCardClick(recipe.id)}
      style={{ cursor: "pointer", position: "relative" }}
    >
      {recipe.image && recipe.image.trim() !== "" ? (
        <img
          src={recipe.image}
          alt={recipe.title}
          style={{ width: "100%", height: "auto" }}
          onError={(e) => {
            console.log("Image failed to load:", recipe.image)
            e.currentTarget.src = "https://picsum.photos/500" // Fallback image
          }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "200px",
            backgroundColor: "#f0f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>No image available</Text>
        </div>
      )}

      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {recipe.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {recipe.instructions
          ? recipe.instructions.substring(0, 100) + "..."
          : "No description available"}
      </Text>
      <Group
        justify="flex-end"
        style={{
          position: "absolute",
          bottom: "15px",
          right: "15px",
          width: "auto",
          zIndex: 2,
        }}
        onClick={(e) => handleSaveClick(e, recipe.id)}
      >
        <Button>+ Save</Button>
      </Group>
    </Card>
  ))

  return (
    <Container size="lg" py="xl">
      <Title order={2} className={classes.title} ta="left" mt="sm">
        Featured Recipes
      </Title>

      {recipes.length > 0 ? (
        <>
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
            {features}
          </SimpleGrid>
          <Group justify="center" mt="xl">
            <Button variant="filled">View More</Button>
          </Group>
        </>
      ) : (
        <Text>No recipes available. Please try again.</Text>
      )}
    </Container>
  )
}

export default FeaturedRecipes
