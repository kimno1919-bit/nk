"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/Button";

export function QtComments({ qtId }: { qtId: string }) {
  const supabase = createClient();
  const [comments, setComments] = useState<any[]>([]);
  const [author, setAuthor] = useState("");
  const [password, setPassword] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchComments();
    checkAdmin();
  }, [qtId]);

  const checkAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setIsAdmin(!!user);
  };

  const fetchComments = async () => {
    const { data } = await supabase
      .from("qt_comments")
      .select("*")
      .eq("qt_id", qtId)
      .order("created_at", { ascending: true });
    if (data) setComments(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !password.trim() || !content.trim()) {
      alert("이름, 비밀번호, 내용을 모두 입력해주세요.");
      return;
    }
    
    setLoading(true);
    await supabase.from("qt_comments").insert([{ qt_id: qtId, author, password, content }]);
    
    setAuthor("");
    setPassword("");
    setContent("");
    setLoading(false);
    fetchComments();
  };

  const handleDelete = async (commentId: string) => {
    if (isAdmin) {
      if (confirm("관리자 권한으로 이 댓글을 삭제하시겠습니까?")) {
        await supabase.from("qt_comments").delete().eq("id", commentId);
        fetchComments();
      }
      return;
    }

    const inputPwd = prompt("댓글을 삭제하려면 비밀번호를 입력하세요.");
    if (!inputPwd) return;

    const { data, error } = await supabase.rpc("delete_qt_comment_with_password", {
      comment_id: commentId,
      p_password: inputPwd
    });

    if (data === true) {
      alert("댓글이 삭제되었습니다.");
      fetchComments();
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  return (
    <div className="mt-8 pt-8 border-t border-line-gray">
      <h4 className="font-bold text-lg text-deep-navy mb-6">댓글 {comments.length}개</h4>
      
      {/* 댓글 리스트 */}
      <div className="space-y-4 mb-8">
        {comments.length > 0 ? comments.map((comment) => (
          <div key={comment.id} className="bg-paper-cream/50 p-4 rounded-lg flex justify-between items-start group">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-[14px] text-ink">{comment.author}</span>
                <span className="text-[12px] text-ink-2">{new Date(comment.created_at).toLocaleString()}</span>
              </div>
              <p className="text-[15px] text-ink-2 whitespace-pre-wrap">{comment.content}</p>
            </div>
            <button 
              onClick={() => handleDelete(comment.id)}
              className="text-xs font-bold text-terracotta opacity-0 group-hover:opacity-100 transition-opacity p-2"
            >
              삭제
            </button>
          </div>
        )) : (
          <div className="text-sm text-ink-2 py-4">첫 번째 댓글을 남겨보세요!</div>
        )}
      </div>

      {/* 댓글 작성 폼 */}
      <form onSubmit={handleSubmit} className="bg-paper-cream p-5 rounded-lg border border-line-gray">
        <div className="flex gap-4 mb-4">
          <input 
            type="text" 
            placeholder="이름" 
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="flex-1 px-3 py-2 text-sm border border-line-gray rounded focus:outline-none focus:border-deep-navy"
            required 
          />
          <input 
            type="password" 
            placeholder="비밀번호" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="flex-1 px-3 py-2 text-sm border border-line-gray rounded focus:outline-none focus:border-deep-navy"
            required 
          />
        </div>
        <textarea 
          placeholder="나눔과 묵상을 자유롭게 적어주세요." 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-line-gray rounded mb-4 min-h-[80px] focus:outline-none focus:border-deep-navy resize-none"
          required
        />
        <div className="flex justify-end">
          <Button type="submit" variant="primary" className="!py-1.5 !px-6" disabled={loading}>
            {loading ? "등록 중..." : "댓글 달기"}
          </Button>
        </div>
      </form>
    </div>
  );
}
