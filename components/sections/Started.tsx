'use client';

import CodeBlock from "@/components/ui/CodeBlock";

export default function GettingStarted() {
    const installCode = `npm install sand-alerts lucide-react`;

    const setupCode = `// app/layout.tsx
import { AlertProvider } from 'sand-alerts';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AlertProvider>
          {children}
        </AlertProvider>
      </body>
    </html>
  );
};
`;

    const usageCode = `// components/MyComponent.tsx

import { CheckCircle } from 'lucide-react';

export default function MyComponent() {
  const { showAlert } = useAlert();

  const handleClick = () => {
    showAlert({
      type: 'success',
      message: 'Welcome to Sand Alerts!',
      icon: CheckCircle,
    });
  };

  return (
    <button onClick={handleClick} className="btn">
      Show Welcome Alert
    </button>
  );
};
`;

    return (
        <div>
            <div className="text-center mb-16 mt-6">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-teal-900 ">Getting Started</h2>
                <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                    Follow these simple steps to install and start using Sand Alerts in your Next.js
                    application.
                </p>
            </div>

            <div className="space-y-12">
                <section className=" rounded-xl shadow-sm p-6 border border-teal-700 mx-4">
                    <h3 className="text-xl font-semibold mb-4">1. Installation</h3>
                    <p className="text-gray-600 mb-4">
                        Sand Alerts is currently in development and will be available for installation soon!
                        Stay tuned for a simple setup process that integrates seamlessly with your Next.js
                        projects.
                    </p>
                    <div className="bg-teal-50 dark:bg-teal-800 rounded-lg p-4 border border-teal-700">
                        <h4 className="text-lg font-medium text-teal-800 dark:text-teal-100 mb-2">Coming Soon</h4>
                        <p className="text-teal-600 dark:text-teal-200">
                            We’re working hard to bring you a powerful alert system. Want to be the first to know
                            when it’s ready? Follow us on{' '}
                            <a
                                href="https://github.com/sandundil2002/Sand-Alerts.git"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-teal-700 dark:text-teal-300 hover:underline"
                            >
                                GitHub
                            </a>{' '}
                        </p>
                    </div>
                </section>

                <section className="bg-white rounded-xl shadow-sm p-6 border border-teal-700 mx-4">
                    <h3 className="text-xl font-semibold mb-4">2. Setup</h3>
                    <p className="text-gray-600 mb-4">
                        Wrap your application with the <code>AlertProvider</code> to enable alert
                        functionality across components.
                    </p>
                    <CodeBlock code={setupCode} onCopy={() => navigator.clipboard.writeText(setupCode)} />
                </section>

                <section className="bg-white rounded-xl shadow-sm p-6 border border-teal-700 mx-4">
                    <h3 className="text-xl font-semibold mb-4">3. Basic Usage</h3>
                    <p className="text-gray-600 mb-4">
                        Use the <code>useAlert</code> hook in your components to trigger alerts.
                    </p>
                    <CodeBlock code={usageCode} onCopy={() => navigator.clipboard.writeText(usageCode)} />
                </section>
            </div>

            <div className="mt-10 mb-6 text-center">
                <h3 className="text-2xl text-teal-900 font-semibold mb-4">All Set?</h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Explore the Usage page to see more examples or dive into Features to learn about all the
                    possibilities with Sand Alerts.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
                    <button
                        onClick={() => window.location.href = '/#usage'}
                        className="rounded-md border border-teal-600 bg-teal-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-teal-50 hover:text-teal-700"
                    >
                        View Usage Examples
                    </button>
                    <button
                        onClick={() => window.location.href = '/#features'}
                        className="rounded-md border border-teal-600 px-5 py-3 text-sm font-semibold text-teal-600 hover:bg-teal-600 hover:text-white focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                    >
                        Explore Features
                    </button>
                </div>
            </div>
        </div>
    );
}