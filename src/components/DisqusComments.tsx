import React from 'react';
import { MessageSquare } from 'lucide-react';
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
    <section className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4 my-8">
      {/* Top Header Row */}
      <div className="flex items-center justify-between border-b border-stone-200/80 pb-4 flex-wrap gap-2">
        <div className="flex items-center space-x-2.5">
          <MessageSquare className="w-6 h-6 text-[#535D3B]" />
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-800 tracking-tight">
            Community & Reader Discussion
          </h3>
        </div>
        <div className="bg-[#EFEFE8] text-stone-700 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-stone-300/50 shadow-2xs">
          Powered by Disqus
        </div>
      </div>

      {/* Sub-text line */}
      <p className="text-sm text-stone-600 font-normal leading-relaxed">
        Leave feedback, ask questions, or discuss{' '}
        <strong className="font-semibold text-stone-800">
          EzRead Reader & Parent Community
        </strong>{' '}
        with fellow readers and parents!
      </p>

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








