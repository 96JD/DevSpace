export interface User {
	Id: number;
	ProfilePicture: string;
	CoverPhoto?: string;
	FirstName: string;
	LastName: string;
	JobTitle: string;
	Phone: string;
	Email: string;
	City: string;
	Salary?: number;
	Birthday: string;
	About: string;
	Password: string;
	IsTermsAndPrivacyAccepted: number;
	CreatedAt?: string;
	UpdatedAt?: string;
}

export interface Question {
	Id: number;
	Title: string;
	Description: string;
	CreatedAt?: string;
	UpdatedAt?: string;
	UserId: number;
}

export interface QuestionAnswer {
	Id: number;
	UserId: number;
	QuestionId: number;
	Answer: string;
	CreatedAt?: string;
	UpdatedAt?: string;
}

export interface QuestionFavorite {
	Id: number;
	UserId: number;
	QuestionId: number;
	CreatedAt?: string;
}

export interface QuestionLike {
	Id: number;
	UserId: number;
	QuestionId: number;
	CreatedAt?: string;
}

export interface UserFollow {
	Id: number;
	SenderId: number;
	RecipientId: number;
	CreatedAt?: string;
	UpdatedAt?: string;
}
