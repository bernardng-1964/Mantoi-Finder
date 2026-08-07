import React, { useState, useEffect } from 'react';
import { MessageSquare, ExternalLink, Info, RefreshCw, Send, CheckCircle2, User } from 'lucide-react';

interface LocalComment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

export const DisqusComments: React.FC = () => {
  const disqusShortname = 'mantoi-finder';
  const [isInIframe, setIsInIframe] = useState(false);
  const [localComments, setLocalComments] = useState<LocalComment[]>([]);
  const [authorName, setAuthorName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Load local saved fallback comments
  useEffect(() => {
    try {
      const stored = localStorage.getItem('mantoi_local_comments');
      if (stored) {
        setLocalComments(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    // Detect if app is running inside an iframe
    try {
      setIsInIframe(window.self !== window.top);
    } catch {
      setIsInIframe(true);
    }

    const canonicalUrl = typeof window !== 'undefined'
      ? window.location.origin + window.location.pathname
      : 'https://mantoi-finder.disqus.com';

    // Set up disqus_config as specified in Disqus Universal Code
    (window as any).disqus_config = function (this: any) {
      this.page.url = canonicalUrl;
      this.page.identifier = 'mantoi-character-finder-main';
      this.page.title = 'Mantoi Family Discussion';
    };

    // Load or reset Disqus
    if ((window as any).DISQUS) {
      try {
        (window as any).DISQUS.reset({
          reload: true,
          config: (window as any).disqus_config,
        });
      } catch (err) {
        console.warn('Disqus reset error:', err);
      }
    } else {
      const d = document;
      let s = d.getElementById('disqus-embed-script') as HTMLScriptElement | null;
      if (!s) {
        s = d.createElement('script');
        s.id = 'disqus-embed-script';
        s.src = `https://${disqusShortname}.disqus.com/embed.js`;
        s.setAttribute('data-timestamp', (+new Date()).toString());
        (d.head || d.body).appendChild(s);
      }
    }
  }, []);

  const handleReloadDisqus = () => {
    if ((window as any).DISQUS) {
      try {
        (window as any).DISQUS.reset({
          reload: true,
          config: (window as any).disqus_config,
        });
      } catch {
        window.location.reload();
      }
    } else {
      window.location.reload();
    }
  };

  const handleAddLocalComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment: LocalComment = {
      id: Date.now().toString(),
      author: authorName.trim() || 'Mantoi Parent',
      content: commentText.trim(),
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updated = [newComment, ...localComments];
    setLocalComments(updated);
    try {
      localStorage.setItem('mantoi_local_comments', JSON.stringify(updated));
    } catch {
      // ignore
    }

    setCommentText('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const directDisqusUrl = `https://disqus.com/home/forum/${disqusShortname}/`;

  return (
    <section className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 my-8">
      {/* Top Header Row */}
      <div className="flex items-center justify-between border-b border-stone-200/80 pb-4 flex-wrap gap-3">
        <div className="flex items-center space-x-2.5">
          <MessageSquare className="w-6 h-6 text-[#535D3B]" />
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-800 tracking-tight">
            Mantoi Family Discussion
          </h3>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <a
            href={typeof window !== 'undefined' ? window.location.href : '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#535D3B] hover:bg-[#424A2E] text-white rounded-full text-xs font-semibold transition-colors shadow-2xs"
          >
            <span>Open App in New Tab</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={handleReloadDisqus}
            title="Reload comments thread"
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-full text-xs font-medium transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Refresh</span>
          </button>
          <div className="bg-[#EFEFE8] text-stone-700 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-stone-300/50 shadow-2xs">
            Powered by Disqus
          </div>
        </div>
      </div>

      {/* Sub-text line */}
      <p className="text-sm text-stone-600 font-normal leading-relaxed">
        Leave feedback, ask questions, or discuss parenting tips!
      </p>

      {/* Iframe Third-Party Cookie Warning Banner */}
      {isInIframe && (
        <div className="flex items-start gap-3 p-4 bg-amber-50/90 border border-amber-200 rounded-2xl text-xs text-amber-900 shadow-2xs">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1.5">
            <p className="font-semibold text-amber-950">
              Browser Security Notice (Embedded Frame):
            </p>
            <p className="text-amber-800 leading-relaxed">
              Modern browsers block third-party login cookies inside embedded preview frames. If you cannot log into Disqus or post comments in this embedded panel, please click{' '}
              <a
                href={typeof window !== 'undefined' ? window.location.href : '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline hover:text-amber-950"
              >
                Open App in New Tab
              </a>{' '}
              to use Disqus seamlessly, or leave a quick message using the in-app feedback box below!
            </p>
          </div>
        </div>
      )}

      {/* In-App Quick Feedback Form */}
      <div className="bg-[#FAF7F2] border border-stone-200/80 rounded-2xl p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Quick In-App Message
          </span>
          {submitted && (
            <span className="inline-flex items-center gap-1 text-xs text-emerald-700 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Posted to discussion list!
            </span>
          )}
        </div>
        <form onSubmit={handleAddLocalComment} className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Your Name / Parent Alias (Optional)"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="px-3.5 py-2 text-xs bg-white border border-stone-300 rounded-xl text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#535D3B] sm:w-1/3"
            />
            <input
              type="text"
              required
              placeholder="Write a quick comment or parenting feedback..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1 px-3.5 py-2 text-xs bg-white border border-stone-300 rounded-xl text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#535D3B]"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#535D3B] hover:bg-[#424A2E] text-white text-xs font-semibold rounded-xl transition-colors shadow-2xs shrink-0"
            >
              <span>Post</span>
              <Send className="w-3 h-3" />
            </button>
          </div>
        </form>

        {/* Display recent local comments if any */}
        {localComments.length > 0 && (
          <div className="pt-2 border-t border-stone-200/60 space-y-2">
            <p className="text-[11px] font-medium text-stone-500">Recent Parent Messages:</p>
            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {localComments.map((comment) => (
                <div key={comment.id} className="bg-white p-2.5 rounded-xl border border-stone-200/60 text-xs">
                  <div className="flex items-center justify-between text-stone-500 mb-1">
                    <span className="font-semibold text-stone-800 flex items-center gap-1">
                      <User className="w-3 h-3 text-[#535D3B]" />
                      {comment.author}
                    </span>
                    <span className="text-[10px]">{comment.createdAt}</span>
                  </div>
                  <p className="text-stone-700">{comment.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Embedded Disqus Forum Thread */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Official Disqus Thread
          </span>
          <a
            href={directDisqusUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#535D3B] hover:underline font-medium inline-flex items-center gap-1"
          >
            <span>View on Disqus.com</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
        <div id="disqus_thread" className="pt-2 min-h-[160px]"></div>
      </div>

      <noscript>
        Please enable JavaScript to view the{' '}
        <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>
      </noscript>
    </section>
  );
};


