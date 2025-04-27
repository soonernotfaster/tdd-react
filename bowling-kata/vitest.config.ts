import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        globals: true,
        environment: 'happy-dom',
        coverage: {
            enabled: false
        },
        sequence: {
            shuffle: true,
            concurrent: true
        },
    },
})