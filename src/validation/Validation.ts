import Validator from "./Validator"

export default class Valdiation {
	private validations: Array<Validator>

	constructor(...args: Array<Validator>) {
		this.validations = args
	}

	public add(...args: Array<Validator>) {
		this.validations = this.validations.concat(...args)
	}

	public validate(value: string) {
		const res = this.validations.reduce((prev: Array<string | ((label: string) => string)>, curr) => {
			const validationResult = curr.validate(value)
			return validationResult ? prev.concat(validationResult) : prev
		}, [])

		console.debug(res)

		return res.length === 0 ? false : res
	}
}

export const composeValidators = (...validators: Array<Validator>) => (value: string) =>
	validators.reduce((error, validator) => error || validator.validate(value), undefined);