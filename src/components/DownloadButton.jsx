import React from 'react';
import { Button } from '@/components/Button';

const DownloadSection = ({ windowsVersionLink, unixVersionLink, loading }) => {
    return (
        <div className="mt-8 flex flex-col gap-8 md:justify-center lg:justify-center items-center">
            {/* Download text styled to be large, bold, and white */}
            <div className="text-4xl font-bold text-white">
                Download
            </div>

            {/* Button section */}
            <div className="flex gap-4">
                <Button
                    href={windowsVersionLink}
                    disabled={loading || !windowsVersionLink}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? 'Loading...' : 'Windows'}
                </Button>
                <Button
                    href={unixVersionLink}
                    disabled={loading || !unixVersionLink}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                    {loading ? 'Loading...' : 'Unix'}
                </Button>
            </div>
        </div>
    );
};

export default DownloadSection;
