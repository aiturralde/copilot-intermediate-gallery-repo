'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Heart, MessageCircle, Download, Share2, X, Send, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Comment, Photo } from '@/lib/mock-photo-data';

interface PhotoModalProps {
  photo: Photo;
  photoIndex: number;
  isLiked: boolean;
  onClose: () => void;
  onToggleLike: (photoId: string) => void;
}

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return '1 day ago';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w`;
  return `${Math.floor(diffDays / 30)}mo`;
}

const GRADIENT_COLORS = [
  'from-blue-400 to-blue-600',
  'from-green-400 to-green-600',
  'from-purple-400 to-purple-600',
  'from-pink-400 to-pink-600',
  'from-yellow-400 to-yellow-600',
  'from-red-400 to-red-600',
];

export function PhotoModal({ photo, photoIndex, isLiked, onClose, onToggleLike }: PhotoModalProps) {
  const [comments, setComments] = useState<Comment[]>(photo.comments ?? []);
  const [newComment, setNewComment] = useState('');
  const [isLikeAnimating, setIsLikeAnimating] = useState(false);
  const commentsEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Prevent body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const scrollToBottom = useCallback(() => {
    commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleLike = useCallback(() => {
    setIsLikeAnimating(true);
    onToggleLike(photo.id);
    setTimeout(() => setIsLikeAnimating(false), 300);
  }, [onToggleLike, photo.id]);

  const handleAddComment = useCallback(() => {
    const text = newComment.trim();
    if (!text) return;

    const comment: Comment = {
      id: `new-${Date.now()}`,
      author: 'you',
      text,
      timestamp: new Date().toISOString(),
    };

    setComments(prev => [...prev, comment]);
    setNewComment('');
    setTimeout(scrollToBottom, 50);
  }, [newComment, scrollToBottom]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleAddComment();
  }, [handleAddComment]);

  const likeCount = photo.likes + (isLiked ? 1 : 0);
  const gradientClass = GRADIENT_COLORS[photoIndex % GRADIENT_COLORS.length];

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-label={photo.title}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left: Photo */}
        <div className={`flex-shrink-0 md:w-[55%] aspect-square bg-gradient-to-br ${gradientClass} flex items-center justify-center`}>
          <span className="text-white/50 text-sm select-none">{photo.title}</span>
        </div>

        {/* Right: Details */}
        <div className="flex flex-col flex-1 min-h-0 md:max-h-[90vh]">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold text-sm select-none">
                {(photo.photographer ?? 'U')[0].toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-sm text-slate-900 dark:text-white">
                  {photo.photographer ?? 'Unknown'}
                </p>
                {photo.dateTaken && (
                  <p className="text-xs text-slate-500 dark:text-slate-400">{photo.dateTaken}</p>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Comments list */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-0">
            {/* Photo title & tags as a caption */}
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold text-xs flex-shrink-0 select-none">
                {(photo.photographer ?? 'U')[0].toUpperCase()}
              </div>
              <div>
                <p className="text-sm text-slate-800 dark:text-slate-200">
                  <span className="font-semibold mr-2">{photo.photographer ?? 'Unknown'}</span>
                  {photo.title}
                </p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {photo.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-0.5 text-xs text-blue-500">
                      <Tag className="h-3 w-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Comments */}
            {comments.length === 0 && (
              <p className="text-sm text-slate-400 dark:text-slate-500 text-center py-4">
                No comments yet. Be the first!
              </p>
            )}
            <AnimatePresence initial={false}>
              {comments.map(comment => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold text-xs flex-shrink-0 select-none">
                    {comment.author[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-800 dark:text-slate-200">
                      <span className="font-semibold mr-2">{comment.author}</span>
                      {comment.text}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                      {formatTimestamp(comment.timestamp)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={commentsEndRef} />
          </div>

          {/* Action bar */}
          <div className="border-t border-slate-200 dark:border-slate-700 px-4 pt-3 pb-1 flex-shrink-0">
            <div className="flex items-center gap-4 mb-2">
              <button
                onClick={handleLike}
                className="transition-transform active:scale-90"
                aria-label={isLiked ? 'Unlike' : 'Like'}
              >
                <motion.div
                  animate={isLikeAnimating ? { scale: [1, 1.4, 1] } : { scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Heart
                    className={`h-6 w-6 transition-colors ${
                      isLiked ? 'fill-red-500 text-red-500' : 'text-slate-700 dark:text-slate-300'
                    }`}
                  />
                </motion.div>
              </button>
              <button
                onClick={() => inputRef.current?.focus()}
                aria-label="Add a comment"
                className="text-slate-700 dark:text-slate-300 hover:text-slate-500 transition-colors"
              >
                <MessageCircle className="h-6 w-6" />
              </button>
              <button
                aria-label="Share"
                className="text-slate-700 dark:text-slate-300 hover:text-slate-500 transition-colors"
              >
                <Share2 className="h-6 w-6" />
              </button>
              <button
                aria-label="Download"
                className="ml-auto text-slate-700 dark:text-slate-300 hover:text-slate-500 transition-colors"
              >
                <Download className="h-6 w-6" />
              </button>
            </div>

            {/* Like count */}
            <p className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
              {likeCount.toLocaleString()} {likeCount === 1 ? 'like' : 'likes'}
            </p>

            {/* Comment count */}
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">
              {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
            </p>
          </div>

          {/* Add comment */}
          <div className="border-t border-slate-200 dark:border-slate-700 px-4 py-3 flex items-center gap-3 flex-shrink-0">
            <input
              ref={inputRef}
              type="text"
              placeholder="Add a comment…"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={handleKeyDown}
              maxLength={500}
              className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
            />
            <button
              onClick={handleAddComment}
              disabled={!newComment.trim()}
              className="text-blue-500 font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:text-blue-700 transition-colors flex items-center gap-1"
              aria-label="Post comment"
            >
              <Send className="h-4 w-4" />
              Post
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
