export const getTierColor = (position: number): string => {
	if (position <= 5) {
		return '#F51010'
	}

	if (position <= 10) {
		return '#FFA800'
	}

	return '#fff'
}