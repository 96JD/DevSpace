import { Question, QuestionAnswer, QuestionFavorite, QuestionLike, User } from "./odata-models";

export interface ErrorResponse {
	error: string;
}

export interface ExtendedQuestionAnswers extends QuestionAnswer {
	User: { ProfilePicture: string; FirstName: string; LastName: string };
}

export interface ExtendedQuestionLikes extends QuestionLike {
	User: { FirstName: string; LastName: string };
}

export interface ExtendedQuestion extends Question {
	User: User;
	QuestionLikes: ExtendedQuestionLikes[];
	QuestionAnswers: ExtendedQuestionAnswers[];
	QuestionFavorites: QuestionFavorite[];
	isQuestionMenuOpen: boolean;
	isAnswerInputOpen: boolean;
	isAnswersSectionOpen: boolean;
}

export interface NavigationButtons {
	name: string;
	route: string;
	iconName?: string;
}

export interface TextInput {
	value: string;
	validationStatus: boolean;
}

export interface TrendingArticles {
	title: string;
	description: string;
	url: string;
	urlToImage: string;
	publishedAt: string;
}

export interface UserLocalStorage {
	Id: number;
	ProfilePicture: string;
	CoverPhoto: string;
	FirstName: string;
	LastName: string;
	JobTitle: string;
	Phone: string;
	Email: string;
	City: string;
	Salary: number;
	Birthday: string;
	About: string;
	isFollowed?: boolean;
}
