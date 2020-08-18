import React from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles(theme => ({
	button: variant => ({
		...variant.button
	})
}))

const BaseButton = ({
	variant,
	onClick,
	onHover,
	onFocus,
	renderLeading,
	renderTrailing,
	children,
	...props
}) => {
	const styles = useStyles(variant)

	return (
		<button
			type="button"
			className={styles.button}
			onClick={onClick}
			onFocus={onFocus}
			onMouseOver={onHover}
			{...props}>
			<span>{renderLeading}</span>
			{children}
			<span>{renderTrailing}</span>
		</button>
	)
}

export default BaseButton
