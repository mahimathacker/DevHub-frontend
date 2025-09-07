import Link from 'next/link';

export default function Footer() {
    return (
        <div className="w-full border-t border-black/20 dark:border-[#22c55e]/20 bg-white dark:bg-black backdrop-blur-sm mt-24">
            <div className="max-w-6xl mx-auto px-4 py-6">
                <div className="flex flex-col gap-8">
                    {/* Top Section - Made for Builders */}
                    <p className="text-black/70 dark:text-[#22c55e]/70 font-mono text-sm sm:text-base text-center sm:text-left">
                        Made for Builders by Builders (yes using power of AI 😉)
                    </p>

                    {/* Links Section */}
                    <div className="flex flex-col sm:flex-row justify-center sm:justify-start gap-8 sm:gap-16">
                        {/* Categories */}
                        <div className="flex flex-col items-center sm:items-start gap-2">
                            <h3 className="text-black dark:text-[#22c55e] font-mono font-bold text-sm mb-1">
                                Categories
                            </h3>
                            <a
                                href="/"
                                className="text-black/70 dark:text-[#22c55e]/70 hover:text-black dark:hover:text-[#22c55e] transition-colors font-mono text-xs sm:text-sm"
                            >
                                Home
                            </a>
                            <a
                                href="/hackathons"
                                className="text-black/70 dark:text-[#22c55e]/70 hover:text-black dark:hover:text-[#22c55e] transition-colors font-mono text-xs sm:text-sm"
                            >
                                Hackathons
                            </a>
                        </div>

                        {/* Company */}
                        <div className="flex flex-col items-center sm:items-start gap-2">
                            <h3 className="text-black dark:text-[#22c55e] font-mono font-bold text-sm mb-1">
                                Company
                            </h3>
                            <a
                                href="/about"
                                className="text-black/70 dark:text-[#22c55e]/70 hover:text-black dark:hover:text-[#22c55e] transition-colors font-mono text-xs sm:text-sm"
                            >
                                About
                            </a>
                            <a
                                href="/contact"
                                className="text-black/70 dark:text-[#22c55e]/70 hover:text-black dark:hover:text-[#22c55e] transition-colors font-mono text-xs sm:text-sm"
                            >
                                Contact
                            </a>
                        </div>

                        {/* Legal */}
                        <div className="flex flex-col items-center sm:items-start gap-2">
                            <h3 className="text-black dark:text-[#22c55e] font-mono font-bold text-sm mb-1">
                                Legal
                            </h3>
                            <a
                                href="/privacy-policy"
                                className="text-black/70 dark:text-[#22c55e]/70 hover:text-black dark:hover:text-[#22c55e] transition-colors font-mono text-xs sm:text-sm"
                            >
                                Privacy Policy
                            </a>
                            <a
                                href="/terms-of-use"
                                className="text-black/70 dark:text-[#22c55e]/70 hover:text-black dark:hover:text-[#22c55e] transition-colors font-mono text-xs sm:text-sm"
                            >
                                Terms of Use
                            </a>
                        </div>
                    </div>

                    {/* Bottom Section - Copyright and Social */}
                    <div className="flex flex-col sm:flex-row items-center justify-between pt-2 sm:pt-4 border-t border-black/10 dark:border-[#22c55e]/10">
                        {/* Copyright Text */}
                        <p className="text-black/50 dark:text-[#22c55e]/50 font-mono text-xs sm:text-sm">
                            © 2025 DevHub. All rights reserved
                        </p>

                        {/* Social Icons */}
                        <div className="flex items-center gap-4 mt-2 sm:mt-0">
                            <a
                                href="https://x.com/devhubxyz"
                                target="_blank"
                                className="text-black/70 dark:text-[#22c55e]/70 hover:text-black dark:hover:text-[#22c55e] transition-colors"
                                aria-label="Twitter"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                            <a
                                href="https://www.linkedin.com/company/106298413/admin/dashboard/"
                                target="_blank"
                                className="text-black/70 dark:text-[#22c55e]/70 hover:text-black dark:hover:text-[#22c55e] transition-colors"
                                aria-label="LinkedIn"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 