import type { AnyRegularField, PrismicDocument, Slice, SliceZone } from "@prismicio/types";

export interface PrismicImage extends Record<string, unknown> {
	alt: string | null;
	copyright: string | null;
	dimensionts: [];
	url: string | null;
}

export interface PrismicUrl extends Record<string, AnyRegularField> {
	link_type: string | null;
	url: string | null;
}

export type HomepageDocument = PrismicDocument<{
	content: [];
	content_image: PrismicImage | null;
	number_of_latest_posts: number | null;
	show_featured_image: boolean;
}>;

export type PostDocument = PrismicDocument<{
	body: SliceZone<AnyPrismicBodySlice>;
	featured_image: PrismicImage | null;
	featured_image_homepage_crop: string | null;
	publish_date: string | null;
	title: [];
}>;

export type PrismicBodyTextSlice = Slice<"text", {
	content: [];
}>;

export type PrismicBodyImageSlice = Slice<"image", {
	image: PrismicImage | null;
}>;

export interface PrismicBodyGallerySliceItem extends Record<string, AnyRegularField> {
	caption: [];
	image: PrismicImage | null;
}

export type PrismicBodyGallerySlice = Slice<"gallery", never, PrismicBodyGallerySliceItem>;

export interface PrismicBodyEmbedSlicePrimary extends Record<string, AnyRegularField> {
	caption: [];
	kind: "TikTok" | "YouTube" | null;
	url: PrismicUrl | null;
}

export type PrismicBodyEmbedSlice = Slice<"embed", PrismicBodyEmbedSlicePrimary>;

export type AnyPrismicBodySlice =
	| PrismicBodyTextSlice
	| PrismicBodyImageSlice
	| PrismicBodyGallerySlice
	| PrismicBodyEmbedSlice;
