import * as React from "react"
import { Field, Form, FieldRenderProps } from "react-final-form"
import Input from "./Input"
import ISBNValidator from "./validation/ISBNValidator"
import RequiredValidator from "./validation/RequiredValidator"
import Valdiation from "./validation/Validation"

export interface Props {
	children?: React.ReactNode
}

export interface State {
}

const reqValidation = new Valdiation(RequiredValidator)
const isbnValidation = new Valdiation(RequiredValidator, ISBNValidator)
//const required = (value: string) => (value ? undefined : true);

function fieldRenderToInputProps(props: FieldRenderProps) {
	const { input: { onBlur, onFocus, onChange, value, name }, meta: { invalid, error, touched, active } } = props
	return { invalid, error, touched, active, onBlur, onFocus, onChange, value, name }
}

export default class BookStoreForm extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
		}
	}

	private handleSubmit() {
	}

	render() {
		return <Form
			onSubmit={this.handleSubmit}
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
								validate={(val) => reqValidation.validate(val)}
								render={({ input, meta }) => (<>
									<Input id="vorname" label="Vorname" {...fieldRenderToInputProps({ input, meta })} />
									<pre>{JSON.stringify(meta, null, 2)}</pre>
								</>)}
							/>
							<Field
								name="nachname"
								validate={(val) => reqValidation.validate(val)}
								render={({ input, meta }) => (<>
									<Input id="nachname" label="Nachname" {...fieldRenderToInputProps({ input, meta })} />
									<pre>{JSON.stringify(meta, null, 2)}</pre>
								</>)}
							/>
						</section>

						<section>
							<h2>Angaben zum Buch</h2>
							<hr />
							<Field
								name="isbnNummer"
								validate={(val) => isbnValidation.validate(val)}
								render={({ input, meta }) => (<>
									<Input id="isbn-nummer" label="ISBN-Nummer" {...fieldRenderToInputProps({ input, meta })} />
									<pre>{JSON.stringify(meta, null, 2)}</pre>
								</>)}
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