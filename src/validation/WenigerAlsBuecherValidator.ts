import Validator from "./Validator"

const WenigerAlsBuecherValidator: Validator = {
	validate: (value: string, allValue: any) => {
		const numericValue = parseInt(value);

		const { anzahlBuecher } = allValue
		const numericValueAnzahlBuecher = parseInt(anzahlBuecher);

		if (isNaN(numericValue) || isNaN(numericValueAnzahlBuecher) || numericValue <= numericValueAnzahlBuecher) {
			return null
		}

		return `Es sollten nicht mehr Cover bestellt werden die ${numericValueAnzahlBuecher} Bücher.`
	}
}

export default WenigerAlsBuecherValidator