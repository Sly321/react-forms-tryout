import * as React from "react"
import Input from "./Input"
import { Form, Field } from "react-final-form"
import Valdiation, { composeValidators } from "./validation/Validation"
import RequiredValidator from "./validation/RequiredValidator"
import ISBNValidator from "./validation/ISBNValidator"

export interface Props {
	children?: React.ReactNode
}

export interface State {
}

const reqValidation = new Valdiation(RequiredValidator)
//const required = (value: string) => (value ? undefined : true);

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
			validateOnBlur
			render={({ handleSubmit, submitting, values, }) => (
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
									<Input
										id="vorname"
										label="Vorname"
										onChange={input.onChange}
										value={input.value}
										invalid={meta.invalid}
										error={meta.error}
										touched={meta.touched}
									/>
									<pre>{JSON.stringify(meta, null, 2)}</pre>
								</>)}
							/>
							<Field
								name="nachname"
								validate={(val) => reqValidation.validate(val)}
								render={({ input, meta }) => (<>
									<Input
										id="nachname"
										label="Nachname"
										onChange={input.onChange}
										value={input.value}
										invalid={meta.invalid}
										error={meta.error}
										touched={meta.touched}
									/>
									<pre>{JSON.stringify(meta, null, 2)}</pre>
								</>)}
							/>
						</section>

						<section>
							<h2>Angaben zum Buch</h2>
							<hr />
							<Field
								name="isbjNummer"
								validate={(val) => composeValidators(RequiredValidator, ISBNValidator)(val)}
								render={({ input, meta }) => (<>
									<Input
										id="isbj-nummer"
										label="ISBJ-Nummer"
										onChange={input.onChange}
										value={input.value}
										invalid={meta.invalid}
										error={meta.error}
										touched={meta.touched}
									/>
									<pre>{JSON.stringify(meta, null, 2)}</pre>
								</>)}
							/>
						</section>
					</div>
					<button type="submit" disabled={submitting}>
						Bestellen
              		</button>
					<pre>{JSON.stringify(values, null, 2)}</pre>
				</form>
			)}
		>
		</Form>
	}
}