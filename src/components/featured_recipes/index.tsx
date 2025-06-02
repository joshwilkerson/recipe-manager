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

  const numberOfRecipes = 3

  const checkForDuplicates = (recipes: Meal[]) => {
    const seenIds = new Set()
    for (const recipe of recipes) {
      if (seenIds.has(recipe.id)) {
        return true
      }
      seenIds.add(recipe.id)
    }
    return false
  }

  const getRecipes = async () => {
    setLoading(true)
    setError(null)

    try {
      let recipes = await getFeaturedRecipes(numberOfRecipes)

      let tries = 0
      while (checkForDuplicates(recipes) && tries < 5) {
        recipes = await getFeaturedRecipes(numberOfRecipes)
        tries++
      }

      setMeals(recipes)
    } catch (err) {
      setError("Sorry, we couldn't load the recipes. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getRecipes()
  }, [])

  const emptyCard = {
    description: "",
    id: "",
    imageUrl: "",
    title: "",
  }

  const loadingCards = Array(numberOfRecipes)
    .fill(0)
    .map((_, index) => (
      <FeaturedRecipesCard key={index} isLoading={true} {...emptyCard} />
    ))

  const recipeCards = meals.map((meal) => {
    const shortDescription =
      meal.instructions.length > 100
        ? meal.instructions.slice(0, 100) + "..."
        : meal.instructions

    return (
      <FeaturedRecipesCard
        key={meal.id}
        id={meal.id}
        imageUrl={meal.thumbnail}
        title={meal.title}
        description={shortDescription}
        isLoading={false}
      />
    )
  })

  return (
    <Flex gap={getSpacingUnit(2)} direction="column">
      <Title order={2}>Featured Recipes</Title>
      {error && (
        <Alert variant="light" color="red" title="Oops!">
          <Flex direction="column" gap={getSpacingUnit(2)} align="flex-start">
            {error}
            <Button variant="filled" color="blue" onClick={getRecipes}>
              Try Again
            </Button>
          </Flex>
        </Alert>
      )}
      <SimpleGrid cols={numberOfRecipes}>
        {loading ? loadingCards : recipeCards}
      </SimpleGrid>
    </Flex>
  )
}
