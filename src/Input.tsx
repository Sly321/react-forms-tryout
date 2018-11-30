import * as React from "react"

type ErrorFunction = (label: string) => string;

export interface Props {
	label: string,
	id: string,
	value: string,
	invalid?: boolean
	error?: string | ErrorFunction
	touched?: boolean
	active?: boolean
	onChange(value: string): void
	onFocus?(): void
	onBlur?(): void
}

export interface State {
}

export default class Input extends React.Component<Props, State> {
	private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.props.onChange(event.target.value)
	}

	render() {
		const { label, id, value, error, touched, onFocus, onBlur } = this.props
		return <>
			<label htmlFor={id}>
				{label}
			</label>
			<input
				autoComplete="off"
				id={id}
				className={this.className}
				value={value}
				onChange={this.handleChange}
				onFocus={() => onFocus && onFocus()}
				onBlur={() => onBlur && onBlur()}
			/>
			{touched && error && <small>{this.error}</small>}
		</>
	}

	private get error(): string {
		const { error, label } = this.props
		if (error) {
			if (Array.isArray(error)) {
				// nur den ersten
				return (typeof error[0] === "function" ? error[0](label) : error[0])
				//return error.reduce((r, e) => r + (typeof e === "function" ? e(label) : e), "")
			}

			if (typeof error === "string") {
				return error
			}
		}
		return ""
	}

	private get className(): string {
		const classNames: Array<string> = []
		const { touched, invalid, active } = this.props

		if (touched && (invalid && !active)) {
			classNames.push("invalid")
		}

		return classNames.join(" ")
	}
}