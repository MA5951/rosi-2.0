'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

enum Page {
    Home = '',
    programming = '/programming',
    electrical = '/electrical',
    community = '/community',
    manufacturing = '/manufacturing',
    mechanics = '/mechanics',
    contribute = '/contribute',
    contact = '/contact',
    cad = '/cad',
    explore = '/explore',
    ftc = '/ftc',
    other = '/other',
}

type Props = {}

export const Navbar = (props: Props) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState('en');
    const currentPage = usePathname() as Page;
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    const handleLinkClick = () => {
        if (isMobileMenuOpen) {
            setIsMobileMenuOpen(false);
        }
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const savedLanguage = localStorage.getItem('language') || 'en';
        if (savedTheme) {
            const isDark = savedTheme === 'dark';
            setIsDarkMode(isDark);
            document.documentElement.classList.toggle('dark', isDark);
        }
        setCurrentLanguage(savedLanguage);
        document.documentElement.lang = savedLanguage; // Set the lang attribute
    }, []);

    const getButtonClassName = (page: Page) => {
        const pageWithLanguage = `/${currentLanguage}${page}`;
        return currentPage === pageWithLanguage 
            ? 'text-red-700 md:text-red-700 dark:text-red-500' 
            : 'text-gray-900 hover:text-red-700 dark:text-white md:dark:hover:text-red-500';
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        localStorage.setItem('theme', newMode ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', newMode);
        router.refresh();
    };

    const toggleLanguageDropdown = () => {
        setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
    };

    const changeLanguage = (language: string) => {
        const newPath = currentPage.replace(/^\/\w\w/, `/${language}`);
        router.push(newPath);
        setCurrentLanguage(language);
        localStorage.setItem('language', language);
        document.documentElement.lang = language; // Update the lang attribute
        setIsLanguageDropdownOpen(false);
    };

    const getLanguageName = (langCode: string) => {
        switch (langCode) {
            case 'en':
                return 'English (US)';
            case 'he':
                return 'עברית';
            case 'cn':
                return '中文 (繁體)';
            case 'de':
                return 'Deutsch';
            case 'it':
                return 'Italiano';
            default:
                return 'Language';
        }
    };

    const getLangText = (origin: string) => {
        if (currentLanguage === 'he') {
            switch (origin) {
                case 'Home':
                    return 'בית';
                case 'Programming':
                    return 'תוכנה';
                case 'Electrical':
                    return 'אלקטרוניקה';
                case 'Community':
                    return 'קהילה';
                case 'Manufacturing':
                    return 'ייצור';
                case 'Mechanics':
                    return 'מכניקה';
                case 'CAD':
                    return 'שרטוט';
                case 'Contribute':
                    return 'העלת תוכן';
                case 'Contact':
                    return 'צור קשר';
                case "Search...":
                    return 'חיפוש...';
                case "Explore":
                    return 'חקור';
                case "FTC":
                    return 'FTC';
                case "Other":
                    return 'אחר';
                default:
                    return 'Language';
            }
        }
        return origin;
    }

    const getFlagIcon = (langCode: string) => {
        switch (langCode) {
            case 'en':
                return (
                    <svg className="w-3.5 h-3.5 rounded-full me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 3900 3900">
                        <path fill="#b22234" d="M0 0h7410v3900H0z"/>
                        <path d="M0 450h7410m0 600H0m0 600h7410m0 600H0m0 600h7410m0 600H0" stroke="#fff" strokeWidth="300"/>
                        <path fill="#3c3b6e" d="M0 0h2964v2100H0z"/>
                        <g fill="#fff"><g id="d"><g id="c"><g id="e"><g id="b"><path id="a" d="M247 90l70.534 217.082-184.66-134.164h228.253L176.466 307.082z"/><use xlinkHref="#a" y="420"/><use xlinkHref="#a" y="840"/><use xlinkHref="#a" y="1260"/></g><use xlinkHref="#a" y="1680"/></g><use xlinkHref="#b" x="247" y="210"/></g><use xlinkHref="#c" x="494"/></g><use xlinkHref="#d" x="988"/><use xlinkHref="#c" x="1976"/><use xlinkHref="#e" x="2470"/></g>
                    </svg>
                );
            case 'de':
                return (
                    <svg className="h-3.5 w-3.5 rounded-full me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" id="flag-icon-css-de" viewBox="0 0 512 512">
                        <path fill="#ffce00" d="M0 341.3h512V512H0z"/>
                        <path d="M0 0h512v170.7H0z"/>
                        <path fill="#d00" d="M0 170.7h512v170.6H0z"/>
                    </svg>
                );
            case 'it':
                return (
                    <svg className="h-3.5 w-3.5 rounded-full me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" id="flag-icon-css-it" viewBox="0 0 512 512">
                        <g fill-rule="evenodd" strokeWidth="1pt">
                            <path fill="#fff" d="M0 0h512v512H0z"/>
                            <path fill="#009246" d="M0 0h170.7v512H0z"/>
                            <path fill="#ce2b37" d="M341.3 0H512v512H341.3z"/>
                        </g>
                    </svg>
                );
            case 'he':
                return (
                    <svg className="h-3.5 w-3.5 rounded-full me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" id="flag-icon-css-il" viewBox="0 0 512 512">
                        <path fill="#fff" d="M0 0h512v512H0z"/>
                        <path fill="#0038b8" d="M0 85.3h512v85.3H0zm0 256h512v85.3H0zm146.7-85.3h218.6L256 311.4l-36.7-55.4zm0-85.3L256 200.6l36.7-55.4H146.7z"/>
                    </svg>
                );
            case 'cn':
                return (
                    <svg className="h-3.5 w-3.5 rounded-full me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" id="flag-icon-css-cn" viewBox="0 0 512 512">
                        <defs><path id="a" fill="#ffde00" d="M1-.3L-.7.8 0-1 .6.8-1-.3z"/></defs>
                        <path fill="#de2910" d="M0 0h512v512H0z"/>
                        <use width="30" height="20" transform="matrix(76.8 0 0 76.8 128 128)" xlinkHref="#a"/>
                        <use width="30" height="20" transform="rotate(-121 142.6 -47) scale(25.5827)" xlinkHref="#a"/>
                        <use width="30" height="20" transform="rotate(-98.1 198 -82) scale(25.6)" xlinkHref="#a"/>
                        <use width="30" height="20" transform="rotate(-74 272.4 -114) scale(25.6137)" xlinkHref="#a"/>
                        <use width="30" height="20" transform="matrix(16 -19.968 19.968 16 256 230.4)" xlinkHref="#a"/>
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 fixed top-0 left-0 right-0 z-50" style={{boxShadow: isDarkMode ? "0 0px 0px rgb(255 255 255 / 0)" : "0 3px 20px rgb(0 0 0 / 0.4)"}}>
            <div className="w-full flex flex-wrap items-center justify-between p-4">
                <a href={`/${currentLanguage}${Page.Home}`} className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="/images/ROSI-ONLY.png" className="h-8" alt="ROSI Logo" />
                </a>
                <div className="flex md:order-2">
                    <button type="button" aria-controls="navbar-search" aria-expanded={isMobileMenuOpen} onClick={toggleMobileMenu} className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1">
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                        <span className="sr-only">Search</span>
                    </button>
                    <div className="relative hidden md:block">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span className="sr-only">Search icon</span>
                        </div>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            router.push("/" + currentLanguage + "/search/" + searchQuery)}
                            }>
                            <input 
                                type="text" 
                                id="search-navbar" 
                                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" 
                                placeholder={getLangText("Search...")}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </form>
                    </div>
                    <button onClick={toggleMobileMenu} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded={isMobileMenuOpen}>
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <button onClick={toggleDarkMode} className="ml-4 p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                        <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} className="w-6 h-6" />
                    </button>
                    <div className="relative ml-4">
                        <button onClick={toggleLanguageDropdown} className="inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                            {getFlagIcon(currentLanguage)}
                            {getLanguageName(currentLanguage)}
                        </button>
                        {isLanguageDropdownOpen && (
                            <div className="absolute right-0 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700" id="language-dropdown-menu">
                                <ul className="py-2 font-medium" role="none">
                                    <li>
                                        <a onClick={() => changeLanguage('en')} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                            <div className="inline-flex items-center">
                                                {getFlagIcon('en')}
                                                English (US)
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a onClick={() => changeLanguage('he')} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                            <div className="inline-flex items-center">
                                                {getFlagIcon('he')}
                                                עברית
                                            </div>
                                        </a>
                                    </li>
                                    {/* <li>
                                        <a onClick={() => changeLanguage('de')} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                            <div className="inline-flex items-center">
                                                {getFlagIcon('de')}
                                                Deutsch
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a onClick={() => changeLanguage('it')} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                            <div className="inline-flex items-center">
                                                {getFlagIcon('it')}
                                                Italiano
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a onClick={() => changeLanguage('cn')} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                                            <div className="inline-flex items-center">
                                                {getFlagIcon('cn')}
                                                中文 (繁體)
                                            </div>
                                        </a>
                                    </li> */}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                <div className={`items-center justify-between ${isMobileMenuOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto md:order-1`} id="navbar-search">
                    <div className="relative mt-3 md:hidden">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="text" id="search-navbar" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" placeholder={getLangText("Search...")} />
                    </div>
                    <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-4 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                        <li>
                            <Link href={`/${currentLanguage}${Page.Home}`} className={getButtonClassName(Page.Home)} aria-current="page" onClick={handleLinkClick} >{getLangText('Home')}</Link>
                        </li>
                        <li>
                            <Link href={`/${currentLanguage}${Page.programming}`} className={getButtonClassName(Page.programming)} onClick={handleLinkClick} >{getLangText('Programming')}</Link>
                        </li>
                        <li>
                            <Link href={`/${currentLanguage}${Page.electrical}`} className={getButtonClassName(Page.electrical)} onClick={handleLinkClick} >{getLangText('Electrical')}</Link>
                        </li>
                        <li>
                            <Link href={`/${currentLanguage}${Page.community}`} className={getButtonClassName(Page.community)} onClick={handleLinkClick} >{getLangText('Community')}</Link>
                        </li>
                        <li>
                            <Link href={`/${currentLanguage}${Page.manufacturing}`} className={getButtonClassName(Page.manufacturing)} onClick={handleLinkClick} >{getLangText('Manufacturing')}</Link>
                        </li>
                        <li>
                            <Link href={`/${currentLanguage}${Page.mechanics}`} className={getButtonClassName(Page.mechanics)} onClick={handleLinkClick} >{getLangText('Mechanics')}</Link>
                        </li>
                        <li>
                            <Link href={`/${currentLanguage}${Page.cad}`} className={getButtonClassName(Page.cad)} onClick={handleLinkClick} >{getLangText('CAD')}</Link>
                        </li>
                        <li>
                            <Link href={`/${currentLanguage}${Page.ftc}`} className={getButtonClassName(Page.ftc)} onClick={handleLinkClick} >{getLangText('FTC')}</Link>
                        </li>
                        <li>
                            <Link href={`/${currentLanguage}${Page.other}`} className={getButtonClassName(Page.other)} onClick={handleLinkClick} >{getLangText('Other')}</Link>
                        </li>
                        <li>
                            <Link href={`/${currentLanguage}${Page.explore}`} className={getButtonClassName(Page.explore)} onClick={handleLinkClick} >{getLangText('Explore')}</Link>
                        </li>
                        <li>
                            <Link href={`/${currentLanguage}${Page.contribute}`} className={getButtonClassName(Page.contribute)} onClick={handleLinkClick} >{getLangText('Contribute')}</Link>
                        </li>
                        <li>
                            <Link href={`/${currentLanguage}${Page.contact}`} className={getButtonClassName(Page.contact)} onClick={handleLinkClick} >{getLangText('Contact')}</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
