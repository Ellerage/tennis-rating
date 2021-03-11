import TextField from '@material-ui/core/TextField'
import React, { ReactElement, useState } from 'react'

interface Props {
    label?: string
	style?: React.CSSProperties
	onChangeText?: (text: string) => void
}

export const Input = ({label, style, onChangeText}: Props): ReactElement => {
	const [isFocused, setIsFocused] = useState(false)
    
	return (
		<TextField
			onFocus={() => setIsFocused(true)}
			onBlur={() => setIsFocused(false)}
			id="filled-basic"
			label={label}
			variant="outlined"
			autoCapitalize="none"
			onChange={(event) => onChangeText && onChangeText(event.target.value)}
			autoComplete="none"
			color={isFocused ? 'secondary' : 'primary'}
			size="medium"
			style={{ width: '340px', color: 'white', ...style }}
			InputProps={{
				style: {
					color: 'white',
					border: isFocused ? 'none' : '1px solid white'
				}
			}}
			InputLabelProps={{
				style: {
					color: isFocused ? '#F51010' : 'white',
					paddingLeft: '5px',
					paddingRight: '7px',
					backgroundColor: '#323232',
				}
			}}
		/>
	)
}