import { ScrollArea } from "@/components/ui/scroll-area"

export default function TermsAndConditionsPage() {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-lg overflow-hidden border border-border bg-card shadow-lg">
          {/* Header Section */}
          <div className="p-6 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent dark:from-primary/20 dark:via-primary/10 dark:to-transparent border-b border-border">
            <h1 className="text-3xl font-bold text-foreground">Terms & Conditions</h1>
            <p className="mt-2 text-muted-foreground">
              Last updated: January 15, 2025
            </p>
          </div>

          {/* Content Section */}
          <ScrollArea className="p-6 h-[calc(130vh-16rem)]">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              {/* Introduction */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4 bg-gradient-to-r from-primary/10 to-transparent dark:from-primary/20 dark:to-transparent p-2 rounded-md">
                  1. Introduction
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Welcome to <span className="font-semibold text-primary">socialytica.net</span> (&quot;the Website&quot;). 
                    By accessing or using this Website, you agree to comply with and be bound by these Terms of 
                    Use and Purchase (&quot;Terms&quot;). These Terms govern your use of the Website, including its features, 
                    content, and any products or services offered, such as Relationship Tests and other digital 
                    services (the &quot;Products&quot;).
                  </p>
                  <p className="text-muted-foreground">
                    These Terms include disclaimers and limitations of liability designed to protect 
                    <span className="font-semibold text-primary">socialytica.net</span> and its operator (&quot;we&quot; or &quot;us&quot;) 
                    from legal claims. The governing jurisdiction for these Terms is <span className="font-semibold">Delaware, USA</span>.
                  </p>
                  <div className="p-4 rounded-lg border border-border bg-card/50">
                    <p className="text-sm text-muted-foreground">
                      We recommend that all users regularly revisit these Terms, as they may be updated from time to time. 
                      The continued use of the Website after changes constitutes acceptance of the revised Terms.
                    </p>
                  </div>
                </div>
              </section>

              {/* Intended Use of Products */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4 bg-gradient-to-r from-primary/10 to-transparent dark:from-primary/20 dark:to-transparent p-2 rounded-md">
                  2. Intended Use of Products
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Our Products, including Relationship Tests, are designed for personal use and self-reflection. 
                    These services provide insights and entertainment, offering users a framework for exploring 
                    various dimensions of relationships.
                  </p>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="p-4 rounded-lg border border-border bg-card/50 hover:bg-accent/5 transition-colors">
                      <h3 className="font-semibold text-foreground mb-2">Educational Purpose</h3>
                      <p className="text-sm text-muted-foreground">
                        Products are carefully curated to stimulate thought and provide potential areas for 
                        improvement in relationships or self-perception.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border border-border bg-card/50 hover:bg-accent/5 transition-colors">
                      <h3 className="font-semibold text-foreground mb-2">Professional Services</h3>
                      <p className="text-sm text-muted-foreground">
                        Our Products are not substitutes for qualified professionals like counselors, 
                        psychologists, or financial advisors.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border border-border bg-card/50 hover:bg-accent/5 transition-colors">
                      <h3 className="font-semibold text-foreground mb-2">Customization</h3>
                      <p className="text-sm text-muted-foreground">
                        While we offer personalization, these are broad frameworks and not tailored diagnostic tools.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* No Medical Advice */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4 bg-gradient-to-r from-primary/10 to-transparent dark:from-primary/20 dark:to-transparent p-2 rounded-md">
                  3. No Medical, Psychiatric, or Professional Advice
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    The content and results derived from our Products are strictly for informational and 
                    entertainment purposes. We explicitly disclaim any liability for outcomes related to health, 
                    emotional states, or financial decisions.
                  </p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 rounded-lg border border-border bg-card/50 hover:bg-accent/5 transition-colors">
                      <h3 className="font-semibold text-foreground mb-2">Health-Related Concerns</h3>
                      <p className="text-sm text-muted-foreground">
                        If experiencing symptoms of any medical or mental health condition, please consult 
                        licensed practitioners. The Website is not equipped for emergency scenarios.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border border-border bg-card/50 hover:bg-accent/5 transition-colors">
                      <h3 className="font-semibold text-foreground mb-2">Risk of Misuse</h3>
                      <p className="text-sm text-muted-foreground">
                        Misinterpretation or misuse of our Products is beyond our control and remains the sole 
                        responsibility of the user.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Eligibility */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4 bg-gradient-to-r from-primary/10 to-transparent dark:from-primary/20 dark:to-transparent p-2 rounded-md">
                  4. Eligibility
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    The Website and its Products are intended for audiences who meet specific eligibility requirements.
                  </p>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="p-4 rounded-lg border border-border bg-card/50 hover:bg-accent/5 transition-colors">
                      <h3 className="font-semibold text-foreground mb-2">Age Requirement</h3>
                      <p className="text-sm text-muted-foreground">
                        Users must be at least 18 years old or have explicit parental/guardian consent.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border border-border bg-card/50 hover:bg-accent/5 transition-colors">
                      <h3 className="font-semibold text-foreground mb-2">Geographic Restrictions</h3>
                      <p className="text-sm text-muted-foreground">
                        Users must ensure compliance with their local jurisdiction&apos;s laws and regulations.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border border-border bg-card/50 hover:bg-accent/5 transition-colors">
                      <h3 className="font-semibold text-foreground mb-2">Legal Capacity</h3>
                      <p className="text-sm text-muted-foreground">
                        Users must have the legal capacity to enter into binding agreements.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Purchases and Payments */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4 bg-gradient-to-r from-primary/10 to-transparent dark:from-primary/20 dark:to-transparent p-2 rounded-md">
                  5. Purchases and Payments
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    We strive to make purchasing our Products as seamless and transparent as possible.
                  </p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 rounded-lg border border-border bg-card/50 hover:bg-accent/5 transition-colors">
                      <h3 className="font-semibold text-foreground mb-2">Payment Terms</h3>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        <li>• Accurate billing information required</li>
                        <li>• Digital products are non-refundable</li>
                        <li>• Disputes must be raised within 14 days</li>
                        <li>• 30-day notice for pricing changes</li>
                      </ul>
                    </div>
                    <div className="p-4 rounded-lg border border-border bg-card/50 hover:bg-accent/5 transition-colors">
                      <h3 className="font-semibold text-foreground mb-2">Secure Transactions</h3>
                      <p className="text-sm text-muted-foreground">
                        We utilize secure third-party payment systems while disclaiming liability for 
                        external provider issues.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Refunds */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4 bg-gradient-to-r from-primary/10 to-transparent dark:from-primary/20 dark:to-transparent p-2 rounded-md">
                  6. Refunds and Restrictions
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Refund requests are subject to strict evaluation criteria to maintain fairness and integrity.
                  </p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 rounded-lg border border-border bg-card/50 hover:bg-accent/5 transition-colors">
                      <h3 className="font-semibold text-foreground mb-2">Technical Errors</h3>
                      <p className="text-sm text-muted-foreground">
                        Refunds may be granted if a demonstrable technical error prevented access to purchased Products.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border border-border bg-card/50 hover:bg-accent/5 transition-colors">
                      <h3 className="font-semibold text-foreground mb-2">Non-Eligible Circumstances</h3>
                      <p className="text-sm text-muted-foreground">
                        Refunds will not be issued for user dissatisfaction, failure to achieve expected results, 
                        or misuse of the Product.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Intellectual Property */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4 bg-gradient-to-r from-primary/10 to-transparent dark:from-primary/20 dark:to-transparent p-2 rounded-md">
                  7. Intellectual Property Rights
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    All content on the Website is protected under intellectual property laws.
                  </p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 rounded-lg border border-border bg-card/50 hover:bg-accent/5 transition-colors">
                      <h3 className="font-semibold text-foreground mb-2">Prohibited Actions</h3>
                      <p className="text-sm text-muted-foreground">
                        Users may not copy, reproduce, or distribute any content without prior written consent.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border border-border bg-card/50 hover:bg-accent/5 transition-colors">
                      <h3 className="font-semibold text-foreground mb-2">Licensing Framework</h3>
                      <p className="text-sm text-muted-foreground">
                        Access to Products does not grant users any ownership rights.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Acceptable Use */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4 bg-gradient-to-r from-primary/10 to-transparent dark:from-primary/20 dark:to-transparent p-2 rounded-md">
                  8. Acceptable Use Policy
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Users agree to refrain from engaging in any unlawful, unethical, or disruptive activities.
                  </p>
                  <div className="p-4 rounded-lg border border-border bg-card/50">
                    <h3 className="font-semibold text-foreground mb-2">Prohibited Activities</h3>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Hacking or reverse engineering the Website</li>
                      <li>• Unauthorized reproduction of Products</li>
                      <li>• Unauthorized commercial activities</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Disclaimers */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4 bg-gradient-to-r from-primary/10 to-transparent dark:from-primary/20 dark:to-transparent p-2 rounded-md">
                  9. Disclaimer of Warranties
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    The Website and its Products are provided on an &quot;as is&quot; and &quot;as available&quot; basis. We make no warranties, 
                    express or implied, regarding the Website or its content.
                  </p>
                  <div className="p-4 rounded-lg border border-border bg-card/50">
                    <h3 className="font-semibold text-foreground mb-2">No Warranty</h3>
                    <p className="text-sm text-muted-foreground">
                      We do not guarantee that the Website will be error-free, secure, or uninterrupted. Users assume all risks 
                      associated with the use of the Website.
                    </p>
                  </div>
                </div>
              </section>

              {/* Limitation of Liability */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4 bg-gradient-to-r from-primary/10 to-transparent dark:from-primary/20 dark:to-transparent p-2 rounded-md">
                  10. Limitation of Liability
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    To the fullest extent permitted by law, we disclaim all liability for any damages arising out of or in connection 
                    with the use of the Website or its Products.
                  </p>
                  <div className="p-4 rounded-lg border border-border bg-card/50">
                    <h3 className="font-semibold text-foreground mb-2">Exclusion of Damages</h3>
                    <p className="text-sm text-muted-foreground">
                      We will not be liable for any indirect, incidental, special, or consequential damages, including loss of profits, 
                      data, or goodwill.
                    </p>
                  </div>
                </div>
              </section>

              {/* Privacy Policy */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4 bg-gradient-to-r from-primary/10 to-transparent dark:from-primary/20 dark:to-transparent p-2 rounded-md">
                  11. Privacy Policy
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Our Privacy Policy provides comprehensive details on how we collect, use, and safeguard user data. By continuing to use 
                    the Website, you acknowledge that you have reviewed and consent to the practices outlined in the Privacy Policy.
                  </p>
                </div>
              </section>

              {/* Indemnification */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4 bg-gradient-to-r from-primary/10 to-transparent dark:from-primary/20 dark:to-transparent p-2 rounded-md">
                  12. Indemnification
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Users agree to indemnify <span className="font-semibold text-primary">socialytica.net</span> and its affiliates from any claims or damages arising from 
                    violations of these Terms or misuse of the Website.
                  </p>
                </div>
              </section>

              {/* Termination of Access */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4 bg-gradient-to-r from-primary/10 to-transparent dark:from-primary/20 dark:to-transparent p-2 rounded-md">
                  13. Termination of Access
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    We reserve the right to terminate access to the Website for users who violate these Terms. In such cases, refunds will not be issued, 
                    and legal actions may be pursued as deemed necessary.
                  </p>
                </div>
              </section>
              {/* Changes to the Terms */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4 bg-gradient-to-r from-primary/10 to-transparent dark:from-primary/20 dark:to-transparent p-2 rounded-md">
                  14. Changes to the Terms
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Users are advised to periodically review these Terms to stay informed of updates. Continued use of the Website after changes are made constitutes acceptance of the updated Terms.
                  </p>
                </div>
              </section>

              {/* Privacy Policy */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4 bg-gradient-to-r from-primary/10 to-transparent dark:from-primary/20 dark:to-transparent p-2 rounded-md">
                  15. Privacy Policy
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Our Privacy Policy provides comprehensive details on how we collect, use, and safeguard user data. By continuing to use the Website, you acknowledge that you have reviewed and consent to the practices outlined in the Privacy Policy.
                  </p>
                </div>
              </section>

              {/* Contact Information */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4 bg-gradient-to-r from-primary/10 to-transparent dark:from-primary/20 dark:to-transparent p-2 rounded-md">
                  16. Contact Information
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    For further clarification or to raise concerns, users can reach us at:
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Email:</strong> support@socialytica.net
                  </p>
                </div>
              </section>
            </div>
          </ScrollArea >
        </div>
      </div>
    </div>
  )
}