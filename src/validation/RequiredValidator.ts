import Validator from "./Validator"

const RequiredValidator: Validator = {
	validate: (value: string) => (value ? undefined : (label: string) => `Bitte das Feld ${label} ausfüllen.`)
}

export default RequiredValidator