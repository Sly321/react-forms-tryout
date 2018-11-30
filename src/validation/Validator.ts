export default interface Validator {
	validate(value: string): null | undefined | ((label: string) => string) | string
}