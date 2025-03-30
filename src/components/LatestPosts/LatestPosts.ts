import { LitElement, css, html } from "lit-element/lit-element.js";
import { customElement, property } from "lit/decorators.js";
import { getDate } from "utils/prismic";

const tagName = "latest-posts";

interface Post {
	date: string;
	image?: string;
	permalink: string;
	title: string;
}

@customElement(tagName)
class LatestPosts extends LitElement {
	@property() posts: Post[] = [];

	static styles = css`
		.wrapper {
			display: flex;
			flex-direction: column;
			gap: 1em;
		}

		.post-image {
			height: 100%;
			left: 0;
			object-fit: cover;
			object-position: center;
			opacity: 0.5;
			position: absolute;
			top: 0;
			width: 100%;
		}

		.post-image-wrapper {
			background-color: #000;
			height: 0;
			padding-bottom: calc(100% * 9 / 16);
			position: relative;
			width: 100%;
			z-index: 1;
		}

		.post-title {
			margin: 0 0 0.5em;
			padding: 0 0.25em;
			text-align: center;
			text-decoration: underline;
			text-transform: uppercase;
		}

		.post-link {
			align-items: center;
			color: #fff;
			text-decoration: none;
			display: flex;
			flex-direction: column;
			height: 100%;
			justify-content: center;
			left: 0;
			position: absolute;
			top: 0;
			width: 100%;
			z-index: 2;
		}

		.post {
			flex-grow: 1;
			flex-shrink: 1;
			position: relative;
			width: 100%;
		}

		@media (min-width: 768px) {
			.wrapper {
				flex-direction: row;
			}
		}
	`;

	renderImage(src?: string) {
		if (!src) return null;

		return html`
			<div class="post-image-wrapper">
				<img alt="" class="post-image" src="${src}">
			</div>
		`;
	}

	render() {
		if (!this.posts.length) return null;

		return html`
			<div class="wrapper">
				${this.posts.map((post) => html`
					<article class="post">
						${this.renderImage(post.image)}

						<a class="post-link" href="${post.permalink}">
							<h1 class="post-title">${post.title}</h1>

							<time datetime="${post.date}">
								${getDate(post.date)}
							</time>
						</a>
					</article>
				`)}
			</div>
		`;
	}
}

customElements.define(tagName, LatestPosts);

export { LatestPosts };
