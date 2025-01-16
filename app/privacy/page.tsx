import { ScrollArea } from "@/components/ui/scroll-area"

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-lg overflow-hidden border border-border bg-card shadow-lg">
          {/* Header Section */}
          <div className="p-6 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent dark:from-primary/20 dark:via-primary/10 dark:to-transparent border-b border-border">
            <h1 className="text-3xl font-bold text-foreground">Privacy Policy</h1>
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
                    Welcome to <span className="font-semibold text-primary">socialytica.net</span> (&quot;the Website&quot;). Protecting your privacy and ensuring the security of your personal information is of utmost importance to us. This Privacy Policy explains how we collect, use, store, and protect your data when you use our Website, products, and services. By accessing or using the Website, you agree to the terms outlined in this Privacy Policy. If you do not agree, please do not use our services.
                  </p>
                </div>
              </section>

              {/* Compliance */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4 bg-gradient-to-r from-primary/10 to-transparent dark:from-primary/20 dark:to-transparent p-2 rounded-md">
                  2. Compliance
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    This Privacy Policy complies with the latest data protection laws, including but not limited to the General Data Protection Regulation (GDPR), California Consumer Privacy Act (CCPA), and other applicable legal frameworks.
                  </p>
                </div>
              </section>

              {/* Definitions */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4 bg-gradient-to-r from-primary/10 to-transparent dark:from-primary/20 dark:to-transparent p-2 rounded-md">
                  3. Definitions
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    <strong>Personal Data:</strong> Any information that relates to an identified or identifiable individual, including but not limited to name, email address, IP address, or any other information that may directly or indirectly identify a person.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Data Controller:</strong> The entity that determines the purposes and means of processing Personal Data.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Data Processor:</strong> An entity that processes Personal Data on behalf of the Data Controller.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>User:</strong> Any individual accessing or using the Website, products, or services provided by <span className="font-semibold text-primary">socialytica.net</span>.
                  </p>
                </div>
              </section>

              {/* Data Collection */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4 bg-gradient-to-r from-primary/10 to-transparent dark:from-primary/20 dark:to-transparent p-2 rounded-md">
                  4. Data Collection
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    We collect various types of data to improve your experience and ensure the functionality of the Website and our services. This includes:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground">
                    <li><strong>Personal Data:</strong> Information you provide directly, such as your name, email address, and payment details.</li>
                    <li><strong>Log Data:</strong> Includes your IP address, browser type, operating system, pages viewed, time spent on the Website, and the date/time of access.</li>
                    <li><strong>Cookies:</strong> Used to improve your browsing experience and enhance the functionality of the Website. You can manage your cookie preferences through your browser settings. For detailed information, please see our Cookie Policy.</li>
                  </ul>
                </div>
              </section>

              {/* Data Use */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4 bg-gradient-to-r from-primary/10 to-transparent dark:from-primary/20 dark:to-transparent p-2 rounded-md">
                  5. Data Use
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    We use your Personal Data for the following purposes:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground">
                    <li><strong>Service Delivery:</strong> To provide you with the products and services you request, including Relationship Tests and other features.</li>
                    <li><strong>Personalization:</strong> To enhance your experience by tailoring content and features based on your preferences.</li>
                    <li><strong>Communication:</strong> To send notifications, updates, and respond to inquiries or feedback.</li>
                    <li><strong>Security:</strong> To monitor, detect, and prevent fraudulent or unauthorized activity.</li>
                    <li><strong>Compliance:</strong> To comply with legal obligations and enforce our terms and conditions.</li>
                  </ul>
                </div>
              </section>

              {/* Data Sharing */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4 bg-gradient-to-r from-primary/10 to-transparent dark:from-primary/20 dark:to-transparent p-2 rounded-md">
                  6. Data Sharing
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    We may share your data with the following parties:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground">
                    <li><strong>Service Providers:</strong> Third-party vendors who assist in delivering our services, such as hosting providers, analytics tools, and payment processors.</li>
                    <li><strong>Legal Authorities:</strong> When required to comply with legal obligations, such as responding to court orders or regulatory requests.</li>
                    <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your data may be transferred to the new entity.</li>
                  </ul>
                </div>
              </section>

              {/* Data Retention */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4 bg-gradient-to-r from-primary/10 to-transparent dark:from-primary/20 dark:to-transparent p-2 rounded-md">
                  7. Data Retention
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    We retain your Personal Data only as long as necessary to fulfill the purposes outlined in this Privacy Policy or to comply with legal obligations. Once the retention period expires, your data will be securely deleted or anonymized.
                  </p>
                </div>
              </section>

              {/* Your Rights */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4 bg-gradient-to-r from-primary/10 to-transparent dark:from-primary/20 dark:to-transparent p-2 rounded-md">
                  8. Your Rights
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Depending on your jurisdiction, you may have the following rights:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground">
                    <li><strong>Access:</strong> To request access to your Personal Data.</li>
                    <li><strong>Rectification:</strong> To correct any inaccuracies in your data.</li>
                    <li><strong>Erasure:</strong> To request the deletion of your data.</li>
                    <li><strong>Restriction:</strong> To restrict the processing of your data.</li>
                    <li><strong>Objection:</strong> To object to processing based on legitimate interests.</li>
                    <li><strong>Data Portability:</strong> To receive a copy of your data in a structured, machine-readable format.</li>
                    <li><strong>Withdraw Consent:</strong> To withdraw consent at any time where processing is based on consent.</li>
                  </ul>
                  <p className="text-muted-foreground">
                    To exercise these rights, please contact us at contact@socialytica.net.
                  </p>
                </div>
              </section>

              {/* International Data Transfers */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4 bg-gradient-to-r from-primary/10 to-transparent dark:from-primary/20 dark:to-transparent p-2 rounded-md">
                  9. International Data Transfers
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Your Personal Data may be transferred to and processed in countries outside your jurisdiction. When such transfers occur, we ensure appropriate safeguards are in place, such as standard contractual clauses or equivalent measures.
                  </p>
                </div>
              </section>

              {/* Security */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4 bg-gradient-to-r from-primary/10 to-transparent dark:from-primary/20 dark:to-transparent p-2 rounded-md">
                  10. Security
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    We implement appropriate technical and organizational measures to protect your Personal Data against unauthorized access, loss, or destruction. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.
                  </p>
                </div>
              </section>

              {/* Children's Privacy */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4 bg-gradient-to-r from-primary/10 to-transparent dark:from-primary/20 dark:to-transparent p-2 rounded-md">
                  11. Children&apos;s Privacy
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Our services are not intended for children under the age of 13. We do not knowingly collect Personal Data from children under 13. If we become aware that we have inadvertently received Personal Data from a child under 13, we will delete such information from our records.
                  </p>
                </div>
              </section>

              {/* Changes to This Privacy Policy */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4 bg-gradient-to-r from-primary/10 to-transparent dark:from-primary/20 dark:to-transparent p-2 rounded-md">
                  12. Changes to This Privacy Policy
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. The &quot;Last Updated&quot; date at the top of this page indicates the most recent revision.
                  </p>
                </div>
              </section>

              {/* Contact Us */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4 bg-gradient-to-r from-primary/10 to-transparent dark:from-primary/20 dark:to-transparent p-2 rounded-md">
                  13. Contact Us
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us at:
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Email:</strong> contact@socialytica.net
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