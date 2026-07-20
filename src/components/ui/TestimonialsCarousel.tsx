'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar?: string;
}

export interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  interval?: number;
}

export function TestimonialsCarousel({
  testimonials,
  autoPlay = true,
  interval = 5000,
}: TestimonialsCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, next]);

  // Pause on hover
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!autoPlay || isPaused) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, next, isPaused]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <div
      className="relative w-full max-w-3xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Testimonials"
      aria-roledescription="carousel"
    >
      {/* Testimonial Card */}
      <div className="relative min-h-[280px] sm:min-h-[240px]">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
            }}
            className="absolute inset-0"
            role="group"
            aria-roledescription="slide"
            aria-label={`Testimonial ${current + 1} of ${testimonials.length}`}
          >
            <div className="bg-background-elevated border border-border rounded-2xl p-8 sm:p-10 shadow-lg">
              <blockquote className="text-center">
                <svg
                  className="h-10 w-10 mx-auto mb-6 text-accent/30"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
                </svg>
                <p className="text-lg sm:text-xl text-text-primary mb-6 italic leading-relaxed">
                  &ldquo;{testimonials[current].quote}&rdquo;
                </p>
                <div className="mt-4">
                  <div className="flex items-center justify-center gap-3">
                    {testimonials[current].avatar && (
                      <Image
                        src={testimonials[current].avatar}
                        alt=""
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    )}
                    <div className="text-left">
                      <cite className="not-italic font-semibold text-text-primary block">
                        {testimonials[current].author}
                      </cite>
                      <span className="text-sm text-text-secondary">
                        {testimonials[current].role}
                      </span>
                    </div>
                  </div>
                </div>
              </blockquote>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        type="button"
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-12 p-2 rounded-full bg-background-elevated border border-border shadow-md text-text-secondary hover:text-text-primary hover:shadow-lg transition-all"
        aria-label="Previous testimonial"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-12 p-2 rounded-full bg-background-elevated border border-border shadow-md text-text-secondary hover:text-text-primary hover:shadow-lg transition-all"
        aria-label="Next testimonial"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6" role="tablist" aria-label="Testimonial slides">
        {testimonials.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goTo(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
              index === current
                ? 'bg-accent w-6'
                : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
            }`}
            role="tab"
            aria-selected={index === current}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
