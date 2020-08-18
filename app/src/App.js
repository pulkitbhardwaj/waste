import React from 'react'
import { createUseStyles, ThemeProvider } from 'react-jss'
import PrimaryButton from './components/Button/PrimaryButton'

const useStyles = createUseStyles({
	app: {
		//
	}
})

const App = () => {
	const styles = useStyles()

	return (
		<ThemeProvider theme={theme}>
			<div className={styles.app}>
				<PrimaryButton>MyButton</PrimaryButton>
			</div>
		</ThemeProvider>
	)
}

export default App
