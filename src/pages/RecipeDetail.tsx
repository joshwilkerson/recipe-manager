import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { modals } from "@mantine/modals"
import { notifications } from "@mantine/notifications"
import {
  Container,
  Text,
  Title,
  Image,
  Loader,
  Box,
  List,
  Button,
} from "@mantine/core"
import { FaDownload } from "react-icons/fa6"
import { getMealById } from "../api"
import type { Meal } from "../types"
import { jsPDF } from "jspdf"

export const RecipeDetail = () => {
  const { id } = useParams()
  const [meal, setMeal] = useState<Meal | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const generateAndDownloadPDF = async () => {
    if (!meal) return

    try {
      notifications.show({
        id: "download-start",
        loading: true,
        title: "Generating PDF",
        message: "Creating your recipe PDF...",
        autoClose: false,
      })

      const doc = new jsPDF()

      doc.setFontSize(16)
      doc.addImage(meal.thumbnail, "JPEG", 100, 40, 90, 70)
      doc.text(`Recipe: ${meal.title}`, 10, 20)

      doc.setFontSize(12)
      doc.text("Ingredients:", 10, 40)
      meal.ingredients.forEach((ingredient, index) => {
        doc.text(`• ${ingredient}`, 15, 50 + index * 7)
      })
      const start = 60 + meal.ingredients.length * 7
      doc.text("Instructions:", 10, start)

      const splitText = doc.splitTextToSize(meal.instructions, 180)
      doc.text(splitText, 15, start + 10)

      doc.save(`${meal.title}-recipe.pdf`)

      notifications.update({
        id: "download-start",
        color: "green",
        title: "Success",
        message: "PDF downloaded successfully",
        autoClose: 2000,
      })
    } catch (error) {
      console.error("PDF generation failed:", error)
      notifications.update({
        id: "download-error",
        color: "red",
        title: "Error",
        message: "Failed to generate PDF",
        autoClose: 2000,
      })
    }
  }

  const handleDownloadClick = () => {
    if (!meal) {
      notifications.show({
        color: "red",
        title: "Error",
        message: "No recipe data available",
      })
      return
    }

    modals.openConfirmModal({
      title: `Download ${meal.title} Recipe`,
      children: (
        <Text size="sm">Would you like to download this recipe as a PDF?</Text>
      ),
      labels: { confirm: "Yes, Download", cancel: "Cancel" },
      onConfirm: generateAndDownloadPDF,
    })
  }

  const fetchMeal = async () => {
    if (!id) return

    try {
      setIsLoading(true)
      const mealData = await getMealById(id)
      setMeal(mealData)
    } catch (error) {
      setError("Failed to load recipe details.")
      console.error("Error fetching meal:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMeal()
  }, [id])

  return (
    <Container>
      {isLoading ? (
        <Box
          style={{ display: "flex", justifyContent: "center", padding: "2rem" }}
        >
          <Loader size="xl" />
        </Box>
      ) : (
        <>
          {error || !meal ? (
            <Text c="red" size="lg" ta="center">
              {error || "Recipe not found"}
            </Text>
          ) : (
            <>
              <Title order={1} mb="md">
                {meal.title}
              </Title>
              <Box mb="xl">
                <Image src={meal.thumbnail} alt={meal.title} radius="md" />
              </Box>

              <Title order={2} mb="md">
                Ingredients:
              </Title>
              <List mb="xl">
                {meal.ingredients.map((ingredient, index) => (
                  <List.Item key={index}>{ingredient}</List.Item>
                ))}
              </List>

              <Title order={2} mb="md">
                Instructions:
              </Title>
              <Text>{meal.instructions}</Text>

              <Button
                leftSection={<FaDownload />}
                onClick={handleDownloadClick}
                mt="xl"
              >
                Download Recipe
              </Button>
            </>
          )}
        </>
      )}
    </Container>
  )
}
