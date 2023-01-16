import { LitElement, html, css } from "lit-element/lit-element.js";
import { customElement, property } from "lit/decorators.js";

const tagName = "my-footer";

@customElement(tagName)
class Footer extends LitElement {
	static styles = css`
		.footer {
			margin: 4em 1em;
			text-align: center;
		}
	`;

	getCopyrightYears() {
		const date = new Date();
		const year = date.getFullYear();

		if (year === 2021) {
			return "2021";
		}

		return `2021–${year}`;
	}

	render() {
		return html`
			<footer class="footer">
				Copyright © ${this.getCopyrightYears()} Thaovi Nguyen
			</footer>
		`;
	}
}

customElements.define(tagName, Footer);

export { Footer };
