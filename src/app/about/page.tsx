export default function About() {
    return (
        <div className="min-h-screen bg-white dark:bg-black">
            <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
                <h1 className="text-2xl sm:text-3xl font-bold font-mono text-black dark:text-[#22c55e] mb-8">
                    About BlockchainHQ
                </h1>

                <div className="space-y-8 text-black/70 dark:text-[#22c55e]/70 font-mono">
                    {/* Welcome Message */}
                    <section className="space-y-4">
                        <p className="text-lg sm:text-xl leading-relaxed">
                            Hey Web3 builders! 👋 Ever felt like there's no one-stop hub to learn, discuss, and stay in the loop
                            with everything happening in blockchain? Well, that's exactly why BlockchainHQ exists!
                        </p>
                    </section>

                    {/* What We Offer */}
                    <section className="space-y-4">
                        <p className="text-sm sm:text-base leading-relaxed">
                            We're a community-first platform built for Web3 devs, founders, and enthusiasts who want to:
                        </p>
                        <div className="space-y-3 pl-4">
                            <p className="flex items-start gap-2 text-sm sm:text-base">
                                <span className="text-black dark:text-[#22c55e]">🔹</span>
                                Stay updated on the latest in blockchain development
                            </p>
                            <p className="flex items-start gap-2 text-sm sm:text-base">
                                <span className="text-black dark:text-[#22c55e]">🔹</span>
                                Discuss & share insights with fellow builders
                            </p>
                            <p className="flex items-start gap-2 text-sm sm:text-base">
                                <span className="text-black dark:text-[#22c55e]">🔹</span>
                                Discover hackathons, events, and project showcases
                            </p>
                            <p className="flex items-start gap-2 text-sm sm:text-base">
                                <span className="text-black dark:text-[#22c55e]">🔹</span>
                                Get rewarded for valuable contributions
                            </p>
                        </div>
                    </section>

                    {/* Mission */}
                    <section className="space-y-4">
                        <p className="text-sm sm:text-base leading-relaxed">
                            No more scattered info or dead-end discussions—just real Web3 talk, in one place.
                            Whether you're here to learn, build, or connect, welcome home!
                        </p>
                        <p className="text-sm sm:text-base leading-relaxed">
                            Thank you for being part of BlockchainHQ! Let's shape the future of Web3 together😊
                        </p>
                    </section>

                    {/* Join the Community */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-black dark:text-[#22c55e]">
                            Join Our Community
                        </h2>
                        <p className="text-sm sm:text-base leading-relaxed">
                            Whether you're a seasoned blockchain developer or just starting your Web3 journey,
                            BlockchainHQ is your go-to platform for growth and collaboration. Join our community
                            of builders and be part of the decentralized future.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <a
                                href="https://x.com/blockchainhqxyz"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-4 py-2 rounded-lg bg-black/10 dark:bg-[#22c55e]/10 
                                border border-black/30 dark:border-[#22c55e]/30 text-black dark:text-[#22c55e] 
                                hover:bg-black/20 dark:hover:bg-[#22c55e]/20 transition-all text-sm"
                            >
                                Follow on Twitter
                                <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                            <a
                                href="https://x.com/ianjali_th"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-4 py-2 rounded-lg bg-black/10 dark:bg-[#22c55e]/10 
                                border border-black/30 dark:border-[#22c55e]/30 text-black dark:text-[#22c55e] 
                                hover:bg-black/20 dark:hover:bg-[#22c55e]/20 transition-all text-sm"
                            >
                                DM to join our Telegram
                                <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                                </svg>
                            </a>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
} 