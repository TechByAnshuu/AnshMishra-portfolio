import { useEffect, useState } from 'react';

export default function Loading() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return prev + 10;
            });
        }, 100);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
            <div className="text-center space-y-6">
                <div className="relative">
                    <div className="text-7xl md:text-9xl font-heading font-semibold tracking-[0.15em] animate-pulse text-gray-900 dark:text-white drop-shadow-[0_0_10px_rgba(0,0,0,0.2)]">
                        ANSH MISHRA
                    </div>
                    <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-white transition-all duration-300 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
                <p className="text-sm text-foreground/60 animate-pulse">Loading portfolio...</p>
            </div>
        </div>
    );
}
