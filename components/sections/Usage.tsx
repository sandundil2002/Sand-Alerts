'use client';

import CodeBlock from "@/components/ui/CodeBlock";

export default function Usage() {
    const basicUsageCode = `import { useAlert } from '@/lib/hooks/useAlert';
import { CheckCircle } from 'lucide-react';

const MyComponent = () => {
  const { showAlert } = useAlert();

  const handleClick = () => {
    showAlert({
      type: 'success',
      message: 'Operation completed successfully!',
      icon: CheckCircle,
      playSound: true,
      soundOptions: { volume: 0.5 }
    });
  };

  return (
    <button onClick={handleClick} className="btn">
      Show Success Alert
    </button>
  );
};

export default MyComponent;`;

    const customIconCode = `import { useAlert } from '@/lib/hooks/useAlert';
import { Star } from 'lucide-react';

const CustomAlertComponent = () => {
  const { showAlert } = useAlert();

  const handleClick = () => {
    showAlert({
      type: 'info',
      message: 'This alert uses a custom icon!',
      icon: Star,
      duration: 5000
    });
  };

  return (
    <button onClick={handleClick} className="btn">
      Show Custom Icon Alert
    </button>
  );
};

export default CustomAlertComponent;`;
    return (
        <div>
            <div className="text-center mx-2 mb-16 mt-6">
                <h2 className="text-3xl font-bold tracking-tight text-teal-900 sm:text-4xl">
                    How to Use Sand Alerts
                </h2>
                <p className="mt-4 text-lg max-w-3xl mx-auto">
                    Learn how to integrate and customize Sand Alerts in your Next.js application with these
                    practical examples.
                </p>
            </div>

            <div className="space-y-12">
                <section className="bg-white rounded-xl shadow-sm p-6 mx-4 border border-teal-700">
                    <h3 className="text-xl font-semibold mb-4">Basic Usage</h3>
                    <p className="text-gray-600 mb-4">
                        Trigger a simple success alert with sound using the <code>useAlert</code> hook.
                    </p>
                    <CodeBlock
                        code={basicUsageCode}
                        onCopy={() => navigator.clipboard.writeText(basicUsageCode)}
                    />
                </section>

                <section className="bg-white rounded-xl shadow-sm p-6 mx-4 border border-teal-700">
                    <h3 className="text-xl font-semibold mb-4">Custom Icon</h3>
                    <p className="text-gray-600 mb-4">
                        Customize the alert icon with any Lucide React icon and set an auto-dismiss duration.
                    </p>
                    <CodeBlock
                        code={customIconCode}
                        onCopy={() => navigator.clipboard.writeText(customIconCode)}
                    />
                </section>
            </div>

            <div className="mt-10 mb-6 text-center">
                <h3 className="text-2xl text-teal-900 font-semibold mb-4">Ready to Configure More?</h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Dive into the Configuration page to explore advanced options like animations, sound
                    settings, and more.
                </p>
                <button
                    onClick={() => window.location.href = '/configuration'}
                    className="mt-6 rounded-md bg-teal-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                >
                    View Configuration
                </button>
            </div>
        </div>
    );
}