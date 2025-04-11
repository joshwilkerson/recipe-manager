import { useState, useEffect } from "react"
import {
  Button,
  SimpleGrid,
  Title,
  Loader,
  Alert,
  Group,
  Container,
  Center,
} from "@mantine/core"
import { getMealByArea } from "../../api"
import type { Meal } from "../../types"
import { getSpacingUnit } from "../../functions/getSpacingUnit"
import { FeaturedRecipesCard } from "../featured_recipes/card"
import styles from "./AreaList.module.css"

const INITIAL_DISPLAY_COUNT = 4

const AREAS = [
  "American",
  "British",
  "Canadian",
  "Chinese",
  "Croatian",
  "Dutch",
  "Egyptian",
  "French",
  "Greek",
  "Indian",
  "Irish",
  "Italian",
  "Jamaican",
  "Japanese",
  "Kenyan",
  "Malaysian",
  "Mexican",
  "Moroccan",
  "Polish",
  "Portuguese",
  "Russian",
  "Spanish",
  "Thai",
  "Tunisian",
  "Turkish",
  "Unknown",
  "Vietnamese",
] as const

type Area = (typeof AREAS)[number]

export const AreaList = () => {
  const [selectedArea, setSelectedArea] = useState<Area | "">("")
  const [meals, setMeals] = useState<Meal[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY_COUNT)

  useEffect(() => {
    const fetchMeals = async () => {
      if (!selectedArea) return

      setLoading(true)
      setError(null)
      try {
        const fetchedMeals = await getMealByArea(selectedArea)
        setMeals(fetchedMeals)
      } catch (error) {
        setError("Error loading meals. Please try again.")
        console.error("Error fetching meals:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMeals()
    setDisplayCount(INITIAL_DISPLAY_COUNT)
  }, [selectedArea])

  const handleAreaSelect = (area: Area) => {
    setSelectedArea(area)
  }

  const handleViewMore = () => {
    setDisplayCount(meals.length)
  }
  const handleClearArea = () => {
    setSelectedArea("")
    setMeals([])
    setDisplayCount(INITIAL_DISPLAY_COUNT)
  }

  const displayedMeals = meals.slice(0, displayCount)
  const hasMoreMeals = meals.length > displayCount

  return (
    <Container size="xl" className={styles.areaContainer}>
      <section className={styles.areaSection}>
        <Title order={2} className={styles.sectionTitle}>
          Browse by Area
        </Title>

        <Group gap="xs" className={styles.areaButtons}>
          {AREAS.map((area) => (
            <Button
              key={area}
              variant={selectedArea === area ? "filled" : "outline"}
              onClick={() => handleAreaSelect(area)}
              className={styles.areaButton}
            >
              {area}
            </Button>
          ))}

          <Button
            variant="outline"
            onClick={handleClearArea}
            className={styles.clearButton}
          >
            Clear
          </Button>
        </Group>
      </section>

      {selectedArea && (
        <section className={styles.mealsSection}>
          <Title order={3} className={styles.sectionTitle}>
            {selectedArea} Recipes
          </Title>

          {error && (
            <Alert variant="light" color="red" title="Something went wrong">
              {error}
            </Alert>
          )}

          {loading ? (
            <div className={styles.loadingContainer}>
              <Loader size="xl" />
            </div>
          ) : (
            <>
              <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
                {displayedMeals.map((meal) => (
                  <FeaturedRecipesCard
                    key={meal.id}
                    id={meal.id}
                    imageUrl={meal.thumbnail}
                    title={meal.title}
                    description=""
                    isLoading={false}
                  />
                ))}
              </SimpleGrid>

              {hasMoreMeals && (
                <Center mt={getSpacingUnit(3)}>
                  <Button onClick={handleViewMore} variant="outline" size="md">
                    View More {selectedArea} Recipes
                  </Button>
                </Center>
              )}
            </>
          )}
        </section>
      )}
    </Container>
  )
}
