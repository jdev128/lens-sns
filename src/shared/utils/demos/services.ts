import type { Post } from "../../interfaces/Post";
import type { Comment } from "../../interfaces/Comment";
import type { User } from "../../interfaces/User";
import { getCurrentISODate } from "../dates";
import {
	createPost,
	deletePost,
	getPost,
	getPosts,
	updatePost,
} from "../../../services/posts";
import {
	createComment,
	deleteCommentFromPost,
	getCommentsFromPost,
	updateCommentFromPost,
} from "../../../services/comments";

let currentUser: User = {
	name: "jDev128",
	avatar: "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/05/055874a3352a2b8bede001a85391b2c8594d7b71_full.jpg",
};

let newPost: Partial<Post> = {
	name: currentUser.name,
	avatar: currentUser.avatar,
	content:
		"Lorem ipsum dolor sit amet consectetur. Felis diam amet ultrices adipiscing blandit purus. Cras adipiscing nisl tortor pretium. Sagittis morbi in malesuada lorem eget lacus mauris laoreet. Imperdiet est dui egestas et vel pellentesque sagittis ultricies at. Quis et enim eget tincidunt. Mauris donec ornare tincidunt facilisis elementum augue lorem. In sed id scelerisque vulputate. Pellentesque tellus massa malesuada nunc scelerisque dolor condimentum. Curabitur ut tellus id egestas lacus.",
	title: "Un dia especial para tirar codigo de sol a sol",
};

let newComment: Partial<Comment> = {
	name: currentUser.name,
	avatar: currentUser.avatar,
	createdAt: getCurrentISODate(),
	content:
		"Atavus dolorem velit nam commemoro advoco succurro suppellex audax. Clamo cum attollo venustas adnuo. Vorago ullam tero.\nDemonstro saepe tantum auctus ademptio subito consequuntur quod vesper. Compono turbo cohors verbera ater. Eum comedo voluptate barba volva.\nDeporto bardus deludo celebrer avarus adulatio. Tutis acidus cupio cena auxilium vito. Vulpes undique casso quo conforto utroque carpo terreo caelestis carmen.",
};

getPosts().then((posts) => {
	console.log(posts);
});

getPost("12").then((post) => {
	console.log(post);
});

createPost(newPost).then((post) => {
	console.log(post);
});

deletePost("25").then((post) => {
	console.log(post);
});

updatePost("24", {
	title: "Un dia soleado especial para caminar",
}).then((post) => {
	console.log(post);
});

getCommentsFromPost("13").then((comments) => {
	console.log(comments);
});

deleteCommentFromPost("24", "37").then((comment) => {
	console.log(comment);
});

updateCommentFromPost("24", "36", {
	content: "Sobreescrito un dia de lluvia",
}).then((comment) => {
	console.log(comment);
});

createComment("24", newComment).then((comment) => {
	console.log(comment);
});
