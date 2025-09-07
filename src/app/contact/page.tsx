export default function Contact() {
    return (
        <div className="min-h-screen bg-white dark:bg-black">
            <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
                <h1 className="text-2xl sm:text-3xl font-bold font-mono text-black dark:text-[#22c55e] mb-8">
                    Get in Touch 👋
                </h1>

                <div className="space-y-8 text-black/70 dark:text-[#22c55e]/70 font-mono">
                    {/* Welcome Message */}
                    <section className="space-y-4">
                        <p className="text-lg sm:text-xl leading-relaxed">
                            Have questions, suggestions, or just want to say hi? We'd love to hear from you!
                        </p>
                    </section>

                    {/* Contact Methods */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Email */}
                        <div className="p-6 rounded-lg border border-black/30 dark:border-[#22c55e]/30 
                        bg-black/5 dark:bg-[#22c55e]/5 hover:bg-black/10 dark:hover:bg-[#22c55e]/10 
                        transition-all group">
                            <div className="flex items-start gap-4">
                                <svg className="w-6 h-6 text-black dark:text-[#22c55e] mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-bold text-black dark:text-[#22c55e]">
                                        Email Us
                                    </h3>
                                    <p className="text-sm">
                                        For general inquiries and support
                                    </p>
                                    <a
                                        href="mailto:hello@devhub.xyz"
                                        className="text-black dark:text-[#22c55e] inline-block no-underline"
                                    >
                                        hello@devhub.xyz
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Twitter/X */}
                        <div className="p-6 rounded-lg border border-black/30 dark:border-[#22c55e]/30 
                        bg-black/5 dark:bg-[#22c55e]/5 hover:bg-black/10 dark:hover:bg-[#22c55e]/10 
                        transition-all group">
                            <div className="flex items-start gap-4">
                                <svg className="w-6 h-6 text-black dark:text-[#22c55e] mt-1" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-bold text-black dark:text-[#22c55e]">
                                        Follow Us
                                    </h3>
                                    <p className="text-sm">
                                        Get the latest updates and announcements
                                    </p>
                                    <a
                                        href="https://x.com/devhubxyz"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-black dark:text-[#22c55e] inline-block no-underline"
                                    >
                                        @devhubxyz
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Telegram */}
                        <div className="p-6 rounded-lg border border-black/30 dark:border-[#22c55e]/30 
                        bg-black/5 dark:bg-[#22c55e]/5 hover:bg-black/10 dark:hover:bg-[#22c55e]/10 
                        transition-all group">
                            <div className="flex items-start gap-4">
                                <svg className="w-6 h-6 text-black dark:text-[#22c55e] mt-1" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                                </svg>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-bold text-black dark:text-[#22c55e]">
                                        Join Our Community
                                    </h3>
                                    <p className="text-sm">
                                        Connect with fellow developers
                                    </p>
                                    <a
                                        href="https://x.com/ianjali_th"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-black dark:text-[#22c55e] inline-block no-underline"
                                    >
                                        DM to join our Telegram
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Feedback */}
                        <div className="p-6 rounded-lg border border-black/30 dark:border-[#22c55e]/30 
                        bg-black/5 dark:bg-[#22c55e]/5 hover:bg-black/10 dark:hover:bg-[#22c55e]/10 
                        transition-all group">
                            <div className="flex items-start gap-4">
                                <svg className="w-6 h-6 text-black dark:text-[#22c55e] mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                                    />
                                </svg>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-bold text-black dark:text-[#22c55e]">
                                        Submit Feedback
                                    </h3>
                                    <p className="text-sm">
                                        Help us improve DevHub
                                    </p>
                                    <a
                                        href="https://forms.gle/Eb2jr5S96qWvHzTp6"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-black dark:text-[#22c55e] inline-block no-underline"
                                    >
                                        Share your thoughts
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Note */}
                    <section className="pt-8">
                        <p className="text-sm text-center">
                            We typically respond within 24 hours during business days. Thanks for your patience! 😊
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
} 