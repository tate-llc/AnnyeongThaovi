import{i as f,e as u,s as p}from"./chunks/query-assigned-elements.a94236d0.js";import{t as n}from"./chunks/state.067d3204.js";import{y as g}from"./chunks/lit-html.e19f01bb.js";var d=Object.defineProperty,h=Object.getOwnPropertyDescriptor,s=(c,e,t,r)=>{for(var i=r>1?void 0:r?h(e,t):e,o=c.length-1,l;o>=0;o--)(l=c[o])&&(i=(r?l(e,t,i):l(i))||i);return r&&i&&d(e,t,i),i};const m="my-gallery";class a extends p{constructor(){super(),this.images=[],this._visible=!1,this._toggleFeature=e=>{if(!this._feature)return;const t=e.currentTarget,r=t.getAttribute("alt")??"",i=t.getAttribute("src")??"",o=t.dataset.caption??"";this._visible?(this._feature.setAttribute("data-visible","false"),this._visible=!1):(this._featureCaption&&(this._featureCaption.innerText=o),this._featureImage&&(this._featureImage.setAttribute("alt",r),this._featureImage.setAttribute("src",i)),this._feature.setAttribute("data-visible","true"),this._visible=!0)},this._toggleFeature=this._toggleFeature.bind(this)}connectedCallback(){super.connectedCallback();const e=this.shadowRoot?.querySelector(".feature");e&&(this._feature=e);const t=this.shadowRoot?.querySelector(".feature-image");t&&(this._featureImage=t);const r=this.shadowRoot?.querySelector(".feature-caption");r&&(this._featureCaption=r),this.shadowRoot?.querySelectorAll(".feature-bg, .grid-image").forEach(i=>{i.addEventListener("click",this._toggleFeature)})}disconnectedCallback(){this.shadowRoot?.querySelectorAll(".feature-bg, .grid-image").forEach(e=>{e.removeEventListener("click",this._toggleFeature)}),super.disconnectedCallback()}render(){return g`
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
				${this.images.map((e,t)=>g`
					<figure class="grid-figure">
						<img
							alt="${e.alt??""}"
							loading="${t>2?"lazy":"eager"}"
							class="grid-image"
							data-caption="${e.caption??""}"
							src="${e.src}"
						/>

						${e.caption?g`
							<figcaption class="grid-caption">
								${e.caption}
							</figcaption>
						`:null}
					</figure>
				`)}
			</div>
		`}}a.properties={images:{type:Array},_visible:{type:Boolean,state:!0}};a.styles=f`
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
			height: calc(100% - 2.25em);
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
				gap: 1em;
				grid-template-columns: repeat(3, 1fr);
			}
		}
	`;s([u()],a.prototype,"images",2);s([n()],a.prototype,"_feature",2);s([n()],a.prototype,"_featureImage",2);s([n()],a.prototype,"_featureCaption",2);s([n()],a.prototype,"_visible",2);customElements.define(m,a);export{a as Gallery};
