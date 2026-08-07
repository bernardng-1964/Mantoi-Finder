import React from 'react';
import { MessageSquare, ExternalLink } from 'lucide-react';
import { DiscussionEmbed } from 'disqus-react';

export const DisqusComments: React.FC = () => {
  const disqusShortname = 'mantoi-finder';
  const pageUrl = typeof window !== 'undefined' ? window.location.href.split('#')[0] : 'https://mantoi-finder.disqus.com';
  
  const disqusConfig = {
    url: pageUrl,
    identifier: 'mantoi-character-finder-main',
    title: 'MANTOI Character Finder Community Discussion',
    language: 'en',
  };

  return (
    <section className="bg-white border border-amber-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4 my-8">
      <div className="flex items-center justify-between border-b border-amber-100 pb-4 flex-wrap gap-2">
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-5 h-5 text-amber-700" />
          <h3 className="text-xl font-extrabold text-stone-900">
            Parent & Community Discussions
          </h3>
        </div>
        <a
          href="https://mantoi-finder.disqus.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl text-xs font-semibold transition-colors"
        >
          <span>Open Forum</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
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







