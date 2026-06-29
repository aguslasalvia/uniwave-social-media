import api from "@/utils/api";

export const postService = {
  fetchPosts: async () => {
    const response = await api.get("/posts/latest");
    return response.data ?? [];
  },

  // postData is a FormData instance built by CreatePostModal (multipart).
  createPost: async (postData: FormData) => {
    const response = await api.post("/posts/create", postData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response.status === 201) {
      return response.data;
    }
    throw new Error("Failed to create post");
  },

  likePost: async (postId: string) => {
    const response = await api.post("/posts/like", { post_id: postId });
    return response.status === 200;
  },

  unlikePost: async (postId: string) => {
    const response = await api.delete("/posts/dislike", {
      data: { post_id: postId },
    });
    return response.status === 200;
  },

  deletePost: async (postId: string) => {
    const response = await api.delete("/posts/delete", {
      data: { post_id: postId },
    });
    return response.status === 200;
  },

  updatePost: async (
    postId: string,
    data: { content?: string; privacy?: string },
  ) => {
    const response = await api.put("/posts/update", {
      post_id: postId,
      ...data,
    });
    return response.status === 200;
  },

  fetchComments: async (postId: string) => {
    const response = await api.get(`/comments/?postId=${postId}`);
    return response.data ?? [];
  },

  addComment: async (postId: string, content: string) => {
    const response = await api.post("/comments/create", {
      postId,
      content,
    });
    return response.status === 201;
  },
};
