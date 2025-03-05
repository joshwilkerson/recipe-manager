  export interface Meal {
    idMeal: string
    strMeal: string
    strCategory: string
    strArea: string
    strInstructions: string
    strMealThumb: string
  }
  export interface MealResponse {
    meals: Meal[]
  }
  export interface Category {
    idCategory: string
    strCategory: string
    strCategoryThumb: string
    strCategoryDescription: string
  }
  export interface CategoryResponse {
    categories: Category[]
  }

  const API_URL = "https://www.themealdb.com/api/json/v1/1"

  export const MealDbService = {
    async getRandomMeal(): Promise<Meal | null> {
      try {
        const response = await fetch(`${API_URL}/random.php`)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const data: MealResponse = await response.json()
        return data.meals?.[0] || null
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
        const data: MealResponse = await response.json()
        return data.meals || []
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
        const data: MealResponse = await response.json()
        return data.meals?.[0] || null
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
        const data: CategoryResponse = await response.json()
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
        const data: MealResponse = await response.json()
        return data.meals || []
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
        const data: MealResponse = await response.json()
        return data.meals || []
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
        const data: MealResponse = await response.json()
        return data.meals || []
      } catch (error) {
        console.error("Error filtering by ingredient:", error)
        throw error
      }
    },
  }
