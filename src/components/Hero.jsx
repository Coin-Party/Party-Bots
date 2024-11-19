import Image from 'next/image'

import { Button } from '@/components/Button'
import { HeroBackground } from '@/components/HeroBackground'
import blurCyanImage from '@/images/blur-cyan.png'
import blurIndigoImage from '@/images/blur-indigo.png'
import logo from '@/images/logo.png'
import { CodeSample } from './CodeSample'
import { useState } from 'react'


export function TrafficLightsIcon(props) {
    return (
        <svg aria-hidden="true" viewBox="0 0 42 10" fill="none" {...props}>
            <circle cx="5" cy="5" r="4.5" />
            <circle cx="21" cy="5" r="4.5" />
            <circle cx="37" cy="5" r="4.5" />
        </svg>
    )
}

export function Hero() {
    const [loading, setLoading] = useState(false);
    const [versionData, setVersionData] = useState(null);

    const handleGetLatestVersion = async () => {
        setLoading(true);
        try {
            // Placeholder URL for AWS Lambda function
            const response = await fetch('https://example.com/lambda/latest-version', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // Placeholder payload
                    key: 'value',
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setVersionData(data);
            console.log('Latest version data:', data); // For now, just log the response
        } catch (error) {
            console.error('There was an error fetching the latest version:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="overflow-hidden bg-slate-900 dark:-mb-32 dark:mt-[-4.5rem] dark:pb-32 dark:pt-[4.5rem] dark:lg:mt-[-4.75rem] dark:lg:pt-[4.75rem]">
            <div className="py-16 sm:px-2 lg:relative lg:py-20 lg:px-0">
                <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-y-16 gap-x-8 px-4 lg:max-w-8xl lg:grid-cols-2 lg:px-8 xl:gap-x-16 xl:px-12">
                    <div className="relative z-10 md:text-center lg:text-left">
                        <div className="relative">
                            <p className="inline bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">
                                <Image
                                    className="rounded-lg shadow-inner"
                                    src={logo}
                                    alt=""
                                    width={650}
                                    unoptimized
                                    priority
                                />
                            </p>
                            <div className="mt-8 flex gap-4 md:justify-center lg:justify-center">
                                <Button onClick={handleGetLatestVersion} disabled={loading}>
                                    {loading ? 'Loading...' : 'Get The Latest Version'}
                                </Button>
                                <Button href="https://github.com/paulegradie/Party-Bots-Site" variant="secondary">
                                    Get Previous Versions
                                </Button>
                            </div>
                        </div>
                        {versionData && (
                            <div className="mt-4 text-white">
                                Latest Version: {versionData.version || 'N/A'}
                            </div>
                        )}
                    </div>
                    <div className="relative lg:static xl:pl-10">
                        <div className="absolute inset-x-[-50vw] -top-32 -bottom-48 [mask-image:linear-gradient(transparent,white,white)] dark:[mask-image:linear-gradient(transparent,white,transparent)] lg:left-[calc(50%+14rem)] lg:right-0 lg:-top-32 lg:-bottom-32 lg:[mask-image:none] lg:dark:[mask-image:linear-gradient(white,white,transparent)]">
                            <HeroBackground className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 lg:translate-y-[-60%]" />
                        </div>
                        <div className="relative">
                            <CodeSample />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



