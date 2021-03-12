export const getTierName = (position: number): string => {
	if (position <= 5) {
		return 'FLESH-EATING'
	}

	if (position <= 10) {
		return 'GRASS-FEEDING'
	}

	return 'VEGETABLE'
}