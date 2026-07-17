import{i as M,e as E,s as H}from"./chunks/query-assigned-elements.a94236d0.js";import{b as L,x as C,y as u}from"./chunks/lit-html.e19f01bb.js";import{i as P,t as A,e as W}from"./chunks/directive.7cba340f.js";const n={heading1:"heading1",heading2:"heading2",heading3:"heading3",heading4:"heading4",heading5:"heading5",heading6:"heading6",paragraph:"paragraph",preformatted:"preformatted",strong:"strong",em:"em",listItem:"list-item",oListItem:"o-list-item",list:"group-list-item",oList:"group-o-list-item",image:"image",embed:"embed",hyperlink:"hyperlink",label:"label",span:"span"},p={Any:"Any",Document:"Document",Media:"Media",Web:"Web"},R=t=>{var e;return{link_type:p.Document,id:t.id,uid:t.uid??void 0,type:t.type,tags:t.tags,lang:t.lang,url:t.url??void 0,slug:(e=t.slugs)==null?void 0:e[0],...t.data&&Object.keys(t.data).length>0?{data:t.data}:{}}},G=(t,e)=>{if(!t)return null;const r="link_type"in t?t:R(t);switch(r.link_type){case p.Media:case p.Web:return"url"in r?r.url:null;case p.Document:{if("id"in r&&e){const a=e(r);if(a!=null)return a}return"url"in r&&r.url?r.url:null}case p.Any:default:return null}},b=()=>(++b.i).toString();b.i=0;const O=t=>{const e=U(t),r=[];for(let a=0;a<e.length;a++)r.push(z(e[a]));return{key:b(),children:r}},f=(t,e=[])=>({key:b(),type:t.type,text:"text"in t?t.text:void 0,node:t,children:e}),w=t=>f({type:n.span,text:t,spans:[]}),U=t=>{const e=t.slice(0);for(let r=0;r<e.length;r++){const a=e[r];if(a.type===n.listItem||a.type===n.oListItem){const i=[a];for(;e[r+1]&&e[r+1].type===a.type;)i.push(e[r+1]),e.splice(r,1);a.type===n.listItem?e[r]={type:n.list,items:i}:e[r]={type:n.oList,items:i}}}return e},z=t=>{if("text"in t)return f(t,N(t.spans,t));if("items"in t){const e=[];for(let r=0;r<t.items.length;r++)e.push(z(t.items[r]));return f(t,e)}return f(t)},N=(t,e,r)=>{if(!t.length)return[w(e.text)];const a=t.slice(0);a.sort((s,l)=>s.start-l.start||l.end-s.end);const i=[];for(let s=0;s<a.length;s++){const l=a[s],m=r&&r.start||0,h=l.start-m,v=l.end-m,k=e.text.slice(h,v),x=[];for(let g=s;g<a.length;g++){const c=a[g];c!==l&&(c.start>=l.start&&c.end<=l.end?(x.push(c),a.splice(g,1),g--):c.start<l.end&&c.end>l.start&&(x.push({...c,end:l.end}),a[g]={...c,start:l.end}))}s===0&&h>0&&i.push(w(e.text.slice(0,h)));const j={...l,text:k};i.push(f(j,N(x,{...e,text:k},l))),v<e.text.length&&i.push(w(e.text.slice(v,a[s+1]?a[s+1].start-m:void 0)))}return i},Y=(t,e=" ")=>{let r="";for(let a=0;a<t.length;a++)"text"in t[a]&&(r+=(r?e:"")+t[a].text);return r},q=(t,e)=>I(O(t).children,e),I=(t,e)=>{const r=[];for(let a=0;a<t.length;a++){const i=t[a],s=e(i.type,i.node,i.text,I(i.children,e),i.key);s!=null&&r.push(s)}return r},B={[n.listItem]:"listItem",[n.oListItem]:"oListItem",[n.list]:"list",[n.oList]:"oList"},Z=t=>(e,r,a,i,s)=>{const l=t[B[e]||e];if(l)return l({type:e,node:r,text:a,children:i,key:s})},J=(...t)=>(...e)=>{for(let r=0;r<t.length;r++){const a=t[r];if(a){const i=a(...e);if(i!=null)return i}}},K=(t,e)=>t?Y(t,e):null;/*!
 * escape-html
 * Copyright(c) 2012-2013 TJ Holowaychuk
 * Copyright(c) 2015 Andreas Lubbe
 * Copyright(c) 2015 Tiancheng "Timothy" Gu
 * MIT Licensed
 */var Q=/["'&<>]/,y=V;function V(t){var e=""+t,r=Q.exec(e);if(!r)return e;var a,i="",s=0,l=0;for(s=r.index;s<e.length;s++){switch(e.charCodeAt(s)){case 34:a="&quot;";break;case 38:a="&amp;";break;case 39:a="&#39;";break;case 60:a="&lt;";break;case 62:a="&gt;";break;default:continue}l!==s&&(i+=e.substring(l,s)),l=s+1,i+=a}return l!==s?i+e.substring(l,s):i}const d=t=>"data"in t&&"label"in t.data?` class="${t.data.label}"`:"",o=(t,e,r)=>`<${t}${d(e)}>${r.join("")}</${t}>`,X=t=>`<pre${d(t)}>${y(t.text)}</pre>`,D=(t,e)=>{let r=`<img src="${e.url}" alt="${y(e.alt)}"${e.copyright?` copyright="${y(e.copyright)}"`:""} />`;return e.linkTo&&(r=S(t,{type:n.hyperlink,data:e.linkTo,start:0,end:0},[r])),`<p class="block-img">${r}</p>`},F=t=>`<div data-oembed="${t.oembed.embed_url}" data-oembed-type="${t.oembed.type}" data-oembed-provider="${t.oembed.provider_name}"${d(t)}>${t.oembed.html}</div>`,S=(t,e,r)=>{switch(e.data.link_type){case p.Web:return`<a href="${y(e.data.url)}" ${e.data.target?`target="${e.data.target}" `:""}rel="noopener noreferrer"${d(e)}>${r.join("")}</a>`;case p.Document:return`<a href="${G(e.data,t)}"${d(e)}>${r.join("")}</a>`;case p.Media:return`<a href="${e.data.url}"${d(e)}>${r.join("")}</a>`}},ee=t=>t?y(t).replace(/\n/g,"<br />"):"",_=t=>(e,r,a,i,s)=>{switch(r.type){case n.heading1:return o("h1",r,i);case n.heading2:return o("h2",r,i);case n.heading3:return o("h3",r,i);case n.heading4:return o("h4",r,i);case n.heading5:return o("h5",r,i);case n.heading6:return o("h6",r,i);case n.paragraph:return o("p",r,i);case n.preformatted:return X(r);case n.strong:return o("strong",r,i);case n.em:return o("em",r,i);case n.listItem:return o("li",r,i);case n.oListItem:return o("li",r,i);case n.list:return o("ul",r,i);case n.oList:return o("ol",r,i);case n.image:return D(t,r);case n.embed:return F(r);case n.hyperlink:return S(t,r,i);case n.label:return o("span",r,i);case n.span:default:return ee(a)}},te=t=>{const e={};for(const r in t){const a=t[r];a&&(e[r]=i=>a({...i,children:i.children.join("")}))}return Z(e)},re=(t,e,r)=>{if(t){let a;return r?a=J(typeof r=="object"?te(r):(i,s,l,m,h)=>r(i,s,l,m.join(""),h),_(e)):a=_(e),q(t,a).join("")}else return null};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class T extends P{constructor(e){if(super(e),this.it=L,e.type!==A.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===L||e==null)return this._t=void 0,this.it=e;if(e===C)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}}T.directiveName="unsafeHTML",T.resultType=1;const ae=W(T);var ie=Object.defineProperty,se=Object.getOwnPropertyDescriptor,ne=(t,e,r,a)=>{for(var i=a>1?void 0:a?se(e,r):e,s=t.length-1,l;s>=0;s--)(l=t[s])&&(i=(a?l(e,r,i):l(i))||i);return a&&i&&ie(e,r,i),i};const le="prismic-body";class $ extends H{constructor(){super(),this.body=[]}renderGalleryItem(e){return e.image?.url?u`
			<figure class="gallery-figure">
				<img
					alt="${e.image.alt}"
					class="gallery-image"
					loading="lazy"
					src="${e.image.url}"
				>

				${e.caption?u`
					<figcaption class="gallery-caption">${K(e.caption)}</figcaption>
				`:null}
			</figure>
		`:null}renderEmbed(e){switch(e.kind){case"TikTok":return u`
					<div class="tiktok-wrapper" data-url="${e.url?.url??""}">
						<span>Loading TikTok...</span>
					</div>
				`;case"YouTube":const r=new URL(e.url?.url?.replace(/watch\?v=([A-Za-z0-9])/,"embed/$1")||"");return r.searchParams.set("feature","oembed"),u`
					<div class="youtube-wrapper">
						<iframe
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen="true"
							class="youtube"
							frameborder="0"
							src="${r.toString()}"
							title="YouTube video player"
						></iframe>
					</div>
				`}}connectedCallback(){super.connectedCallback()}render(){return this.body.map(e=>{switch(e.slice_type){case"text":return u`${ae(re(e.primary?.content))}`;case"embed":return u`
						<div class="align-wide embed">
							${this.renderEmbed(e.primary)}
						</div>
					`;case"image":return u`
						<div class="image">
							<img alt="" loading="lazy" src="${e.primary.image?.url??""}" />
						</div>
					`;case"gallery":return u`
						<div class="gallery align-full">
							<ul class="gallery-list">
								${e.items.map(r=>u`
									<li class="gallery-list-item">
										${this.renderGalleryItem(r)}
									</li>
								`)}
							</ul>
						</div>
					`}})}}$.properties={body:{type:Array}};$.styles=M`
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

		@media (max-width: 767px) {
			p, ul, ol {
				padding-left: 1rem;
				padding-right: 1rem;
			}

			ul, ol {
				padding-left: 3.5rem;
			}
		}
	`;ne([E()],$.prototype,"body",2);customElements.define(le,$);export{$ as PrismicBody};
