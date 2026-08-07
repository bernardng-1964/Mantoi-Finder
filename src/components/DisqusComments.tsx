import React, { useState, useEffect } from 'react';
import { MessageSquare, ExternalLink, Info } from 'lucide-react';
import { DiscussionEmbed } from 'disqus-react';

export const DisqusComments: React.FC = () => {
  const disqusShortname = 'mantoi-finder';
  const [isInIframe, setIsInIframe] = useState(false);

  useEffect(() => {
    try {
      setIsInIframe(window.self !== window.top);
    } catch {
      setIsInIframe(true);
    }

    // Set up disqus_config on window as requested
    const canonicalUrl = typeof window !== 'undefined'
      ? window.location.origin + window.location.pathname
      : 'https://mantoi-finder.disqus.com';

    (window as any).disqus_config = function (this: any) {
      this.page.url = canonicalUrl;
      this.page.identifier = 'mantoi-character-finder-main';
    };

    // Load embed script if not present, or trigger DISQUS.reset if already present
    if ((window as any).DISQUS) {
      (window as any).DISQUS.reset({
        reload: true,
        config: (window as any).disqus_config,
      });
    } else {
      const d = document;
      let s = document.getElementById('disqus-embed-script') as HTMLScriptElement | null;
      if (!s) {
        s = d.createElement('script');
        s.id = 'disqus-embed-script';
        s.src = 'https://mantoi-finder.disqus.com/embed.js';
        s.setAttribute('data-timestamp', (+new Date()).toString());
        (d.head || d.body).appendChild(s);
      }
    }
  }, []);

  const canonicalUrl = typeof window !== 'undefined'
    ? window.location.origin + window.location.pathname
    : 'https://mantoi-finder.disqus.com';

  const disqusConfig = {
    url: canonicalUrl,
    identifier: 'mantoi-character-finder-main',
    title: 'MANTOI Character Finder Community Discussion',
    language: 'en',
  };

  const directDisqusUrl = `https://disqus.com/home/discussion/${disqusShortname}/mantoi_character_finder_community_discussion/`;

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
        <div className="flex items-center gap-2">
          <a
            href={typeof window !== 'undefined' ? window.location.href : '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#535D3B] hover:bg-[#424A2E] text-white rounded-full text-xs font-semibold transition-colors shadow-2xs"
          >
            <span>Open App in New Tab</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <div className="bg-[#EFEFE8] text-stone-700 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-stone-300/50 shadow-2xs">
            Powered by Disqus
          </div>
        </div>
      </div>

      {/* Sub-text line */}
      <p className="text-sm text-stone-600 font-normal leading-relaxed">
        Leave feedback, ask questions, or discuss parenting tips!
      </p>

      {/* Iframe Cookie Notice Banner */}
      {isInIframe && (
        <div className="flex items-start gap-3 p-3.5 bg-amber-50/80 border border-amber-200/80 rounded-2xl text-xs text-amber-900">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold">Having trouble logging in or posting comments inside the preview?</p>
            <p className="text-amber-800">
              Browser security blocks third-party Disqus login cookies inside embedded preview frames. Click{' '}
              <a
                href={typeof window !== 'undefined' ? window.location.href : '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline hover:text-amber-950"
              >
                Open App in New Tab
              </a>{' '}
              or{' '}
              <a
                href={directDisqusUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline hover:text-amber-950"
              >
                Post Directly on Disqus
              </a>{' '}
              to submit comments seamlessly.
            </p>
          </div>
        </div>
      )}

      {/* Embedded Disqus Forum */}
      <div id="disqus_thread" className="pt-2">
        <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
      </div>

      <noscript>
        Please enable JavaScript to view the{' '}
        <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>
      </noscript>
    </section>
  );
};
