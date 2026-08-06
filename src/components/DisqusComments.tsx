import React, { useEffect } from 'react';
import { DiscussionEmbed } from 'disqus-react';
import { MessageSquare } from 'lucide-react';

export const DisqusComments: React.FC = () => {
  const disqusShortname = 'mantoi-finder';
  const disqusConfig = {
    url: typeof window !== 'undefined' ? window.location.href : 'https://mantoi-finder.disqus.com',
    identifier: 'mantoi-character-finder-main',
    title: 'MANTOI Character Finder',
  };

  useEffect(() => {
    // Fallback direct script loader to guarantee exact element binding if needed
    if (!document.getElementById('disqus_embed_script')) {
      const d = document;
      const s = d.createElement('script');
      s.id = 'disqus_embed_script';
      s.src = 'https://mantoi-finder.disqus.com/embed.js';
      s.setAttribute('data-timestamp', (+new Date()).toString());
      (d.head || d.body).appendChild(s);
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

      <div id="disqus_thread">
        <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
      </div>

      <noscript>
        Please enable JavaScript to view the{' '}
        <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>
      </noscript>
    </section>
  );
};
