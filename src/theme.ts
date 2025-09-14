import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const config = defineConfig({})

const system = createSystem(defaultConfig, config)

export { system }
