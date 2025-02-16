import { HeartManager } from '@organism/HeartManager'
import { Container } from '@radix-ui/themes'

export default function MyApp() {
  return (
    <Container p="8px" size="2">
      <HeartManager />
    </Container>
  )
}
