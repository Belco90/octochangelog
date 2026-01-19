// eslint-disable-next-line no-restricted-imports
import { test as baseTest, mergeTests } from '@playwright/test'
import { test as happoTest } from 'happo/playwright'

export const test = mergeTests(baseTest, happoTest)
