import { create } from "zustand";
import { CommentEntity } from "../types/comment-entity";

interface CommentStore {
  comments: CommentEntity[];
  addComment: (newComment: CommentEntity) => void;
}

const useComments = create<CommentStore>((set) => ({
  comments: [],
  addComment: (newComment) =>
    set((state) => ({ comments: [...state.comments, newComment] })),
}));

export default useComments;
