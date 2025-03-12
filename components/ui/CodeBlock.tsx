'use client';

import { Copy } from 'lucide-react';

interface CodeBlockProps {
    code: string;
    onCopy: () => void;
}

export default function CodeBlock({ code, onCopy }: CodeBlockProps) {
    return (
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
      <pre className="text-sm overflow-x-auto">
        <code>{code}</code>
      </pre>
            <button
                onClick={onCopy}
                className="mt-2 text-xs flex items-center gap-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
                <Copy className="h-3 w-3" />
                Copy code
            </button>
        </div>
    );
}