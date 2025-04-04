import type { Meal } from "../types"

export const getRandomMeal = async (): Promise<Meal | null> => {
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    )
    if (!response.ok) {
      throw new Error(
        `Network error: ${response.status} ${response.statusText}`
      )
    }
    const data = await response.json()
    if (data.meals && data.meals.length > 0) {
      const meal = data.meals[0]
      return {
        id: meal.idMeal,
        title: meal.strMeal,
        thumbnail: meal.strMealThumb,
        instructions: meal.strInstructions,
        ingredients: Array.from({ length: 20 }, (_, i) => {
          const ingredient = meal[`strIngredient${i + 1}`]
          const measure = meal[`strMeasure${i + 1}`]
          return ingredient && measure
            ? `${measure.trim()} ${ingredient.trim()}`
            : ingredient
            ? ingredient.trim()
            : ""
        }).filter(Boolean),
      }
    }
    throw new Error("No meals found in the response")
  } catch (error) {
    console.error("Error fetching random meal:", error)
    throw error
  }
}

export const getFeaturedRecipes = async (
  count: number = 3
): Promise<Meal[]> => {
  try {
    const promises = Array(count)
      .fill(0)
      .map(() => getRandomMeal())
    const results = await Promise.all(promises)
    const validMeals = results.filter((meal): meal is Meal => meal !== null)
    return validMeals
  } catch (error) {
    console.error("Error fetching featured recipes:", error)
    throw error
  }
}
export const getMealByName = async (name: string): Promise<Meal[]> => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
        name
      )}`
    )
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const data = await response.json()
    if (!data.meals || data.meals.length === 0) {
      return []
    }

    return data.meals.map((mealData: any) => {
      const ingredients: string[] = []
      for (let i = 1; i <= 20; i++) {
        const ingredient = mealData[`strIngredient${i}`]
        const measure = mealData[`strMeasure${i}`]

        if (ingredient && ingredient.trim() !== "") {
          const fullIngredient =
            measure && measure.trim()
              ? `${measure} ${ingredient}`.trim()
              : ingredient.trim()

          ingredients.push(fullIngredient)
        }
      }

      return {
        id: mealData.idMeal,
        title: mealData.strMeal,
        thumbnail: mealData.strMealThumb,
        instructions: mealData.strInstructions,
        ingredients: ingredients,
      }
    })
  } catch (error) {
    console.error("Error searching meals:", error)
    throw error
  }
}

export const getMealById = async (id: string): Promise<Meal | null> => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    )

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()

    if (!data.meals || data.meals.length === 0) {
      return null
    }

    const mealData = data.meals[0]

    const ingredients: string[] = []
    for (let i = 1; i <= 20; i++) {
      const ingredient = mealData[`strIngredient${i}`]
      const measure = mealData[`strMeasure${i}`]

      if (ingredient && ingredient.trim() !== "") {
        const fullIngredient =
          measure && measure.trim()
            ? `${measure} ${ingredient}`.trim()
            : ingredient.trim()

        ingredients.push(fullIngredient)
      }
    }

    return {
      id: mealData.idMeal,
      title: mealData.strMeal,
      thumbnail: mealData.strMealThumb,
      instructions: mealData.strInstructions,
      ingredients: ingredients,
    }
  } catch (error) {
    console.error("Error fetching meal by ID:", error)
    throw error
  }
}
