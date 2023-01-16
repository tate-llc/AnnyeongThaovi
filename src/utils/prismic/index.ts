import * as prismic from "@prismicio/client";

export const client = prismic.createClient(import.meta.env.PRISMIC_API_ENDPOINT, {
	accessToken: import.meta.env.PRISMIC_ACCESS_TOKEN,
});

export const getDocumentById = async (id: string) =>
	await client.getByID(id);

export const getPermalink = (params: {
	date?: string | null;
	type?: string;
	uid?: string | null;
}): string => {
	const { date, type, uid } = params;
	const d = new Date(date ?? "");
	const slug = uid ?? "";

	switch (type) {
		case "homepage":
			return "/";

		case "post":
			return `/${d.getFullYear()}/${(d.getMonth() + 1).toString().padStart(2, "0")}/${(d.getDate() + 1).toString().padStart(2, "0")}/${slug}`;

		default:
			return `/${slug}`;
	}
};

export const getDate = (date: string): string => {
	const d = new Date(date);

	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	return `${months[d.getMonth()]} ${d.getDate() + 1}, ${d.getFullYear()}`;
};
