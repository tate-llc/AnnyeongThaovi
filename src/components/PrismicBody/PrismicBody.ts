import type {
	AnyPrismicBodySlice,
	PrismicBodyEmbedSlicePrimary,
	PrismicBodyGallerySliceItem,
} from "types/prismic";
import { LitElement, css, html } from "lit-element/lit-element.js";
import * as prismicH from "@prismicio/helpers";
import { property } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

const tagName = "prismic-body";

class PrismicBody extends LitElement {
	@property() body: AnyPrismicBodySlice[] = [];

	static properties = {
		body: {
			type: Array,
		},
	};

	static styles = css`
		.youtube {
			height: 100%;
			left: 0;
			position: absolute;
			top: 0;
			width: 100%;
		}

		.youtube-wrapper {
			height: 0;
			padding-bottom: calc(100% * 9 / 16);
			position: relative;
			width: 100%;
		}

		.tiktok-wrapper {
			text-align: center;
		}

		.embed {
			box-sizing: border-box;
			margin: 4em auto;
			max-width: 1000px;
			padding: 0 2em;
			width: 100%;
		}

		.gallery-image {
			height: 300px;
		}

		.gallery-caption {
			font-size: 0.9em;
			text-align: center;
		}

		.gallery-figure {
			display: flex;
			flex-direction: column;
			gap: 0.5em;
			margin: 0;
		}

		.gallery-list {
			display: flex;
			flex-wrap: nowrap;
			gap: 2em;
			list-style: none;
			margin: 0;
			padding: 0 2em;
		}

		.gallery {
			display: block;
			margin: 4em 0;
			overflow-x: auto;
			overflow-y: hidden;
			width: 100%;
		}

		a {
			color: var(--colors--link);
		}

		h2, h3, h4, p, ul, ol {
			margin-left: auto;
			margin-right: auto;
			max-width: 700px;
		}

		p, ul, ol {
			line-height: 1.666;
		}

		ul, ol {
			box-sizing: border-box;
			padding-left: 2.5em;
		}

		li {
			margin-bottom: 0.5em;
		}
	`;

	renderGalleryItem(item: PrismicBodyGallerySliceItem) {
		if (!item.image?.url) return null;

		return html`
			<figure class="gallery-figure">
				<img
					alt="${item.image.alt}"
					class="gallery-image"
					src="${item.image.url}"
				>

				${item.caption ? (html`
					<figcaption class="gallery-caption">${prismicH.asText(item.caption)}</figcaption>
				`) : null}
			</figure>
		`;
	}

	renderEmbed(item: PrismicBodyEmbedSlicePrimary) {
		switch (item.kind) {
			case "TikTok":
				return html`
					<div class="tiktok-wrapper" data-url="${item.url?.url ?? ""}">
						<span>Loading TikTok...</span>
					</div>
				`;

			case "YouTube":
				const url = new URL(item.url?.url?.replace(/watch\?v=([A-Za-z0-9])/, "embed/$1") || "");
				url.searchParams.set("feature", "oembed");

				return html`
					<div class="youtube-wrapper">
						<iframe
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen="true"
							class="youtube"
							frameborder="0"
							src="${url.toString()}"
							title="YouTube video player"
						></iframe>
					</div>
				`;

			default:
				return null;
		}
	}

	constructor() {
		super();
	}

	connectedCallback() {
		super.connectedCallback();
	}

	render() {
		return this.body.map((slice) => {
			switch (slice.slice_type) {
				case "text":;
					return html`${unsafeHTML(prismicH.asHTML(slice.primary?.content))}`;

				case "embed":
					return html`
						<div class="align-wide embed">
							${this.renderEmbed(slice.primary)}
						</div>
					`;

				case "image":
					return html`
						<div class="image">
							<img src="${slice.primary.image?.url ?? ""}" />
						</div>
					`;

				case "gallery":
					return html`
						<div class="gallery align-full">
							<ul class="gallery-list">
								${slice.items.map((item) => html`
									<li class="gallery-list-item">
										${this.renderGalleryItem(item)}
									</li>
								`)}
							</ul>
						</div>
					`;

				default:
					return null;
			}
		});
	}
}

customElements.define(tagName, PrismicBody);

export { PrismicBody };
