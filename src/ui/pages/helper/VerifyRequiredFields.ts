function VerifyRequiredFields(fields: string[], values: any[]) {
	for (let value of values) {
		for (let Key of fields) {
			if (
				value[Key] === "" ||
				value[Key] === null ||
				value[Key] === undefined
			) {
				return false;
			}
		}
	}
	return true;
}

export default VerifyRequiredFields;
