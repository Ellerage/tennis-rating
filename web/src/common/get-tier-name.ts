export const getTierName = (position: number, isLast: boolean, userRating: number): string => {
	if (position === 1) {
		return 'ÜBER-PREDATOR'
	}

	if (isLast) {
		return 'ÜBER-VEGETABLE'
	}

	if (userRating >= 1200) {
		return 'FLESH-EATING'
	}

	if (userRating >= 900) {
		return 'GRASS-FEEDING'
	}

	
	return 'VEGETABLE'
}