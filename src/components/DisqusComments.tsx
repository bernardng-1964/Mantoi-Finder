import React, { useEffect, useState } from 'react';
import { MessageSquare, ExternalLink } from 'lucide-react';

export const DisqusComments: React.FC = () => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const pageUrl = typeof window !== 'undefined' ? window.location.href.split('#')[0] : 'https://mantoi-finder.disqus.com';
    const pageIdentifier = 'mantoi-character-finder-main';

    try {
      // Set disqus_config globally
      (window as unknown as { disqus_config?: () => void }).disqus_config = function (this: {
        page: { url: string; identifier: string };
      }) {
        this.page.url = pageUrl;
        this.page.identifier = pageIdentifier;
      };

      // If DISQUS global already exists, trigger reload/reset
      const win = window as unknown as { DISQUS?: { reset: (opts: object) => void }; disqus_config?: () => void };
      if (win.DISQUS && typeof win.DISQUS.reset === 'function') {
        try {
          win.DISQUS.reset({
            reload: true,
            config: win.disqus_config,
          });
        } catch (err) {
          console.warn('Disqus reset notice:', err);
        }
      } else {
        // Append embed script directly if not already loaded
        const scriptId = 'disqus-embed-script';
        let s = document.getElementById(scriptId) as HTMLScriptElement | null;
        if (!s) {
          const d = document;
          s = d.createElement('script');
          s.id = scriptId;
          s.src = 'https://mantoi-finder.disqus.com/embed.js';
          s.setAttribute('data-timestamp', (+new Date()).toString());
          s.async = true;
          s.onerror = function (e: Event | string) {
            console.warn('Disqus embed script could not be loaded in this environment.');
            if (typeof e === 'object' && e !== null && 'stopPropagation' in e && typeof e.stopPropagation === 'function') {
              e.stopPropagation();
            }
            setHasError(true);
          };
          (d.head || d.body).appendChild(s);
        }
      }
    } catch (e) {
      console.warn('Disqus initialization notice:', e);
      setHasError(true);
    }
  }, []);

  return (
    <section className="bg-white border border-amber-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4 my-8">
      <div className="flex items-center space-x-2 border-b border-amber-100 pb-4">
        <MessageSquare className="w-5 h-5 text-amber-700" />
        <h3 className="text-xl font-extrabold text-stone-900">
          Parent & Community Discussions
        </h3>
      </div>

      <div id="disqus_thread"></div>

      {hasError && (
        <div className="p-4 bg-amber-50 border border-amber-200/60 text-stone-700 rounded-2xl text-sm flex items-center justify-between flex-wrap gap-2">
          <div>
            <p className="font-medium text-stone-800">Community Discussion Board</p>
            <p className="text-stone-600 text-xs mt-0.5">
              Disqus comments are hosted on our dedicated community page.
            </p>
          </div>
          <a
            href="https://mantoi-finder.disqus.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold transition-colors"
          >
            <span>Join Discussion</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      <noscript>
        Please enable JavaScript to view the{' '}
        <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>
      </noscript>
    </section>
  );
};






