import Validator from "./Validator"

export default class MinValidator implements Validator {

	constructor(private min: number) { }

	public validate(value: string) {
		const numericValue = parseInt(value)

		if (isNaN(numericValue) || numericValue >= this.min) {
			return null
		}

		return `Der Wert muss mindestens ${this.min} sein.`
	}
}