import React from 'react';

const SkeletonCard = () => {
    return (
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl h-full flex flex-col">
            {/* Image Skeleton */}
            <div className="h-64 skeleton"></div>

            {/* Content Skeleton */}
            <div className="p-5 flex-1 flex flex-col gap-4">
                {/* Title Skeleton */}
                <div className="h-6 skeleton w-3/4"></div>

                {/* Tags Skeleton */}
                <div className="flex gap-2">
                    <div className="h-6 skeleton w-20"></div>
                    <div className="h-6 skeleton w-24"></div>
                    <div className="h-6 skeleton w-16"></div>
                </div>

                {/* Footer Skeleton */}
                <div className="mt-auto pt-4 border-t border-slate-100">
                    <div className="h-4 skeleton w-32"></div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonCard;
