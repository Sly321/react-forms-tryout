import * as React from "react"
import { Field, Form, FieldRenderProps } from "react-final-form"
import Input from "./Input"
import ISBNValidator from "./validation/ISBNValidator"
import RequiredValidator from "./validation/RequiredValidator"
import Valdiation, { composeValidators } from "./validation/Validation"
import MinValidator from "./validation/MinValidator"
import MaxValidator from "./validation/MaxValidator"
import WenigerAlsBuecherValidator from "./validation/WenigerAlsBuecherValidator"

export interface Props {
	children?: React.ReactNode
	debug?: boolean
}

export interface State {
}

const reqValidation = new Valdiation(RequiredValidator)
const isbnValidation = new Valdiation(RequiredValidator, ISBNValidator)
//const anzahlBuecherValidator = new Valdiation(RequiredValidator, new MinValidator(3), new MaxValidator(10))
//const required = (value: string) => (value ? undefined : true);

function fieldRenderToInputProps(props: FieldRenderProps) {
	const { input: { onBlur, onFocus, onChange, value, name }, meta: { invalid, error, touched, active } } = props
	return { invalid, error, touched, active, onBlur, onFocus, onChange, value, name }
}

export default class BookStoreForm extends React.Component<Props, State> {
	private handleSubmit() {
	}

	private debug(component: React.ReactNode) {
		return this.props.debug && component
	}

	render() {
		return <Form
			onSubmit={this.handleSubmit}
			initialValues={{}}
			render={({ handleSubmit, submitting, values, pristine, reset }) => (
				<form onSubmit={handleSubmit}>
					<h1>Buchbestellung</h1>
					<hr />
					<div className="section-container">
						<section>
							<h2>Angaben zur Person</h2>
							<hr />
							<Field
								name="vorname"
								validate={reqValidation.validate.bind(reqValidation)}
								render={({ input, meta }) => (<>
									<Input id="vorname" label="Vorname" {...fieldRenderToInputProps({ input, meta })} />
									{this.debug(<pre>{JSON.stringify(meta, null, 2)}</pre>)}
								</>)}
							/>
							<Field
								name="nachname"
								validate={(val) => reqValidation.validate(val)}
								render={({ input, meta }) => (<>
									<Input id="nachname" label="Nachname" {...fieldRenderToInputProps({ input, meta })} />
									{this.debug(<pre>{JSON.stringify(meta, null, 2)}</pre>)}
								</>)}
							/>
						</section>

						<section>
							<h2>Angaben zum Buch</h2>
							<hr />
							<Field
								name="anzahlBuecher"
								validate={(val) => composeValidators(RequiredValidator, new MinValidator(3), new MaxValidator(10))(val)}
								render={({ input, meta }) => (<>
									<Input id="anzahl-buecher" label="Anzahl der Bücher" {...fieldRenderToInputProps({ input, meta })} />
									{this.debug(<pre>{JSON.stringify(meta, null, 2)}</pre>)}
								</>)}
							/>
							<Field
								name="anzahlCover"
								validate={(val, allValue) => {
									console.debug(`val, allVal`, val, allValue)
									return composeValidators(RequiredValidator, WenigerAlsBuecherValidator)(val, allValue)
								}
								}
								render={({ input, meta }) => (<>
									<Input id="anzahl-buecher-cover" label="Anzahl der Cover" {...fieldRenderToInputProps({ input, meta })} />
									{this.debug(<pre>{JSON.stringify(meta, null, 2)}</pre>)}
								</>)}
							/>
							<Field
								name="isbnNummer"
								validate={(val) => isbnValidation.validate(val)}
								render={({ input, meta }) => {
									return (<>
										<Input id="isbn-nummer" label="ISBN-Nummer" {...fieldRenderToInputProps({ input, meta })} />
										{this.debug(<pre>{JSON.stringify(meta, null, 2)}</pre>)}
									</>)
								}}
							/>
						</section>
					</div>
					<div className="button-container">
						<button type="button" disabled={submitting || pristine} onClick={reset}>Formular leeren</button>
						<button disabled={submitting}>Bestellen</button>
					</div>
					<pre>{JSON.stringify(values, null, 2)}</pre>
				</form>
			)}
		>
		</Form>
	}
}