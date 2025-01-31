'use client';

import React, { useState, useCallback, memo } from 'react';

interface ParagraphExpandableProps {
  text: string;
  maxLength?: number;
  className?: string;
  expandText?: string;
  collapseText?: string;
}

const ParagraphExpandable = memo(({
  text,
  maxLength = 150,
  className = '',
  expandText = 'Read more',
  collapseText = 'Read less'
}: ParagraphExpandableProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = text.length > maxLength;

  const toggleExpand = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  const displayText = shouldTruncate && !isExpanded 
    ? `${text.slice(0, maxLength)}...` 
    : text;

  if (!shouldTruncate) {
    return <p className={className}>{text}</p>;
  }

  return (
    <div className={`${className}`}>
      <p className="inline transition-all duration-300">
        {displayText}
        {" "}
        <button
          onClick={toggleExpand}
          className="text-primary hover:text-primary/80 font-medium inline-block transition-colors underline"
          aria-expanded={isExpanded}
          aria-controls="expandable-text"
        >
          {isExpanded ? collapseText : expandText}
        </button>
      </p>
    </div>
  );
});

ParagraphExpandable.displayName = 'ParagraphExpandable';

export default ParagraphExpandable;