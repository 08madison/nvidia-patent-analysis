import { useState } from 'react';
import { Send, ThumbsUp, MessageCircle } from 'lucide-react';
import type { Comment } from '@/types';

interface CommentSectionProps {
  comments: Comment[];
  patentId: string;
}

export default function CommentSection({ comments: initialComments, patentId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !authorName.trim()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    const comment: Comment = {
      id: `comment-${Date.now()}`,
      patentId,
      author: authorName,
      avatar: authorName.split(' ').map((n) => n[0]).join('').toUpperCase(),
      content: newComment,
      date: new Date().toISOString().split('T')[0],
      likes: 0,
    };

    setComments([comment, ...comments]);
    setNewComment('');
    setIsSubmitting(false);
  };

  const handleLike = (commentId: string) => {
    setComments(
      comments.map((c) =>
        c.id === commentId ? { ...c, likes: c.likes + 1 } : c
      )
    );
  };

  return (
    <div className="bg-[#0f0f0f] rounded-2xl border border-[#333] overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#333] flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-[#76b900]" />
          Comments
          <span className="px-2 py-0.5 rounded-full bg-[#76b900]/20 text-[#76b900] text-sm">
            {comments.length}
          </span>
        </h3>
      </div>

      {/* Comment Form */}
      <div className="p-6 border-b border-[#333]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Your name"
              className="input-dark w-full"
              required
            />
          </div>
          <div className="relative">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts on this patent..."
              rows={3}
              className="input-dark w-full resize-none pr-12"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting || !newComment.trim() || !authorName.trim()}
              className="absolute bottom-3 right-3 p-2 rounded-lg bg-[#76b900] text-black hover:bg-[#8fd600] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      {/* Comments List */}
      <div className="divide-y divide-[#333]">
        {comments.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-[#76b900]/10 flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-[#76b900]/50" />
            </div>
            <p className="text-[#666]">No comments yet. Be the first to share your thoughts!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="p-6 hover:bg-white/[0.02] transition-colors">
              <div className="flex gap-4">
                {/* Avatar */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#76b900] to-[#5a8a00] flex items-center justify-center text-black font-bold text-sm">
                  {comment.avatar}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold text-white">{comment.author}</span>
                    <span className="text-[#666] text-sm">{comment.date}</span>
                  </div>
                  <p className="text-[#e0e0e0] leading-relaxed mb-3">{comment.content}</p>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleLike(comment.id)}
                      className="flex items-center gap-1.5 text-sm text-[#666] hover:text-[#76b900] transition-colors"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>{comment.likes}</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-sm text-[#666] hover:text-[#76b900] transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span>Reply</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
