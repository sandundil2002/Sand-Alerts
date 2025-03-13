'use client';

import CodeBlock from "@/components/ui/CodeBlock";

export default function Configuration() {
    const soundConfigCode = `import { useAlert } from '@/lib/hooks/useAlert';
import { AlertCircle } from 'lucide-react';

const SoundAlertComponent = () => {
  const { showAlert } = useAlert();

  const handleClick = () => {
    showAlert({
      type: 'warning',
      message: 'Warning: Low battery!',
      icon: AlertCircle,
      playSound: true,
      soundOptions: {
        volume: 0.7,
        loop: true,
        customSound: '/sounds/warning.mp3'
      }
    });
  };

  return (
    <button onClick={handleClick} className="btn">
      Show Warning Alert with Sound
    </button>
  );
};

export default SoundAlertComponent;`;

    const animationConfigCode = `import { useAlert } from '@/lib/hooks/useAlert';
import { Info } from 'lucide-react';

const AnimatedAlertComponent = () => {
  const { showAlert } = useAlert();

  const handleClick = () => {
    showAlert({
      type: 'info',
      message: 'This alert slides in!',
      icon: Info,
      animation: {
        enter: 'slideIn',
        exit: 'fadeOut',
        duration: 300 
      },
      duration: 4000
    });
  };

  return (
    <button onClick={handleClick} className="btn">
      Show Animated Alert
    </button>
  );
};

export default AnimatedAlertComponent;`;

    return (
        <div>
            <div className="text-center mb-16 mt-6 mx-2">
                <h2 className="text-3xl font-bold text-teal-900 tracking-tight sm:text-4xl">
                    Configuring Sand Alerts
                </h2>
                <p className="mt-4 text-lg max-w-3xl mx-auto">
                    Customize Sand Alerts with advanced options like sound effects, animations, and more to
                    suit your application’s needs.
                </p>
            </div>

            <div className="space-y-12">
                <section className="bg-white rounded-xl shadow-sm p-6 border border-teal-700 mx-4">
                    <h3 className="text-xl font-semibold mb-4">Sound Configuration</h3>
                    <p className="text-gray-600 mb-4">
                        Enhance alerts with custom sound effects, volume control, and looping options.
                    </p>
                    <CodeBlock
                        code={soundConfigCode}
                        onCopy={() => navigator.clipboard.writeText(soundConfigCode)}
                    />
                </section>

                <section className="bg-white rounded-xl shadow-sm p-6 border border-teal-700 mx-4">
                    <h3 className="text-xl font-semibold mb-4">Animation Configuration</h3>
                    <p className="text-gray-600 mb-4">
                        Add smooth enter and exit animations to make alerts visually engaging.
                    </p>
                    <CodeBlock
                        code={animationConfigCode}
                        onCopy={() => navigator.clipboard.writeText(animationConfigCode)}
                    />
                </section>
            </div>

            <div className="mt-10 mb-6 text-center">
                <h3 className="text-2xl text-teal-900 font-semibold mb-4">Ready to Get Started?</h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Head to the Getting Started page to set up Sand Alerts in your project and start using
                    these configurations.
                </p>
                <button
                    onClick={() => window.location.href = '/#getting-started'}
                    className="mt-6 rounded-md bg-teal-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                >
                    Get Started
                </button>
            </div>
        </div>
    );
}