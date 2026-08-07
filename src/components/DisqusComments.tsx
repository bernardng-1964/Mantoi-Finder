import React, { useState, useEffect } from 'react';
import { MessageSquare, ExternalLink, Info, RefreshCw } from 'lucide-react';

export const DisqusComments: React.FC = () => {
  const disqusShortname = 'mantoi-finder';
  const [isInIframe, setIsInIframe] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Detect iframe environment
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
        setLoaded(true);
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
        s.onload = () => setLoaded(true);
        s.onerror = () => setLoaded(false);
        (d.head || d.body).appendChild(s);
      } else {
        setLoaded(true);
      }
    }
  }, []);

  const handleReloadDisqus = () => {
    if ((window as any).DISQUS) {
      (window as any).DISQUS.reset({
        reload: true,
        config: (window as any).disqus_config,
      });
    } else {
      window.location.reload();
    }
  };

  const directDisqusUrl = `https://disqus.com/home/forum/${disqusShortname}/`;

  return (
    <section className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4 my-8">
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

      {/* Iframe Cookie / Login Notice Banner */}
      {isInIframe && (
        <div className="flex items-start gap-3 p-4 bg-amber-50/90 border border-amber-200 rounded-2xl text-xs text-amber-900 shadow-2xs">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1.5">
            <p className="font-semibold text-amber-950">
              Note on commenting inside the preview panel:
            </p>
            <p className="text-amber-800 leading-relaxed">
              Browser security policies block third-party authentication cookies inside embedded iframe previews.
              If you have trouble logging in or submitting comments below, please click{' '}
              <a
                href={typeof window !== 'undefined' ? window.location.href : '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline hover:text-amber-950"
              >
                Open App in New Tab
              </a>{' '}
              or visit the{' '}
              <a
                href={directDisqusUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline hover:text-amber-950"
              >
                Mantoi Forum directly on Disqus
              </a>
              .
            </p>
          </div>
        </div>
      )}

      {/* Embedded Disqus Forum Thread */}
      <div id="disqus_thread" className="pt-2 min-h-[160px]"></div>

      <noscript>
        Please enable JavaScript to view the{' '}
        <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>
      </noscript>
    </section>
  );
};

