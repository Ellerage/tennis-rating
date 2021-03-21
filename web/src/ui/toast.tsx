import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps, Color } from '@material-ui/lab/Alert'
import React, { ReactElement } from 'react'

interface Props {
    isOpen: boolean
    text: string
    onClose: () => void
    color?: Color
}

function Alert(props: AlertProps) {
	return <MuiAlert elevation={6} variant="filled" {...props} />
}

export const Toast = ({isOpen, onClose, text, color}: Props): ReactElement => (
	<Snackbar open={isOpen} autoHideDuration={2000}  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} onClose={onClose}>
		<Alert severity={color || 'success'} onClose={onClose} >
			{text}
		</Alert>
	</Snackbar>
)
