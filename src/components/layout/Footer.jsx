import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="mt-auto py-6 px-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400 gap-4">
            <div className="flex items-center gap-1">
                <span>© 2026 Rajdeep Sale. Made with</span>
                <Heart size={14} className="text-red-500 fill-red-500" />
                <span>in India.</span>
            </div>

            <div className="flex gap-6">
                <a href="#" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Help Center</a>
            </div>
        </footer>
    );
};

export default Footer;
