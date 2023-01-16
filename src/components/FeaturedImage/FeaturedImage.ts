import { LitElement, css, html } from "lit-element/lit-element.js";
import { customElement, property } from "lit/decorators.js";

const tagName = "featured-image";

@customElement(tagName)
class FeaturedImage extends LitElement {
	@property() alt?: string = "";
	@property() fullHeight?: boolean = false;
	@property() src?: string = "";
	@property() visible?: boolean = true;

	static styles = css`
		.image {
			height: 100%;
			object-fit: cover;
			object-position: center;
			width: 100%;
		}

		.wrapper {
			height: min(75vh, calc(100vw * 9 / 16));
			position: relative;
			width: 100%;
		}

		.fullWrapper {
			height: auto;
		}

		.fullWrapper .image {
			height: auto;
		}
	`;

	render() {
		if (!this.visible || !this.src) return null;

		return html`
			<div class="${this.fullHeight ? "fullWrapper" : "wrapper"}">
				<img
					alt="${this.alt}"
					class="image"
					src="${this.src}"
				/>
			</div>
		`;
	}
}

customElements.define(tagName, FeaturedImage);

export { FeaturedImage };
