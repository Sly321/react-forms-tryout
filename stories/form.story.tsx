import { storiesOf } from "@storybook/react"
import * as React from "react"
import BookStoreForm from "../src/BookStoreForm"
import "./bookstore.less"
import { boolean, withKnobs } from "@storybook/addon-knobs"

storiesOf("Forms|BookStore", module)
	.addDecorator(withKnobs)
	.add("First", () => <BookStoreForm debug={boolean("Debug", false)} />)