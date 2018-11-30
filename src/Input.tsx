import * as React from "react"

type ErrorFunction = (label: string) => string;

export interface Props {
	label: string,
	id: string,
	value: string,
	onChange(value: string): void
	invalid?: boolean
	error?: string | ErrorFunction
	touched?: boolean
}

export interface State {
}

export default class Input extends React.Component<Props, State> {
	private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.props.onChange(event.target.value)
	}

	render() {
		const { label, id, value, error, touched } = this.props
		return <>
			<label htmlFor={id}>
				{label}
			</label>
			<input
				id={id}
				className={this.className}
				value={value}
				onChange={this.handleChange}
			/>
			{touched && error && <small>{this.error}</small>}
		</>
	}

	private get error(): string {
		const { error, label } = this.props
		if (error) {
			if (Array.isArray(error)) {
				return error.reduce((r, e) => r + e(label), "")
			}

			if (typeof error === "string") {
				return error
			}
		}
		return ""
	}

	private get className(): string {
		const classNames: Array<string> = []
		const { touched, invalid } = this.props

		if (touched && invalid) {
			classNames.push("invalid")
		}

		return classNames.join(" ")
	}
}