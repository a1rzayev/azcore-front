"use client";

import { useState, useEffect } from "react";

type ProjectImage = {
  id: string;
  path: string;
  alt: string | null;
  order: number;
};

type PortfolioProject = {
  id: string;
  title: string;
  description: string;
  order: number;
  images: ProjectImage[];
};

export function PortfolioSlideshow({
  projects,
}: {
  projects: PortfolioProject[];
}) {
  const [projectIndex, setProjectIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const project = projects[projectIndex];
  const images = project?.images ?? [];
  const currentImage = images[imageIndex];

  useEffect(() => {
    if (isPaused || images.length <= 1) return;
    const t = setInterval(() => {
      setImageIndex((i) => (i + 1) % images.length);
    }, 4000);
    return () => clearInterval(t);
  }, [images.length, isPaused]);

  useEffect(() => {
    setImageIndex(0);
  }, [projectIndex]);

  if (!project) return null;

  return (
    <div className="mt-12 space-y-6">
      {/* Project selector */}
      <div className="flex flex-wrap gap-2 justify-center">
        {projects.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setProjectIndex(i)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              i === projectIndex
                ? "bg-primary-600 text-white"
                : "bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-slate-600"
            }`}
          >
            {p.title}
          </button>
        ))}
      </div>

      {/* Slideshow */}
      <div
        className="relative rounded-xl overflow-hidden bg-gray-100 dark:bg-slate-800 aspect-video max-w-4xl mx-auto"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {images.length > 0 ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentImage?.path}
              alt={currentImage?.alt || project.title}
              className="w-full h-full object-contain transition-opacity duration-500"
            />

            {/* Image dots */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setImageIndex(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i === imageIndex
                        ? "bg-white"
                        : "bg-white/50 hover:bg-white/75"
                    }`}
                    aria-label={`Go to image ${i + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Prev/Next */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setImageIndex((i) => (i - 1 + images.length) % images.length)
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                  aria-label="Previous image"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  onClick={() =>
                    setImageIndex((i) => (i + 1) % images.length)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                  aria-label="Next image"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
            No images for this project
          </div>
        )}
      </div>

      {/* Description */}
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {project.title}
        </h3>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {project.description}
        </p>
      </div>
    </div>
  );
}
