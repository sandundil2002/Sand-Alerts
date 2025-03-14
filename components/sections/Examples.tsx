'use client';

import { CheckCircle, XCircle, AlertCircle, Info, Shield, Star } from 'lucide-react';
import AlertCard from "@/components/ui/AlertCard";

export default function Examples() {
    return (
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold tracking-tight text-teal-900 sm:text-4xl">
                    Alert Examples
                </h2>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                    Experience Sand Alerts through these interactive examples. Each card demonstrates a different alert type with its specific styling and sound effects.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                <AlertCard
                    title="Success Alert"
                    description="Indicates a successful operation with a pleasant sound effect and green styling."
                    type="success"
                    message="Operation successful!"
                    icon={CheckCircle}
                    code={`import { useAlert } from 'sand-alerts';
import { CheckCircle } from 'lucide-react';

const SuccessExample = () => {
  const { showAlert } = useAlert();
  return (
    <button onClick={() => showAlert({
      type: 'success',
      message: 'Operation successful!',
      icon: CheckCircle,
      playSound: true,
      soundOptions: { volume: 0.6 }
    })}>
      Trigger Success
    </button>
  );
};`}
                    playSound={true}
                    soundOptions={{ volume: 0.6 }}
                    gradient="bg-gradient-to-r from-emerald-400 to-green-500"
                    buttonColor="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700"
                />

                <AlertCard
                    title="Error Alert"
                    description="Highlights an error with a distinct alert tone and red styling for visibility."
                    type="error"
                    message="An error occurred!"
                    icon={XCircle}
                    code={`import { useAlert } from 'sand-alerts';
import { XCircle } from 'lucide-react';

const ErrorExample = () => {
  const { showAlert } = useAlert();
  return (
    <button onClick={() => showAlert({
      type: 'error',
      message: 'An error occurred!',
      icon: XCircle,
      playSound: true,
      soundOptions: { volume: 0.4 }
    })}>
      Trigger Error
    </button>
  );
};
`}
                    playSound={true}
                    soundOptions={{ volume: 0.4 }}
                    gradient="bg-gradient-to-r from-rose-400 to-red-500"
                    buttonColor="bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700"
                />

                <AlertCard
                    title="Warning Alert"
                    description="Cautions the user with a looping sound option and yellow styling for attention."
                    type="warning"
                    message="Proceed with caution!"
                    icon={AlertCircle}
                    code={`import { useAlert } from 'sand-alerts';
import { AlertCircle } from 'lucide-react';

const WarningExample = () => {
  const { showAlert } = useAlert();
  return (
    <button onClick={() => showAlert({
      type: 'warning',
      message: 'Proceed with caution!',
      icon: AlertCircle,
      playSound: true,
      soundOptions: { loop: true }
    })}>
      Trigger Warning
    </button>
  );
};`}
                    playSound={true}
                    soundOptions={{ loop: true }}
                    gradient="bg-gradient-to-r from-amber-400 to-yellow-500"
                    buttonColor="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700"
                />

                <AlertCard
                    title="Info Alert"
                    description="Provides neutral information with a subtle sound and blue styling."
                    type="info"
                    message="Here is some information."
                    icon={Info}
                    code={`import { useAlert } from 'sand-alerts';
import { Info } from 'lucide-react';

const InfoExample = () => {
  const { showAlert } = useAlert();
  return (
    <button onClick={
        () => showAlert ({
      type: 'info',
      message:
       'Here is some information.',
      icon:
       Info,
      playSound:
       true,
      soundOptions:
       { volume: 0.5 }
    })}>
      Trigger Info
    </button>
  );
};`}
                    playSound={true}
                    soundOptions={{ volume: 0.5 }}
                    gradient="bg-gradient-to-r from-sky-400 to-blue-500"
                    buttonColor="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700"
                />

                <AlertCard
                    title="Double Check Alert"
                    description="Prompts user confirmation with a secure styling and moderate sound."
                    type="confirm"
                    message="Are you sure you want to proceed?"
                    icon={Shield}
                    code={`import { useAlert } from 'sand-alerts';
import { Shield } from 'lucide-react';

const DoubleCheckExample = () => {
  const { showAlert } = useAlert();
  return (
    <button onClick={() => showAlert({
      type: 'confirm',
      message: 'Are you sure you want to proceed?',
      icon: Shield,
      playSound: true,
      soundOptions: { volume: 0.5 },
      confirm: {
        onConfirm: () => SuccessAlert(),
        onCancel: () => CancelAlert()
      }
    })}>
      Trigger Double Check
    </button>
  );
};`}
                    playSound={true}
                    soundOptions={{ volume: 0.5 }}
                    gradient="bg-gradient-to-r from-orange-400 to-amber-500"
                    buttonColor="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700"
                />

                <AlertCard
                    title="Custom Alert"
                    description="A fully customized alert with animations, custom icon, and unique styling."
                    type="custom"
                    message="Custom alert activated!"
                    icon={Star}
                    code={`import { useAlert } from 'sand-alerts';
import { Star } from 'lucide-react';

const CustomExample = () => {
  const { showAlert } = useAlert();
  return (
    <button onClick={
        () => showAlert({
      type: 'custom',
      message: 
      'Custom alert activated!',
      icon: Star,
      playSound: true,
      soundOptions: { volume: 0.7,
       customSound: '/sounds/custom.mp3' },
      animation: 'slide',
      duration: 5000
    })}>
      Trigger Custom
    </button>
  );
};`}
                    playSound={true}
                    soundOptions={{ volume: 0.7 }}
                    gradient="bg-gradient-to-r from-violet-400 to-purple-500"
                    buttonColor="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700"
                />
            </div>

            <div className="mt-6 text-center bg-gray-50 p-10 rounded-2xl shadow-sm">
                <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-teal-900">
                    Ready to Implement Sand Alerts?
                </h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Explore detailed implementation guides and advanced configuration options to fully customize alerts for your application.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                    <button
                        onClick={() => window.location.href = '/usage'}
                        className="rounded-md border border-teal-600 bg-teal-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-teal-50 hover:text-teal-700"
                    >
                        View Usage Guide
                    </button>
                    <button
                        onClick={() => window.location.href = '/configuration'}
                        className="rounded-md border border-teal-600 px-5 py-3 text-sm font-semibold text-teal-600 hover:bg-teal-600 hover:text-white focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                    >
                        Explore Configuration
                    </button>
                </div>
            </div>
        </div>
    );
}