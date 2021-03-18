export const getTierColor = (position: number, isLast?: boolean): string => {
	if (position === 1) {
		return '#F51010'
	}

	if (position <= 6) {
		return '#ff5609'
	}

	if (position <= 11) {
		return '#ffcd01'
	}

	if (isLast) {
		return '#3cbf38'
	}

	return '#89c541'
}