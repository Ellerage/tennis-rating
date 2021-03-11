import React, { ReactElement } from 'react'
import { ButtonBase, BoxProps } from '@material-ui/core'

interface Props {
  text: string;
  props?: BoxProps;
  isActive?: boolean;
  onClick: () => void
}
export const ButtonStyle = ({ text, props, isActive, onClick }: Props): ReactElement => {
	return (
		<ButtonBase
			{...props}
			onClick={onClick}
			style={{
				width: '250px',
				height: '48px',
				color: 'white',
				fontSize: '16px',
				background: '#1A1A1A',
				borderBottom: isActive ? '1px solid red' : 'none',
			}}
		>
			{text}
		</ButtonBase>
	)
}
