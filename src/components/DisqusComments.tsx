import React, { useState, useEffect } from 'react';
import { DiscussionEmbed } from 'disqus-react';
import { MessageSquare } from 'lucide-react';

export const DisqusComments: React.FC = () => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleScriptError = (event: ErrorEvent) => {
      if (
        event.message &&
        (event.message.includes('Script error') ||
          event.message.includes('disqus') ||
          event.filename?.includes('disqus'))
      ) {
        setHasError(true);
      }
    };

    window.addEventListener('error', handleScriptError);
    return () => {
      window.removeEventListener('error', handleScriptError);
    };
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

      {hasError ? (
        <div className="p-4 bg-amber-50 text-stone-700 rounded-xl text-sm">
          Disqus comments could not be loaded due to browser tracking protection or iframe cross-origin restrictions. You can visit{' '}
          <a
            href="https://mantoi-finder.disqus.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-800 underline font-semibold"
          >
            mantoi-finder.disqus.com
          </a>{' '}
          directly.
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




