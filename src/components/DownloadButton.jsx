import React, { useEffect, useState } from 'react';
import Link from 'next/link'

const extractWindowsVersion = (url) => {
    const match = url.match(/PartyBots-Windows-([\d.]+)\.zip/);
    return match ? match[1] : null;
};
const extractUnixVersion = (url) => {
    const match = url.match(/PartyBots-Unix-([\d.]+)\.zip/);
    return match ? match[1] : null;
};

const DownloadSection = ({ windowsVersionLink, unixVersionLink, loading }) => {

    let windowsVersion;
    let unixVersion;
    if (!loading) {
        windowsVersion = extractWindowsVersion(windowsVersionLink);
        unixVersion = extractUnixVersion(unixVersionLink);
    } else {

        windowsVersion = "";
        unixVersion = "";
    }


    return (
        <div className="mt-8 flex flex-col gap-8 md:justify-center lg:justify-center items-center">
            {/* Download text styled to be large, bold, and white */}
            <div className="text-4xl font-bold text-white">
                Download
            </div>
            {/* Button section */}
            <div className="flex gap-4">
                <Link
                    href={loading ? "" : windowsVersionLink}
                    disabled={loading || !windowsVersionLink}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                    {loading ? 'Loading...' : `Windows ${windowsVersion || ''}`}
                </Link>
                <Link
                    href={loading ? "" : unixVersionLink}
                    disabled={loading || !unixVersionLink}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50"
                    >
                    {loading ? 'Loading...' : `Unix  ${unixVersion || ''}`}
                </Link>
            </div>
        </div>
    );
};

export default DownloadSection;
