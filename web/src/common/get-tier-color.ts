export const getTierColor = (position: number, isLast: boolean, userRating: number): string => {
	if (position === 1) {
		return '#F51010'
	}

	if (isLast) {
		return '#3cbf38'
	}

	if (userRating >= 1200) {
		return '#ff5609'
	}

	if (userRating >= 900) {
		return '#ffcd01'
	}



	return '#89c541'
}