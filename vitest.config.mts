import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig, coverageConfigDefaults } from 'vitest/config'

export default defineConfig({
	plugins: [tsconfigPaths(), react()],
	test: {
		clearMocks: true,
		setupFiles: ['src/vitest.setup.ts'],
		coverage: {
			include: ['src/**'],
			exclude: [
				'src/fixtures/**',
				'src/mocks/**',
				...coverageConfigDefaults.exclude,
			],
		},
	},
})
