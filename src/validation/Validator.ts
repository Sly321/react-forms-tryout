export default interface Validator {
	validate(value: string, allValues?: any): null | undefined | ((label: string) => string) | string
}