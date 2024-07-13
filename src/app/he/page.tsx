"use client"

import Image from "next/image";
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faBolt, faUsers, faIndustry, faPencil, faWrench, faPlus, faStar, faMicrochip, faBook } from '@fortawesome/free-solid-svg-icons';

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

      {!isMobile && ( 
        <div>
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
                גלו משאבים ודוגמאות קוד לשיפור מיומנויות התוכנה של הקבוצה שלכם.
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
                למדו על מערכות ורכיבים אלקטרוניים דרך חוויות משותפות.
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
                גשו לטכניקות ייצור ופרקטיקות מיטביות מקבוצות אחרות.
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
              <p className="m-0 max-w-[30ch] text-sm opacity-50">
                שתפו וגלו עיצובים ב-CAD לשיפור שיתוף הפעולה ההנדסי.
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
                התחברו עם קהילת ROSI העולמית לשיפור תוכנית הקהילה שלכם.
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
                העמיקו בפרויקטים הנדסיים מכניים ושתפו את החידושים שלכם.
              </p>
            </a>
            <a
              href="/he/ftc"
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            >
              <h2 className="mb-3 text-2xl font-semibold">
                <FontAwesomeIcon icon={faMicrochip} className="mr-2" />
                FTC{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <p className="m-0 max-w-[30ch] text-sm opacity-50">
                גשו למשאבים וחוויות מותאמות לקבוצות FIRST Tech Challenge.
              </p>
            </a>
            <a
              href="/he/other"
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            >
              <h2 className="mb-3 text-2xl font-semibold">
                <FontAwesomeIcon icon={faBook} className="mr-2" />
                אחר{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <p className="m-0 max-w-[30ch] text-sm opacity-50">
                גלו נושאים מגוונים ופרויקטים חדשניים מעבר לקטגוריות המרכזיות.
              </p>
            </a>
          </div>
          <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left justify-center">
            <a>
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
                שתפו את הידע שלכם ועזרו לשפר את המשאבים הזמינים לכל הקבוצות.
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
              <p className="m-0 max-w-[30ch] text-sm opacity-50">
                צרו קשר איתנו למידע נוסף או למתן משוב.
              </p>
            </a>
          </div>
        </div>
      )} {isMobile && (
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
              גלו משאבים ודוגמאות קוד לשיפור מיומנויות התוכנה של הקבוצה שלכם.
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
              למדו על מערכות ורכיבים אלקטרוניים דרך חוויות משותפות.
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
              גשו לטכניקות ייצור ופרקטיקות מיטביות מקבוצות אחרות.
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
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              שתפו וגלו עיצובים ב-CAD לשיפור שיתוף הפעולה ההנדסי.
            </p>
          </a>
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
              התחברו עם קהילת ROSI העולמית לשיפור תוכנית הקהילה שלכם.
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
              העמיקו בפרויקטים הנדסיים מכניים ושתפו את החידושים שלכם.
            </p>
          </a>
          <a
            href="/he/ftc"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            <h2 className="mb-3 text-2xl font-semibold">
              <FontAwesomeIcon icon={faMicrochip} className="mr-2" />
              FTC{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              גשו למשאבים וחוויות מותאמות לקבוצות FIRST Tech Challenge.
            </p>
          </a>
          <a
            href="/he/other"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            <h2 className="mb-3 text-2xl font-semibold">
              <FontAwesomeIcon icon={faBook} className="mr-2" />
              אחר{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              גלו נושאים מגוונים ופרויקטים חדשניים מעבר לקטגוריות המרכזיות.
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
              שתפו את הידע שלכם ועזרו לשפר את המשאבים הזמינים לכל הקבוצות.
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
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              צרו קשר איתנו למידע נוסף או למתן משוב.
            </p>
          </a>
        </div>
      )}

    </main>
  );
}
