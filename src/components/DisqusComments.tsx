import React, { useEffect } from 'react';
import { MessageSquare } from 'lucide-react';

export const DisqusComments: React.FC = () => {
  useEffect(() => {
    const pageUrl = typeof window !== 'undefined' ? window.location.href.split('#')[0] : 'https://mantoi-finder.disqus.com';
    const pageIdentifier = 'mantoi-character-finder-main';

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
      if (!document.getElementById(scriptId)) {
        const d = document;
        const s = d.createElement('script');
        s.id = scriptId;
        s.src = 'https://mantoi-finder.disqus.com/embed.js';
        s.setAttribute('data-timestamp', (+new Date()).toString());
        s.async = true;
        s.onerror = function () {
          console.warn('Disqus embed script could not be loaded in this environment.');
        };
        (d.head || d.body).appendChild(s);
      }
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

      <noscript>
        Please enable JavaScript to view the{' '}
        <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>
      </noscript>
    </section>
  );
};






