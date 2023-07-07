import { LitElement, css, html } from "lit-element/lit-element.js";
import { customElement, property } from "lit/decorators.js";

const tagName = "featured-image";

@customElement(tagName)
class FeaturedImage extends LitElement {
	@property() alt?: string = "";
	@property() fullHeight?: boolean = false;
	@property() src?: string = "";
	@property() visible?: boolean = true;
	@property() crop?: string = "Center";

	static styles = css`
		.image {
			height: 100%;
			object-fit: cover;
			width: 100%;
		}

		.centerCrop {
			object-position: center;
		}

		.topCrop {
			object-position: center top;
		}

		.bottomCrop {
			object-position: center bottom;
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

		let cropClass = "centerCrop";

		switch (this.crop) {
			case "Top":
				cropClass = "topCrop";
				break;

			case "Bottom":
				cropClass = "bottomCrop";
				break;
		}

		return html`
			<div class="${this.fullHeight ? "fullWrapper" : "wrapper"}">
				<img
					alt="${this.alt}"
					class="image ${cropClass}"
					src="${this.src}"
				/>
			</div>
		`;
	}
}

customElements.define(tagName, FeaturedImage);

export { FeaturedImage };
