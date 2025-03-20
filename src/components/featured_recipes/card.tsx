import { useNavigate } from "react-router-dom"
import {
  Card,
  Image,
  Text,
  Button,
  Group,
  Flex,
  Skeleton,
  Box,
} from "@mantine/core"
import { getSpacingUnit } from "../../functions/getSpacingUnit"

export const FeaturedRecipesCard = ({
  description,
  id,
  imageUrl,
  isLoading = true,
  title,
}: {
  description: string
  id: string
  imageUrl: string
  isLoading: boolean
  title: string
}) => {
  const navigate = useNavigate()

  const handleViewRecipe = () => {
    navigate(`/recipe/${id}`)
  }

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder w="100%">
      <Card.Section>
        {isLoading ? (
          <Skeleton height={160} w={600} />
        ) : (
          <Image src={imageUrl} height={160} alt={title} />
        )}
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        {isLoading ? (
          <Skeleton height={16} radius="xl" />
        ) : (
          <Box w="100%">
            <Text fw={500} truncate="end">
              {title}
            </Text>
          </Box>
        )}
      </Group>

      {isLoading ? (
        <>
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} height={8} mt={6} radius="xl" />
          ))}
        </>
      ) : (
        <Text size="sm" c="dimmed">
          {description}
        </Text>
      )}

      <Flex justify="flex-start" align="flex-start" mt={getSpacingUnit(2)}>
        <Button
          color="blue"
          size="sm"
          radius="sm"
          onClick={handleViewRecipe}
          disabled={isLoading}
        >
          View recipe
        </Button>
      </Flex>
    </Card>
  )
}
