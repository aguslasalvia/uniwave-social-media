export interface PostAuthor {
  id: string;
  username: string;
  fullName: string;
  university: string;
  avatar: string;
}

export interface Post {
  id: string;
  user: PostAuthor;
  content: string;
  imageUrl: string[];
  createdAt: number;
  privacy: string;
  likes: string[];
  likesCount: number;
  likedByMe: boolean;
  comments: number;
}

export interface CreatePostForm {
  content: string;
  image?: string;
  privacy: "public" | "friends" | "private";
}

export interface PostForm {
  content: string;
  imageUrl?: string;
  pickedImage?: string;
  privacy: "public" | "friends" | "private";
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  user: {
    name: string;
    avatar: string;
    university: string;
  };
  content: string;
  likes: number;
  createdAt: string;
}

export interface CreateCommentForm {
  content: string;
}

export interface PostLike {
  id: string;
  postId: string;
  userId: string;
  createdAt: string;
}

export interface PostShare {
  id: string;
  postId: string;
  userId: string;
  createdAt: string;
}
