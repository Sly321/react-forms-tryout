import Validator from "./Validator"

const ISBNValidator: Validator = {
	validate: (value: string) => {
		if (value.length === 13) {
			return null
		}
		return "Die ISBJ Nummer ist im falschen Format."
	}
}

export default ISBNValidator