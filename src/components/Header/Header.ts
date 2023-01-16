import { LitElement, html, css } from "lit-element/lit-element.js";
import { customElement, eventOptions, property, state } from "lit/decorators.js";

const tagName = "my-header";

class Header extends LitElement {
	@property() subtitle: string = "타오비와 함께 가르치고 여행하기";
	@property() title: string = "Teaching & Traveling with Thaovi";

	@state() private _hidden: boolean = false;
	@state() private _previousY: number = 0;
	@state() private _shouldHide: boolean = false;

	static styles = css`
		.branding-title {
			font-size: 1.4em;
		}

		.branding-subtitle {
			font-size: 1.2em;
		}

		.branding-text {
			display: flex;
			flex-direction: column;
			gap: 0.6em;
			text-align: center;
		}

		.logo {
			height: 52px;
			width: auto;
		}

		.branding-link {
			align-items: center;
			color: inherit;
			display: flex;
			flex-direction: column;
			gap: 0.5em;
			text-decoration: none;
		}

		.nav-link-icon {
			height: 18px;
			width: auto;
		}

		.nav-link {
			color: inherit;
			text-decoration: none;
		}

		.nav-link:hover {
			text-decoration: underline;
		}

		.nav-link[href*=http]:hover {
			text-decoration: none;
		}

		.nav-list-item {
			margin: 0;
			text-transform: uppercase;
		}

		.nav-list {
			align-items: center;
			display: flex;
			gap: 1em;
			justify-content: center;
			list-style: none;
			margin: 0;
			padding: 0;
		}

		.header {
			background-color: var(--colors--background);
			box-shadow: rgba(0, 0, 0, 0.5) 0 0 1px;
			display: flex;
			flex-direction: column;
			gap: 1em;
			padding: 1em;
		}

		@media only screen and (prefers-color-scheme: dark) {
			.nav-link-icon {
				filter: invert(1);
			}

			.header {
				box-shadow: rgba(255, 255, 255, 0.25) 0 0 1px;
			}
		}

		@media (min-width: 768px) {
			.branding-text {
				text-align: left;
			}

			.branding-link {
				flex-direction: row;
			}

			.header {
				align-items: center;
				box-sizing: border-box;
				flex-direction: row;
				justify-content: space-between;
				left: 0;
				position: fixed;
				top: 0;
				transition: transform 0.25s ease-in-out;
				width: 100%;
				z-index: 1;
			}

			.header[data-hidden="true"] {
				transform: translate3d(0, -100%, 0);
			}
		}
	`;

	@eventOptions({ passive: true })
	private _handleResize() {
		if (this._shouldHide && window.innerWidth < 768) {
			this._shouldHide = false;
			this._hidden = false;
		} else if (!this._shouldHide && window.innerWidth >= 768) {
			this._shouldHide = true;
		}
	}

	@eventOptions({ passive: true })
	private _handleScroll() {
		if (this._shouldHide) {
			if (this._hidden && (window.scrollY < this._previousY || window.scrollY <= 84)) {
				this._hidden = false;
			} else if (!this._hidden && window.scrollY > this._previousY && window.scrollY > 84) {
				this._hidden = true;
			}
			this._previousY = window.scrollY;
		}
	}

	constructor() {
		super();

		this._handleResize = this._handleResize.bind(this);
		this._handleScroll = this._handleScroll.bind(this);
	}

	connectedCallback() {
		super.connectedCallback();

		if (window.innerWidth >= 742) {
			this._shouldHide = true;
		}

		window.addEventListener("resize", this._handleResize);
		window.addEventListener("scroll", this._handleScroll);
	}

	disconnectedCallback() {
		window.removeEventListener("resize", this._handleResize);
		window.removeEventListener("scroll", this._handleScroll);
		super.disconnectedCallback();
	}

	render() {
		return html`
			<header class="header" data-hidden="${this._hidden}">
				<a class="branding-link" href="/">
					<img alt="" class="logo" src="/logo.png">

					<div class="branding-text">
						<span class="branding-title">${this.title}</span>
						<span class="branding-subtitle">${this.subtitle}</span>
					</div>
				</a>

				<nav>
					<ul class="nav-list">
						<li class="nav-list-item">
							<a class="nav-link" href="/posts">Posts</a>
						</li>

						<li class="nav-list-item">
							<a class="nav-link" href="/photos">Photos</a>
						</li>

						<li class="nav-list-item">
							<a class="nav-link" href="/subscribe">Subscribe</a>
						</li>

						<li class="nav-list-item">
							<a
								aria-label="@thaovinguyen6 on Instagram"
								class="nav-link"
								href="https://www.instagram.com/thaovinguyen6"
								target="_blank"
							>
								<img
									alt=""
									class="nav-link-icon"
									src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkBAMAAAATLoWrAAAAMFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlTPQ5AAAAD3RSTlMAA/lFNu5lfdunUhIfwJXvo6hdAAABVElEQVQoz32SsUvDUBDGv4fBoi3yAh2cQ0fhDSKCS0tBQXRTxMk46CJIOyodxEEc4yA4SQXBtR2ErkX8J5x08R9ISZoWynnXapqU4C0JP953fHffAQpbjzcOcTmHHyfQ4No2FJd/L2Q+QZgdA7pG0cPZ8yrXxsulR6GCZYIG4uq4fgULtAdbT4BWWKM7VE3djh+dN3JUQi1q8xslwF6kft4L0RyoseR9V6tcMNLNAT77ggoXjnPbnXNDXI3ghYJOxdMB1p+4Edwhkxx75Jnq3KEVwAzFrjnaef32Q6XR8mF6UAU3qgBFL+hqlH1QT3T73FBvirJMY7RMX+Jtia5j9EYVsWrRSoyqfltQ3pT+Q7/CYkKY0X7GxNSq9Wc1PRBkoJmxwWOnliOCKLVCQbzC5KLlhxediEO+EkcqNNgSWjJaZY+jzTiAjDPJOKask5scppke5g8DKfWjE34vawAAAABJRU5ErkJggg=="
								/>
							</a>
						</li>
					</ul>
				</nav>
			</header>
		`;
	}
}

customElements.define(tagName, Header);

export { Header };
