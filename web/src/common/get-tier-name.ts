export const getTierName = (position: number, isLast?: boolean): string => {
	if (position === 1) {
		return 'ÜBER-PREDATOR'
	}
	if (position <= 6) {
		return 'FLESH-EATING'
	}

	if (position <= 11) {
		return 'GRASS-FEEDING'
	}

	if (isLast) {
		return 'ÜBER-VEGETABLE'
	}
	
	return 'VEGETABLE'
}