import { LitElement, css, html } from "lit-element/lit-element.js";

const tagName = "my-page";

class Page extends LitElement {
	static styles = css`
		.header {
			font-size: 2em;
			margin: 2em auto;
			text-align: center;
			text-transform: uppercase;
		}
	`;

	render() {
		return html`
			<div class="header">
				<slot name="header" />
			</div>

			<slot />
		`;
	}
}

customElements.define(tagName, Page);

export { Page };
