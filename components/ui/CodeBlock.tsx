import { Copy } from 'lucide-react';
import { useState } from 'react';

interface CodeBlockProps {
    code: string;
    onCopy: () => void;
}

export default function CodeBlock({ code, onCopy }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        onCopy();
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-teal-50 dark:bg-teal-900 rounded-lg p-4 border border-teal-200 dark:border-teal-700">
            <pre className="text-sm overflow-x-auto whitespace-pre-wrap break-words">
                <code className="text-teal-900 dark:text-teal-100">{code}</code>
            </pre>
            <button
                onClick={handleCopy}
                className="mt-2 text-xs flex items-center gap-1 text-teal-600 dark:text-teal-300 hover:text-teal-700 dark:hover:text-teal-200 transition-colors"
                aria-label="Copy code to clipboard"
            >
                <Copy className="h-3 w-3" />
                {copied ? 'Copied!' : 'Copy code'}
            </button>
        </div>
    );
}