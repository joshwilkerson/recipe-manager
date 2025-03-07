// API response interfaces (matching actual API structure)
export interface MealDbMeal {
  idMeal: string
  strMeal: string
  strCategory: string
  strArea: string
  strInstructions: string
  strMealThumb: string
}

export interface MealDbResponse {
  meals: MealDbMeal[] | null
}

// export interface MealDbResponse {
//   meals: [ {
//     idMeal: string
//     strMeal: string
//     strCategory: string
//     strArea: string
//     strInstructions: string
//     strMealThumb: string
//   }]
// }

// application's interfaces
export interface Meal {
  id: string
  title: string
  category: string
  area: string
  instructions: string
  image: string
}

export interface Category {
  id: string
  name: string
  thumb: string
  description: string
}

export interface CategoryResponse {
  categories: Category[]
}

const API_URL = "https://www.themealdb.com/api/json/v1/1"

// Helper function to transform API response to your application's format
const transformMeal = (apiMeal: MealDbMeal): Meal => {
  return {
    id: apiMeal.idMeal,
    title: apiMeal.strMeal,
    category: apiMeal.strCategory || "",
    area: apiMeal.strArea || "",
    instructions: apiMeal.strInstructions || "",
    image: apiMeal.strMealThumb || "",
  }
}

export const MealDbService = {
  async getRandomMeal(): Promise<Meal | null> {
    try {
      console.log("Fetching random meal from API...")
      const response = await fetch(`${API_URL}/random.php`)

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()
      console.log("Random meal API response:", data)

      if (!data.meals || data.meals.length === 0) {
        console.warn("API returned no meals")
        return null
      }

      const apiMeal = data.meals[0]
      return transformMeal(apiMeal)
    } catch (error) {
      console.error("Error fetching random meal:", error)
      throw error
    }
  },

  async searchMealByName(name: string): Promise<Meal[]> {
    try {
      const response = await fetch(
        `${API_URL}/search.php?s=${encodeURIComponent(name)}`
      )

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()

      if (!data.meals) {
        return []
      }

      return data.meals.map(transformMeal)
    } catch (error) {
      console.error("Error searching meals:", error)
      throw error
    }
  },

  async getMealById(id: string): Promise<Meal | null> {
    try {
      const response = await fetch(`${API_URL}/lookup.php?i=${id}`)

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()

      if (!data.meals || data.meals.length === 0) {
        return null
      }

      return transformMeal(data.meals[0])
    } catch (error) {
      console.error("Error fetching meal by ID:", error)
      throw error
    }
  },

  async getCategories(): Promise<Category[]> {
    try {
      const response = await fetch(`${API_URL}/categories.php`)

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()
      return data.categories || []
    } catch (error) {
      console.error("Error fetching categories:", error)
      throw error
    }
  },

  async filterByCategory(category: string): Promise<Meal[]> {
    try {
      const response = await fetch(
        `${API_URL}/filter.php?c=${encodeURIComponent(category)}`
      )

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()

      if (!data.meals) {
        return []
      }

      // For filter endpoints, we need to fetch complete meal details
      // as they only return partial information
      const mealPromises = data.meals.map((meal: any) =>
        this.getMealById(meal.idMeal)
      )

      const meals = await Promise.all(mealPromises)
      return meals.filter((meal): meal is Meal => meal !== null)
    } catch (error) {
      console.error("Error filtering meals by category:", error)
      throw error
    }
  },

  async filterByArea(area: string): Promise<Meal[]> {
    try {
      const response = await fetch(
        `${API_URL}/filter.php?a=${encodeURIComponent(area)}`
      )

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()

      if (!data.meals) {
        return []
      }

      // For filter endpoints, we need to fetch complete meal details
      const mealPromises = data.meals.map((meal: any) =>
        this.getMealById(meal.idMeal)
      )

      const meals = await Promise.all(mealPromises)
      return meals.filter((meal): meal is Meal => meal !== null)
    } catch (error) {
      console.error("Error filtering meals by area:", error)
      throw error
    }
  },

  async filterByMainIngredient(ingredient: string): Promise<Meal[]> {
    try {
      const response = await fetch(
        `${API_URL}/filter.php?i=${encodeURIComponent(ingredient)}`
      )

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()

      if (!data.meals) {
        return []
      }

      // For filter endpoints, we need to fetch complete meal details
      const mealPromises = data.meals.map((meal: any) =>
        this.getMealById(meal.idMeal)
      )

      const meals = await Promise.all(mealPromises)
      return meals.filter((meal): meal is Meal => meal !== null)
    } catch (error) {
      console.error("Error filtering by ingredient:", error)
      throw error
    }
  },

  // Add this method to your MealDbService object
  async searchByFirstLetter(letter: string): Promise<Meal[]> {
    try {
      if (!letter || letter.length !== 1) {
        throw new Error("Search by first letter requires exactly one character")
      }

      const response = await fetch(
        `${API_URL}/search.php?f=${encodeURIComponent(letter)}`
      )

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data: MealDbResponse = await response.json()

      if (!data.meals) {
        return []
      }

      return data.meals.map(transformMeal)
    } catch (error) {
      console.error("Error searching meals by first letter:", error)
      throw error
    }
  },
}
