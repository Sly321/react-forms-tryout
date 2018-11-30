import { storiesOf } from "@storybook/react"
import * as React from "react"
import BookStoreForm from "../src/BookStoreForm"
import "./bookstore.less"

storiesOf("Forms|BookStore", module)
	.add("First", () => <BookStoreForm />)