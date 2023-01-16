import { LitElement, css, html } from "lit-element/lit-element.js";
import { customElement } from "lit/decorators.js";

const tagName = "my-main";

@customElement(tagName)
class Main extends LitElement {
	static styles = css`
		@media (min-width: 768px) {
			.main {
				padding-top: 84px;
			}
		}
	`;

	render() {
		return html`
			<main class="main">
				<slot />
			</main>
		`;
	}
}

customElements.define(tagName, Main);

export { Main };
