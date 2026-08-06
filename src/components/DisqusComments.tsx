import React, { useEffect, useState } from 'react';
import { DiscussionEmbed } from 'disqus-react';
import { MessageSquare } from 'lucide-react';

export const DisqusComments: React.FC = () => {
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    // Configure global disqus_config window object if needed by disqus embed
    (window as unknown as { disqus_config?: () => void }).disqus_config = function () {
      const pageConfig = this as unknown as { page: { url: string; identifier: string } };
      pageConfig.page.url = window.location.href.split('#')[0];
      pageConfig.page.identifier = 'mantoi-character-finder-main';
    };

    // Inject embed.js directly if not already present
    const existingScript = document.getElementById('disqus-embed-script');
    if (!existingScript) {
      const d = document;
      const s = d.createElement('script');
      s.id = 'disqus-embed-script';
      s.src = 'https://mantoi-finder.disqus.com/embed.js';
      s.setAttribute('data-timestamp', (+new Date()).toString());
      s.async = true;
      s.onerror = () => {
        setLoadError(true);
      };
      (d.head || d.body).appendChild(s);
    }
  }, []);

  const disqusShortname = 'mantoi-finder';
  const disqusConfig = {
    url: typeof window !== 'undefined' ? window.location.href.split('#')[0] : 'https://mantoi-finder.disqus.com',
    identifier: 'mantoi-character-finder-main',
    title: 'MANTOI Character Finder',
  };

  return (
    <section className="bg-white border border-amber-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4 my-8">
      <div className="flex items-center space-x-2 border-b border-amber-100 pb-4">
        <MessageSquare className="w-5 h-5 text-amber-700" />
        <h3 className="text-xl font-extrabold text-stone-900">
          Parent & Community Discussions
        </h3>
      </div>

      {loadError ? (
        <div className="p-4 bg-amber-50 text-stone-700 rounded-xl text-sm space-y-2">
          <p>
            Disqus comments thread is hosted at{' '}
            <a
              href="https://mantoi-finder.disqus.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-800 underline font-semibold"
            >
              mantoi-finder.disqus.com
            </a>.
          </p>
        </div>
      ) : (
        <div id="disqus_thread">
          <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
        </div>
      )}

      <noscript>
        Please enable JavaScript to view the{' '}
        <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>
      </noscript>
    </section>
  );
};




