import React from 'react'
import { useTheme } from 'react-jss'

// Base Components
import BaseButton from './BaseButton'

export const extend = (Component, variant) => props => {
	const theme = useTheme()
	const variantStyles = variant(theme)
	return (
		<Component variant={variantStyles} {...props}>
			{props.children}
		</Component>
	)
}

export const Button = BaseButton
