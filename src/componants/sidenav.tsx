import React from 'react';
import { useRouter } from 'next/router';

const SideNav = () => {
    const router = useRouter();

    if (router.pathname === '/login') return null;

    return (
        <aside className="bg-gray-800 h-screen w-64 fixed top-0 left-0 py-4 px-6">
            <nav>
                <ul className="text-white">
                    <li className={router.pathname === '/' ? 'bg-indigo-500' : ''}>
                        <a href="/" className="block p-2 hover:bg-indigo-500">
                            Dashboard
                        </a>
                    </li>
                    <li className={router.pathname === '/profile' ? 'bg-indigo-500' : ''}>
                        <a href="/profile" className="block p-2 hover:bg-indigo-500">
                            Profile
                        </a>
                    </li>
                    <li className={router.pathname === '/settings' ? 'bg-indigo-500' : ''}>
                        <a href="/settings" className="block p-2 hover:bg-indigo-500">
                            Settings
                        </a>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default SideNav;
