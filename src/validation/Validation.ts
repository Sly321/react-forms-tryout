import Validator from "./Validator"

/**
 * Class Implementation for a Validation
 *
 * @export
 * @class Valdiation
 */
export default class Valdiation {
	private validations: Array<Validator>

	constructor(...args: Array<Validator>) {
		this.validations = args
	}

	/**
	 * Never used so far.
	 *
	 * @param {...Array<Validator>} args
	 * @memberof Valdiation
	 */
	public add(...args: Array<Validator>) {
		this.validations = this.validations.concat(...args)
	}

	public validate(value: string) {
		const res = this.validations.reduce((prev: Array<string | ((label: string) => string)>, curr) => {
			const validationResult = curr.validate(value)
			return validationResult ? prev.concat(validationResult) : prev
		}, [])

		return res.length === 0 ? false : res
	}
}


export const composeValidators = (...validators: Array<Validator>) =>
	(value: string, allValue?: any) =>
		validators.reduce((error, validator) =>
			error || validator.validate(value, allValue), undefined);