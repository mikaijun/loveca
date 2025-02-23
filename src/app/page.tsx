import { Box, Container, Text } from '@radix-ui/themes'
import { ManagerTabs } from '@templates/ManagerTabs/ManagerTabs'
import { colors } from '@constants/colors'

export default function MyApp() {
  return (
    <>
      <Box
        height="44px"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.blue[9],
        }}
        width="100%"
      >
        <Text size="2" style={{ color: colors.white }}>
          ラブカハートカウンター
        </Text>
      </Box>
      <Container p="8px" size="2">
        <ManagerTabs />
      </Container>
    </>
  )
}
