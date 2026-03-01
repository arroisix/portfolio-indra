import * as React from 'react';

interface VideoShowcaseProps {
    url: string;
    altText?: string;
}

export default function VideoShowcase({ url, altText }: VideoShowcaseProps) {
    return (
        <div className="video-showcase-container relative w-full overflow-hidden rounded-2xl bg-[#090909]">
            {/* Main frame - padding on top and sides only, increased horizontal padding */}
            <div className="video-showcase-frame relative w-full overflow-hidden pt-4 md:pt-6 lg:pt-8 px-[10%]">
                {/* Animated background blob 1 */}
                <div className="video-showcase-blob-1 absolute pointer-events-none rounded-full w-1/2 h-full right-0 top-0 bg-[#473367] opacity-40 blur-[124px]" />

                {/* Animated background blob 2 */}
                <div className="video-showcase-blob-2 absolute pointer-events-none rounded-full w-[65%] h-[120%] left-[20%] -top-[20%] bg-[#250060] opacity-50 blur-[124px]" />

                {/* Video container with special border and corner radius */}
                <div className="relative z-10 rounded-t-xl border-2 border-[#1B1B1B] border-b-0 overflow-hidden">
                    <video
                        src={url}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-auto block"
                        aria-label={altText || 'Project video showcase'}
                    />
                </div>
            </div>
        </div>
    );
}
