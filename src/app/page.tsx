import { Box, Container, Text } from '@radix-ui/themes'
import { ColorfulManager } from '@organism/ColorfulManager'
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
        <ColorfulManager />
        <Text as="p" color="gray" mt="8px" size="1">
          ※ALLハート持ちメンバーは好きな色を選択してください
        </Text>
      </Container>
    </>
  )
}
