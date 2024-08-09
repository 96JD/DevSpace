DROP DATABASE IF EXISTS Dev_Space;
CREATE DATABASE Dev_Space;
USE Dev_Space;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    profile_picture VARCHAR(255) NOT NULL,
    cover_photo VARCHAR(255),
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    job_title VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    salary FLOAT,
    birthday DATE NOT NULL,
    about TEXT NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_terms_and_privacy_accepted BIT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME
);

CREATE TABLE user_follows (
    id INT PRIMARY KEY AUTO_INCREMENT,
    sender_id INT NOT NULL,
    recipient_id INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (recipient_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE questions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE question_favorites (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    question_id INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

CREATE TABLE question_likes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    question_id INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

CREATE TABLE question_answers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    question_id INT NOT NULL,
    answer TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

INSERT INTO users (id, profile_picture, cover_photo, first_name, last_name, job_title, phone, email, city, salary, birthday, about, password, is_terms_and_privacy_accepted) VALUES
(1, "/assets/default_profile_picture.png", "/assets/default_cover_photo.png", "Dev", "Space", "Senior Software Engineer", "555-2445", "ds@ds.com", "Dev Space", 90000, "1999-09-09", "I am a senior software engineer with 5 years of experience.", "JjlJQZi/XJZ87s1bRka80emuGiUKpW/GDoZldjmOa/Q=", 1),
(2, "https://picsum.photos/200/300", "https://picsum.photos/1000/200", "Alice", "Johnson", "Software Engineer", "555-1234", "alice.johnson@example.com", "San Francisco", 80000, "1995-10-10", "I have been developing software for 5 years.", "JjlJQZi/XJZ87s1bRka80emuGiUKpW/GDoZldjmOa/Q=", 1),
(3, "https://picsum.photos/201/300", "https://picsum.photos/1001/200", "Mark", "Smith", "Frontend Developer", "555-2345", "mark.smith@example.com", "Los Angeles", 70000, "1990-03-15", "I am a frontend developer with expertise in React.", "JjlJQZi/XJZ87s1bRka80emuGiUKpW/GDoZldjmOa/Q=", 1),
(4, "https://picsum.photos/202/300", "https://picsum.photos/1002/200", "Sara", "Lee", "Full Stack Developer", "555-3456", "sara.lee@example.com", "Seattle", 100000, "1985-07-20", "I have experience in both frontend and backend development.", "JjlJQZi/XJZ87s1bRka80emuGiUKpW/GDoZldjmOa/Q=", 1),
(5, "https://picsum.photos/203/300", "https://picsum.photos/1003/200", "Adam", "Williams", "Software Developer", "555-4567", "adam.williams@example.com", "New York City", 95000, "1992-12-25", "I have a passion for developing high-quality software.", "JjlJQZi/XJZ87s1bRka80emuGiUKpW/GDoZldjmOa/Q=", 1),
(6, "https://picsum.photos/204/300", "https://picsum.photos/1004/200", "Grace", "Park", "Software Developer", "555-5678", "grace.park@example.com", "Chicago", 85000, "1988-05-05", "I have expertise in backend development.", "JjlJQZi/XJZ87s1bRka80emuGiUKpW/GDoZldjmOa/Q=", 1),
(7, "https://picsum.photos/205/300", "https://picsum.photos/1005/200", "Sarah", "Jones", "Software Developer", "555-6789", "sarah.jones@example.com", "Houston", 85000, "1993-01-01", "I am a software developer with experience in Java.", "JjlJQZi/XJZ87s1bRka80emuGiUKpW/GDoZldjmOa/Q=", 1),
(8, "https://picsum.photos/206/300", "https://picsum.photos/1006/200", "Daniel", "Lee", "Backend Developer", "555-7890", "daniel.lee@example.com", "San Diego", 80000, "1994-02-02", "I specialize in backend development using Node.js.", "JjlJQZi/XJZ87s1bRka80emuGiUKpW/GDoZldjmOa/Q=", 1),
(9, "https://picsum.photos/207/300", "https://picsum.photos/1007/200", "Emily", "Chen", "Software Engineer", "555-8901", "emily.chen@example.com", "Austin", 90000, "1991-03-03", "I am a software engineer with experience in Python.", "JjlJQZi/XJZ87s1bRka80emuGiUKpW/GDoZldjmOa/Q=", 1),
(10, "https://picsum.photos/208/300", "https://picsum.photos/1008/200", "Michael", "Kim", "Full Stack Developer", "555-9012", "michael.kim@example.com", "Dallas", 95000, "1990-04-04", "I have expertise in both frontend and backend development.", "JjlJQZi/XJZ87s1bRka80emuGiUKpW/GDoZldjmOa/Q=", 1),
(11, "https://picsum.photos/209/300", "https://picsum.photos/1009/200", "Laura", "Nguyen", "Frontend Developer", "555-0123", "laura.nguyen@example.com", "San Jose", 80000, "1992-05-05", "I am a frontend developer with expertise in React.", "JjlJQZi/XJZ87s1bRka80emuGiUKpW/GDoZldjmOa/Q=", 1),
(12, "https://picsum.photos/210/300", "https://picsum.photos/1010/200", "Kevin", "Chang", "Software Developer", "555-1235", "kevin.chang@example.com", "Seattle", 100000, "1989-06-06", "I am a software developer with experience in C++.", "JjlJQZi/XJZ87s1bRka80emuGiUKpW/GDoZldjmOa/Q=", 1),
(13, "https://picsum.photos/211/300", "https://picsum.photos/1011/200", "Emily", "Wong", "Software Developer", "555-1236", "emily.wong@example.com", "San Francisco", 82000, "1992-10-05", "I am a full-stack web developer.", "JjlJQZi/XJZ87s1bRka80emuGiUKpW/GDoZldjmOa/Q=", 1),
(14, "https://picsum.photos/212/300", "https://picsum.photos/1012/200", "David", "Chen", "Software Developer", "555-1237", "david.chen@example.com", "Los Angeles", 70000, "1991-12-18", "I specialize in building mobile apps.", "JjlJQZi/XJZ87s1bRka80emuGiUKpW/GDoZldjmOa/Q=", 1),
(15, "https://picsum.photos/213/300", "https://picsum.photos/1013/200", "Julia", "Johnson", "Software Developer", "555-1238", "julia.johnson@example.com", "Chicago", 78000, "1993-02-24", "I am passionate about machine learning.", "JjlJQZi/XJZ87s1bRka80emuGiUKpW/GDoZldjmOa/Q=", 1),
(16, "https://picsum.photos/214/300", "https://picsum.photos/1014/200", "William", "Lee", "Software Developer", "555-1239", "william.lee@example.com", "Toronto", 85000, "1990-08-08", "I enjoy building scalable systems.", "JjlJQZi/XJZ87s1bRka80emuGiUKpW/GDoZldjmOa/Q=", 1),
(17, "https://picsum.photos/215/300", "https://picsum.photos/1015/200", "Hannah", "Choi", "Software Developer", "555-1210", "hannah.choi@example.com", "Seoul", 75000, "1994-05-12", "I am passionate about frontend development.", "JjlJQZi/XJZ87s1bRka80emuGiUKpW/GDoZldjmOa/Q=", 1),
(18, "https://picsum.photos/216/300", "https://picsum.photos/1016/200", "Alex", "Nguyen", "Software Developer", "555-1211", "alex.nguyen@example.com", "Sydney", 80000, "1991-01-30", "I specialize in building web applications.", "JjlJQZi/XJZ87s1bRka80emuGiUKpW/GDoZldjmOa/Q=", 1),
(19, "https://picsum.photos/217/300", "https://picsum.photos/1017/200", "Emily", "Lee", "Web Developer", "555-1212", "emily.lee@example.com", "San Francisco", 90000, "1995-02-25", "I have a passion for creating beautiful and functional websites.", "JjlJQZi/XJZ87s1bRka80emuGiUKpW/GDoZldjmOa/Q=", 1),
(20, "https://picsum.photos/218/300", "https://picsum.photos/1018/200", "John", "Doe", "Software Developer", "555-4321", "john.doe@example.com", "New York City", 75000, "1990-06-15", "I am a software developer with 5 years of experience.", "JjlJQZi/XJZ87s1bRka80emuGiUKpW/GDoZldjmOa/Q=", 1);

INSERT INTO user_follows (Id, sender_id, recipient_id) VALUES
(1, 1, 2),
(2, 1, 3),
(3, 1, 4),
(4, 1, 5),
(5, 1, 6),
(6, 1, 7),
(7, 1, 8),
(8, 1, 9),
(9, 1, 10),
(10, 2, 1),
(11, 2, 3),
(12, 2, 4);

INSERT INTO questions (Id, title, description, user_id) VALUES
(1, "What is a code review and why is it important?", "I'm new to development and I keep hearing about code reviews. Can someone explain what they are and why they are important?", 1),
(2, "How can I improve my debugging skills?", "I feel like I spend a lot of time debugging my code. Are there any tips or tricks for improving my debugging skills?", 2),
(3, "What is the difference between Git and SVN?", "I'm familiar with SVN, but I keep hearing about Git. What is the difference between the two and should I switch?", 3),
(4, "How can I make my code more readable?", "I've heard that writing readable code is important, but I'm not sure how to do it. Are there any best practices or guidelines I should follow?", 4),
(5, "What is agile development and how does it work?", "I've heard the term 'agile development' before, but I'm not sure what it means or how it works. Can someone explain?", 1),
(6, "How can I stay up to date with the latest programming languages and frameworks?", "I want to make sure I'm using the latest and greatest tools, but it's hard to keep up. Are there any resources or strategies for staying up to date?", 6),
(7, "What is a RESTful API and how does it work?", "I keep seeing the term 'RESTful API' in job postings, but I'm not sure what it means. Can someone explain what it is and how it works?", 7),
(8, "How can I write efficient SQL queries?", "I'm new to SQL and I'm struggling with writing efficient queries. Are there any best practices or tips for improving query performance?", 1),
(9, "What are some common security vulnerabilities in web applications?", "I want to make sure the web applications I develop are secure. Can someone explain some common security vulnerabilities and how to prevent them?", 9),
(10, "How can I optimize my website for search engines?", "I'm developing a website and I want to make sure it shows up in search results. Are there any tips or tricks for optimizing my site for search engines?", 10),
(11, "What are some best practices for writing maintainable code?", "I want to make sure the code I write is maintainable over time. Are there any best practices or guidelines I should follow?", 2),
(12, "How can I improve my problem-solving skills?", "I find myself getting stuck on problems frequently. Are there any strategies or techniques for improving problem-solving skills?", 3),
(13, "What are some common design patterns in software development?", "I keep hearing about design patterns, but I'm not sure what they are or how to use them. Can someone explain some common design patterns in software development?", 4),
(14, "What are some tips for writing effective documentation?", "I want to make sure the code I write is well-documented. Are there any best practices or tips for writing effective documentation?", 5),
(15, "How can I write more efficient algorithms?", "I'm working on an algorithm that is slow and inefficient. Are there any strategies or techniques for writing more efficient algorithms?", 6),
(16, "What are some best practices for version control?", "I want to make sure I'm using version control effectively. Are there any best practices or guidelines I should follow?", 1),
(17, "What are some common performance bottlenecks in web applications?", "I'm working on a web application that is slow. Can someone explain some common performance bottlenecks and how to fix them?", 1),
(18, "How can I ensure my code is secure?", "I want to make sure the code I write is secure. Are there any best practices or guidelines I should follow?", 2),
(19, "What is continuous integration and how does it work?", "I keep hearing about continuous integration, but I'm not sure what it is or how it works. Can someone explain?", 3),
(20, "What are some common debugging techniques?", "I'm having trouble debugging a particularly tricky issue. Are there any common debugging techniques I should try?", 2),
(21, "What is Test Driven Development (TDD)?", "I've heard a lot about Test Driven Development (TDD), but I'm not sure what it is or how it works. Can someone explain?", 1),
(22, "What is the Agile development methodology?", "I'm not familiar with the Agile development methodology. Can someone explain what it is and how it works?", 2),
(23, "What is pair programming and how does it work?", "I've heard that some software development teams use pair programming. Can someone explain what it is and how it works?", 3),
(24, "What is continuous delivery and how does it work?", "I keep hearing about continuous delivery, but I'm not sure what it is or how it works. Can someone explain?", 4),
(25, "What is the difference between unit tests and integration tests?", "I'm not sure what the difference is between unit tests and integration tests. Can someone explain the distinction?", 2),
(26, "What is the SOLID design principle?", "I've heard about the SOLID design principle, but I'm not sure what it is or how it applies to software development. Can someone explain?", 3),
(27, "What is the difference between a stack and a queue?", "I'm not sure what the difference is between a stack and a queue. Can someone explain the distinction?", 1),
(28, "What is the difference between a compiler and an interpreter?", "I'm not sure what the difference is between a compiler and an interpreter. Can someone explain the distinction?", 1),
(29, "What is the difference between Git and SVN?", "I've used SVN before, but I'm not sure how Git is different. Can someone explain the differences between the two?", 1),
(30, "What is the difference between a monolithic and microservices architecture?", "I keep hearing about monolithic and microservices architectures. Can someone explain the differences between the two?", 1);

INSERT INTO question_likes (Id, user_id, question_id) VALUES
(1, 1, 2),
(2, 1, 3),
(3, 1, 4),
(4, 1, 5),
(5, 1, 6),
(6, 1, 7),
(7, 1, 8),
(8, 1, 9),
(9, 1, 10),
(10, 2, 1),
(11, 3, 1),
(12, 4, 1);

INSERT INTO question_favorites (Id, user_id, question_id) VALUES
(1, 1, 2),
(2, 1, 3),
(3, 1, 4),
(4, 1, 5),
(5, 1, 6),
(6, 1, 7),
(7, 1, 8),
(8, 1, 9),
(9, 1, 10),
(10, 2, 1),
(11, 3, 1),
(12, 4, 1);

INSERT INTO question_answers (Id, user_id, question_id, answer) VALUES
(1, 2, 1, "A code review is a process in which one or more developers examine a piece of code to ensure it meets the organization's standards and is error-free. It is important because it can improve the quality of the code and help catch potential issues before they become major problems."),
(2, 3, 1, "A code review is a collaborative process where developers check each other's code for errors and suggest improvements. It is important because it can catch mistakes that could lead to system failures and improve code quality overall."),
(3, 4, 1, "A code review is a technique in which developers review each other's code to find mistakes, optimize performance, and ensure compliance with coding standards. It is important because it helps reduce errors, improve code maintainability, and promote knowledge sharing."),
(4, 5, 1, "A code review is an inspection process where developers review code written by others to ensure it is correct, maintainable, and efficient. It is important because it promotes collaboration, knowledge sharing, and helps catch issues early in the development cycle."),
(5, 6, 1, "A code review is a method of reviewing code that involves a team of developers checking the code for correctness, readability, and maintainability. It is important because it can help catch issues that might be missed during development, improve code quality, and reduce the time and cost of bug fixing."),
(6, 1, 1, "Thanks for useful answers!"),
(7, 1, 2, "Read the documentation: Before you start debugging, take the time to read the documentation for the programming language or framework you are working with. This can help you better understand how the system should be working and identify potential issues"),
(8, 2, 2, "Use a debugger: Debuggers are tools built into most programming languages that allow you to step through your code line by line and monitor variables and program state. Familiarize yourself with the debugger for your language or framework to help identify the source of bugs."),
(9, 6, 2, "Write clear and concise code: Writing code that is easy to read and understand can help you identify bugs more quickly. Use descriptive variable names and comments where necessary to make it clear what each part of the code is doing."),
(10, 2, 2, "Test early and often: Test your code frequently to catch bugs early in the development process. This can save you time and effort later on."),
(11, 3, 2, "Break down the problem: When you encounter a bug, break the problem down into smaller, more manageable parts. This can help you identify the root cause of the issue and avoid getting lost in complex code."),
(12, 2, 2, "Thanks for the beautiful answers!");
