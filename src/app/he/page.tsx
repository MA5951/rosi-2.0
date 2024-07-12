"use client"

import Image from "next/image";
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faBolt, faUsers, faIndustry, faPencil, faWrench, faPlus, faStar } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'dark';
    setIsDarkMode(isDark);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (      
    <main className="flex min-h-screen flex-col items-center justify-between bg-blue-50 dark:bg-slate-900 text-gray-900 dark:text-white">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
      </div>

      <div>
        <Image
          src={isDarkMode ? "/images/dark_rosi.png" : "/images/light_rosi.png"}
          alt="ROSI Logo"
          style={{marginTop: isMobile ? '20vh' : '15%'}}
          width={900}
          height={500}
          priority
        />
      </div>     

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
      <a
        href="/he/programming"
        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
      >
        <h2 className="mb-3 text-2xl font-semibold">
          <FontAwesomeIcon icon={faCode} className="mr-2" />
          תוכנה{" "}
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -&gt;
          </span>
        </h2>
        <p className="m-0 max-w-[30ch] text-sm opacity-50">
          Find in-depth information about Next.js features and API.
        </p>
      </a>

        <a
          href="/he/electrical"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"

        >
          <h2 className="mb-3 text-2xl font-semibold">
            <FontAwesomeIcon icon={faBolt} className="mr-2" />
            אלקטרוניקה{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="/he/manufacturing"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"

        >
          <h2 className="mb-3 text-2xl font-semibold">
            <FontAwesomeIcon icon={faIndustry} className="mr-2" />
            ייצור{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Explore starter templates for Next.js.
          </p>
        </a>

        <a
          href="/he/cad"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"

        >
          <h2 className="mb-3 text-2xl font-semibold">
            <FontAwesomeIcon icon={faPencil} className="mr-2" />
            שרטוט{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-balance text-sm opacity-50">
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        <a
          href="/he/community"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"

        >
          <h2 className="mb-3 text-2xl font-semibold">
            <FontAwesomeIcon icon={faUsers} className="mr-2" />
            קהילה{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="/he/mechanics"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"

        >
          <h2 className="mb-3 text-2xl font-semibold">
            <FontAwesomeIcon icon={faWrench} className="mr-2" />
            מכניקה{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="/he/contribute"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"

        >
          <h2 className="mb-3 text-2xl font-semibold">
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            העלת תוכן{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Explore starter templates for Next.js.
          </p>
        </a>

        <a
          href="/he/contact"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"

        >
          <h2 className="mb-3 text-2xl font-semibold">
            <FontAwesomeIcon icon={faStar} className="mr-2" />
            צור קשר{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-balance text-sm opacity-50">
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
