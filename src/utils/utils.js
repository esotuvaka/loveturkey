const calcRotation = (lat1, lon1, lat2, lon2) => {
	const latDeg1 = lat1 * (Math.PI / 180);
	const latDeg2 = lat2 * (Math.PI / 180);
	const lonDeg1 = lon1 * (Math.PI / 180);
	const lonDeg2 = lon2 * (Math.PI / 180);

	const x = Math.sin(lonDeg2 - lonDeg1) * Math.cos(latDeg2);
	const y =
		Math.cos(latDeg1) * Math.sin(latDeg2) -
		Math.sin(latDeg1) * Math.cos(latDeg2) * Math.cos(latDeg2 - latDeg1);
	const theta = Math.atan2(y, x);

	return (theta + 2 * Math.PI) % (2 * Math.PI);
};
