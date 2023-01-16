import { LitElement, css, html } from "lit-element/lit-element.js";
import { property, state } from "lit/decorators.js";

const tagName = "my-gallery";

class Gallery extends LitElement {
	@property() images: {
		alt?: string;
		caption?: string;
		src: string;
	}[] = [];

	@state() _feature?: HTMLElement;
	@state() _featureImage?: HTMLImageElement;
	@state() _featureCaption?: HTMLElement;
	@state() _visible: boolean = false;

	static properties = {
		images: {
			type: Array,
		},
		_visible: {
			type: Boolean,
			state: true,
		},
	};

	static styles = css`
		.feature-caption {
			color: #fff;
			font-size: 1em;
			font: inherit;
			padding-top: 1em;
		}

		.feature-caption:empty {
			padding-top: 0;
		}

		.feature-image {
			height: 100%;
			object-fit: contain;
			object-position: center;
			width: 100%;
		}

		.feature-figure {
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			height: 100%;
			left: 0;
			margin: 0;
			padding: 2em;
			position: absolute;
			top: 0;
			width: 100%;
			z-index: 2;
		}

		.feature-bg {
			appearance: none;
			background-color: rgba(0, 0, 0, 0.8);
			border: 0;
			cursor: pointer;
			height: 100%;
			left: 0;
			position: absolute;
			top: 0;
			width: 100%;
			z-index: 1;
		}

		.feature {
			height: 100%;
			left: 0;
			opacity: 0;
			position: fixed;
			top: 0;
			transition: 0.25s opactiy, 0.25s visibility;
			width: 100%;
			visibility: hidden;
			z-index: 3;
		}

		.grid-caption {
			margin-top: 0.5rem;
			font-size: 0.9em;
			text-align: center;
		}

		.grid-image {
			width: 100%;
		}

		.grid-figure {
			margin: 0;
			width: 100%;
		}

		.grid {
			display: grid;
			gap: 2em;
			grid-template-columns: 1fr;
			margin: 4em auto;
			max-width: 700px;
		}

		@media (min-width: 768px) {
			.feature[data-visible="true"] {
				opacity: 1;
				visibility: visible;
			}

			.grid-caption {
				display: none;
			}

			.grid-image {
				cursor: pointer;
				height: 100%;
				object-fit: cover;
				object-position: center;
				width: 100%;
			}

			.grid-figure {
				display: flex;
			}

			.grid {
				grid-template-columns: repeat(3, 1fr);
			}
		}
	`;

	private _toggleFeature = (e: Event) => {
		if (!this._feature) return;

		const ct = e.currentTarget as HTMLElement;
		const alt = ct.getAttribute("alt") ?? "";
		const src = ct.getAttribute("src") ?? "";
		const caption = ct.dataset.caption ?? "";

		if (this._visible) {
			this._feature.setAttribute("data-visible", "false");
			this._visible = false;
		} else {
			if (this._featureCaption) {
				this._featureCaption.innerText = caption;
			}

			if (this._featureImage) {
				this._featureImage.setAttribute("alt", alt);
				this._featureImage.setAttribute("src", src);
			}

			this._feature.setAttribute("data-visible", "true");
			this._visible = true;
		}
	};

	connectedCallback() {
		super.connectedCallback();

		const feature = this.shadowRoot?.querySelector(".feature");
		if (feature) this._feature = feature as HTMLElement;
		const featureImage = this.shadowRoot?.querySelector(".feature-image");
		if (featureImage) this._featureImage = featureImage as HTMLImageElement;
		const featureCaption = this.shadowRoot?.querySelector(".feature-caption");
		if (featureCaption) this._featureCaption = featureCaption as HTMLElement;

		this.shadowRoot?.querySelectorAll(".feature-bg, .grid-image").forEach((el) => {
			el.addEventListener("click", this._toggleFeature);
		});
	}

	disconnectedCallback() {
		this.shadowRoot?.querySelectorAll(".feature-bg, .grid-image").forEach((el) => {
			el.removeEventListener("click", this._toggleFeature);
		});

		super.disconnectedCallback();
	}

	constructor() {
		super();

		this._toggleFeature = this._toggleFeature.bind(this);
	}

	render() {
		return html`
			<div class="feature">
				<button
					aria-label="Hide image"
					class="feature-bg"
				/>

				<figure class="feature-figure">
					<img
						alt=""
						class="feature-image"
						src=""
					/>

					<figcaption class="feature-caption" />
				</figure>
			</div>

			<div class="grid">
				${this.images.map((image, i) => html`
					<figure class="grid-figure">
						<img
							alt="${image.alt ?? ""}"
							class="grid-image"
							data-caption="${image.caption ?? ""}"
							src="${image.src}"
						/>

						${image.caption ? html`
							<figcaption class="grid-caption">
								${image.caption}
							</figcaption>
						` : null}
					</figure>
				`)}
			</div>
		`;
	}
}

customElements.define(tagName, Gallery);

export { Gallery };
