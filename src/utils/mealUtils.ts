// utils/mealUtils.ts
export const extractIngredients = (mealData: any): string[] => {
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
  return ingredients
}
