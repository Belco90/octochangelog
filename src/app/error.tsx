'use client'

import type { NextErrorPageProps } from '@/models'

import UIError from './UIError'

import type { FC } from 'react'

const RootErrorPage: FC<NextErrorPageProps> = ({ error, reset }) => {
	return <UIError error={error} reset={reset} />
}

export default RootErrorPage
