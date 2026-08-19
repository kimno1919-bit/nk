'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import Link from 'next/link';

interface CommentType {
  id: string;
  board_type: 'qt' | 'album' | 'notice';
  post_id: string;
  author: string;
  content: string;
  created_at: string;
  is_read: boolean;
}

export function CommentNotification() {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('all_comments_view')
        .select('*')
        .eq('is_read', false)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching comments:', error);
        return;
      }

      setComments(data as CommentType[]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
    
    // Realtime subscription could be added here if needed in the future
  }, []);

  const markAsRead = async (id: string, boardType: string) => {
    try {
      const { error } = await supabase.rpc('mark_comment_as_read', {
        p_comment_id: id,
        p_board_type: boardType,
      });

      if (error) {
        console.error('Error marking comment as read:', error);
        return;
      }

      // Remove from list
      setComments((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const getBoardName = (type: string) => {
    switch (type) {
      case 'qt': return '말씀 묵상(QT)';
      case 'album': return '앨범';
      case 'notice': return '공지사항';
      default: return type;
    }
  };

  const getPostLink = (type: string, postId: string) => {
    switch (type) {
      case 'qt': return `/qt/${postId}`;
      case 'album': return `/album`;
      case 'notice': return `/notice/${postId}`;
      default: return '#';
    }
  };

  if (loading) {
    return (
      <Card className="!p-8">
        <h3 className="font-bold text-xl text-ink mb-4 flex items-center gap-2">
          새로 달린 댓글 🔔
        </h3>
        <p className="text-ink-2">불러오는 중...</p>
      </Card>
    );
  }

  return (
    <Card className="!p-8 hover:border-deep-navy/30 transition-colors">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-xl text-ink flex items-center gap-2">
          새로 달린 댓글 🔔
          {comments.length > 0 && (
            <span className="bg-coral text-white text-xs px-2 py-1 rounded-full font-bold">
              {comments.length}
            </span>
          )}
        </h3>
      </div>

      {comments.length === 0 ? (
        <p className="text-ink-2 bg-paper-cream p-4 rounded-lg text-center">
          새로운 댓글이 없습니다.
        </p>
      ) : (
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-white border border-paper-cream/80 p-4 rounded-lg flex flex-col gap-2 relative group shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-bold text-coral bg-coral/10 px-2 py-0.5 rounded mr-2">
                    {getBoardName(comment.board_type)}
                  </span>
                  <span className="font-bold text-sm text-deep-navy">{comment.author}</span>
                  <span className="text-xs text-ink-3 ml-2">
                    {new Date(comment.created_at).toLocaleDateString()}
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => markAsRead(comment.id, comment.board_type)}
                  className="text-xs py-1 px-2 border-deep-navy/20 hover:bg-deep-navy hover:text-white"
                >
                  확인(읽음)
                </Button>
              </div>
              <p className="text-sm text-ink-2 mt-1 line-clamp-2">{comment.content}</p>
              <Link 
                href={getPostLink(comment.board_type, comment.post_id)} 
                target="_blank"
                className="text-xs text-olive hover:underline mt-1 self-start"
              >
                해당 게시물 보기 ↗
              </Link>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
