export class CreateArticle {
	constructor(
		public title: string,
		public description: string,
		public keywords: string,
		public category: string,
		public article: string
	) {  }
}