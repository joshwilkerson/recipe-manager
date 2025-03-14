import { useState, useEffect } from "react"
import { getFeaturedRecipes } from "../../api"
import type { Meal } from "../../types"
import { FeaturedRecipesCard } from "./card"
import { Title, Flex, Button, Alert, SimpleGrid } from "@mantine/core"
import { getSpacingUnit } from "../../functions/getSpacingUnit"

export const FeaturedRecipes = () => {
  const [meals, setMeals] = useState<Meal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const numberOfFeaturedRecipes = 3
  const descriptionLength = Math.round(100 * (3 / numberOfFeaturedRecipes))

  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true)
      setError(null)
      try {
        const fetchedMeals = await getFeaturedRecipes(numberOfFeaturedRecipes)
        setMeals(fetchedMeals)
      } catch (error) {
        setError("Error loading meals. Please try again.")
      } finally {
        setLoading(false)
      }
    }
    fetchMeals()
  }, [])

  const defaultCardProps = {
    description: "",
    id: "",
    imageUrl: "",
    title: "",
  }

  return (
    <Flex gap={getSpacingUnit(2)} direction="column">
      <Title order={2}>Featured Recipes</Title>
      {error && (
        <Alert variant="light" color="red" title="Something went wrong">
          <Flex direction="column" gap={getSpacingUnit(2)} align="flex-start">
            {error}
            <Button
              variant="filled"
              color="blue"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </Flex>
        </Alert>
      )}
      <SimpleGrid cols={numberOfFeaturedRecipes}>
        {loading ? (
          <>
            {Array(numberOfFeaturedRecipes)
              .fill(0)
              .map((_, index) => (
                <FeaturedRecipesCard
                  key={index}
                  isLoading={true}
                  {...defaultCardProps}
                />
              ))}
          </>
        ) : (
          <>
            {meals.map((meal: Meal) => {
              const truncatedDescription =
                meal.instructions.length > descriptionLength
                  ? meal.instructions.slice(0, descriptionLength) + "..."
                  : meal.instructions
              return (
                <FeaturedRecipesCard
                  key={meal.id}
                  id={meal.id}
                  imageUrl={meal.thumbnail}
                  title={meal.title}
                  description={truncatedDescription}
                  isLoading={false}
                />
              )
            })}
          </>
        )}
      </SimpleGrid>
    </Flex>
  )
}
