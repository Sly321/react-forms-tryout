import Validator from "./Validator"

export default class MaxValidator implements Validator {

	constructor(private max: number) { }

	public validate(value: string) {
		const numericValue = parseInt(value)

		if (isNaN(numericValue) || numericValue < this.max) {
			return null
		}

		return `Der Wert darf maximal ${this.max} sein.`
	}
}