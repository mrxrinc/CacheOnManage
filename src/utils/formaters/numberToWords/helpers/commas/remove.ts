
const removeCommas = (number?: string | number): number | undefined => {
	if (!number) return;

	let result = "" + number;
	if (result.indexOf(",") !== -1) {
		result = result.replace(/,\s?/g, "");
	}

	return parseInt(result, 10);
};

export default removeCommas;