import React, { Component, ReactNode } from 'react';
import { DiscussionEmbed } from 'disqus-react';
import { MessageSquare, ExternalLink } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class DisqusErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  declare props: ErrorBoundaryProps;
  declare state: ErrorBoundaryState;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('Disqus embed could not be rendered:', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export const DisqusComments: React.FC = () => {
  const disqusShortname = 'mantoi-finder';
  const disqusConfig = {
    url: typeof window !== 'undefined' ? window.location.href.split('#')[0] : 'https://mantoi-finder.disqus.com',
    identifier: 'mantoi-character-finder-main',
    title: 'MANTOI Character Finder',
  };

  const FallbackUI = (
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
  );

  return (
    <section className="bg-white border border-amber-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4 my-8">
      <div className="flex items-center space-x-2 border-b border-amber-100 pb-4">
        <MessageSquare className="w-5 h-5 text-amber-700" />
        <h3 className="text-xl font-extrabold text-stone-900">
          Parent & Community Discussions
        </h3>
      </div>

      <DisqusErrorBoundary fallback={FallbackUI}>
        <div id="disqus_thread">
          <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
        </div>
      </DisqusErrorBoundary>

      <noscript>
        Please enable JavaScript to view the{' '}
        <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>
      </noscript>
    </section>
  );
};





