export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-white dark:bg-black">
            <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
                <h1 className="text-2xl sm:text-3xl font-bold font-mono text-black dark:text-[#22c55e] mb-8">
                    Privacy Policy
                </h1>

                <div className="space-y-8 text-black/70 dark:text-[#22c55e]/70 font-mono">
                    {/* Last Updated */}
                    <p className="text-sm">Last Updated: March 4, 2025</p>

                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-black dark:text-[#22c55e]">
                            Introduction
                        </h2>
                        <p className="text-sm sm:text-base leading-relaxed">
                            DevHub ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy
                            explains how we collect, use, disclose, and safeguard your information when you visit our website
                            and use our services.
                        </p>
                    </section>

                    {/* Information We Collect */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-black dark:text-[#22c55e]">
                            Information We Collect
                        </h2>
                        <p className="text-sm sm:text-base leading-relaxed">
                            We collect information from authorized sources to provide robust and relevant data for our platform.
                            This includes publicly available blockchain data, aggregated content from verified sources, and user
                            interactions on DevHub. If you create an account, we may collect details such as your username,
                            email address, and any information voluntarily shared through discussions, comments, or interactions.
                            We also collect technical data such as your IP address, browser type, and device information to
                            optimize platform performance.
                        </p>
                    </section>

                    {/* How We Use and Share Information */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-black dark:text-[#22c55e]">
                            How We Use and Share Information
                        </h2>
                        <p className="text-sm sm:text-base leading-relaxed">
                            The information collected is used to enhance your experience on DevHub, provide relevant
                            updates, and maintain a high-quality platform for discussions. We may use data for
                            personalization, improving platform functionality, and ensuring compliance with security measures.
                            Your information may be shared with service providers for operational purposes, such as hosting,
                            analytics, or customer support. However, we do not sell or share personal data with third parties
                            for advertising purposes. We may disclose information if required by law or to protect the rights
                            and safety of our community.
                        </p>
                    </section>

                    {/* Protecting Your Information */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-black dark:text-[#22c55e]">
                            Protecting Your Information
                        </h2>
                        <p className="text-sm sm:text-base leading-relaxed">
                            We take appropriate security measures to protect the data collected from unauthorized access,
                            alteration, or loss. While we implement safeguards, no system is entirely secure. Users should
                            be aware that interactions involving blockchain wallets or decentralized applications may be recorded
                            on public blockchain networks, which we do not control. It is advisable to follow best security
                            practices when interacting with blockchain technologies.
                        </p>
                    </section>

                    {/* Links to Other Websites */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-black dark:text-[#22c55e]">
                            Links to Other Websites
                        </h2>
                        <p className="text-sm sm:text-base leading-relaxed">
                            DevHub may include links to third-party websites or services for informational purposes.
                            We are not responsible for the content, security, or privacy practices of these external sites.
                            Users are encouraged to review their respective privacy policies before engaging with them.
                        </p>
                    </section>

                    {/* Your Rights */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-black dark:text-[#22c55e]">
                            Your Rights
                        </h2>
                        <p className="text-sm sm:text-base leading-relaxed">
                            As a user, you have the right to access, modify, or request deletion of your personal information
                            stored on our platform. You can also manage cookie preferences and opt out of certain data
                            processing where applicable. If you have any privacy-related concerns, please contact us using
                            the details provided below.
                        </p>
                    </section>

                    {/* Changes to Privacy Policy */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-black dark:text-[#22c55e]">
                            Changes to This Privacy Policy
                        </h2>
                        <p className="text-sm sm:text-base leading-relaxed">
                            We may update this Privacy Policy periodically to reflect changes in our practices or legal
                            requirements. Any significant updates will be communicated through the platform or via email.
                            Continued use of DevHub after policy changes signifies your acceptance of the updated terms.
                        </p>
                    </section>

                    {/* Contact Us */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-black dark:text-[#22c55e]">
                            Contact Us
                        </h2>
                        <p className="text-sm sm:text-base leading-relaxed">
                            If you have any questions about this Privacy Policy, please contact us at{' '}
                            <a
                                href="mailto:privacy@devhub.xyz"
                                className="text-black dark:text-[#22c55e] hover:underline"
                            >
                                hello@devhub.xyz
                            </a>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
} 