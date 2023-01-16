import { LitElement, css, html } from "lit-element/lit-element.js";
import type { PrismicImage } from "types/prismic";
import { property } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { getDate } from "utils/prismic";

const tagName = "post-preview";

class PostPreview extends LitElement {
	@property() date: string = "";
	@property() excerpt: string = "";
	@property() image?: PrismicImage;
	@property() permalink: string = "";
	@property() title: string = "";

	static properties = {
		date: {
			type: String,
		},
		excerpt: {
			type: String,
		},
		image: {
			type: Object,
		},
		permalink: {
			type: String,
		},
		title: {
			type: String,
		},
	};

	static styles = css`
		.button {
			background-color: var(--colors--foreground);
			color: var(--colors--background);
			display: inline-block;
			padding: 0.5em;
			text-decoration: none;
			text-transform: uppercase;
		}

		.excerpt p {
			display: block;
			display: -webkit-box;
			line-height: 1.666;
			max-height: calc(1.666 * 1em * 4);
			margin-top: 0;
			overflow: hidden;
			text-overflow: ellipsis;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 4;
		}

		.excerpt > *:not(:first-child) {
			display: none;
		}

		.title {
			font-size: 2em;
			font-weight: 200;
			padding: 0 2rem;
			text-transform: uppercase;
		}

		.title-link {
			color: inherit;
			text-decoration: none;
		}

		.image {
			height: auto;
			width: 100%;
		}

		.header {
			margin-bottom: 1em;
		}

		.post-preview {
			border-bottom: 1px solid var(--colors--separator);
			margin: 4em auto;
			max-width: 700px;
			padding-bottom: 4em;
		}

		@media (min-width: 768px) {
			.title {
				padding: 0;
			}
		}
	`;

	renderImage() {
		if (!this.image) return null;

		return html`
			<a href="${this.permalink}">
				<img
					alt="${this.image.alt}"
					class="image"
					src="${this.image.url}"
				/>
			</a>
		`;
	}

	render() {
		return html`
			<article class="post-preview">
				${this.renderImage()}

				<header class="header">
					<h1 class="title">
						<a class="title-link" href="${this.permalink}">
							${this.title}
						</a>
					</h1>

					<time datetime="${this.date}">
						${getDate(this.date)}
					</time>
				</header>

				<main>
					<div class="excerpt">${unsafeHTML(this.excerpt)}</div>
				</main>

				<footer>
					<a class="button" href="${this.permalink}">
						Continue reading
					</a>
				</footer>
			</article>
		`;
	}
}

customElements.define(tagName, PostPreview);

export { PostPreview };
