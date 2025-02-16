import { Container } from '@radix-ui/themes'
import { HeartManager } from '@organism/HeartManager'

export default function MyApp() {
  return (
    <Container p="8px" size="2">
      <HeartManager />
    </Container>
  )
}
