export function PrivacyPage() {
  return (
    <main className="pt-24 pb-20 px-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-on-surface">
        Privacy Policy
      </h1>
      <p className="text-xs text-secondary uppercase tracking-wider mb-10">
        Last updated: March 2026
      </p>

      <div className="space-y-8 text-sm text-on-surface-variant leading-relaxed">
        {/* 1 */}
        <Section title="1. Who We Are">
          <p>
            Tuklas nin Sining is an independent, volunteer-maintained digital
            archive of student research papers. It is operated by{' '}
            <strong className="text-on-surface">KMercad0</strong> as a personal
            goodwill project and is{' '}
            <strong className="text-on-surface">
              not affiliated with, endorsed by, or authorized by
            </strong>{' '}
            any school, the Department of Education (DepEd), or any government
            institution.
          </p>
          <p>
            For privacy inquiries, contact us at{' '}
            <a
              href="mailto:komercado31@gmail.com"
              className="text-primary underline underline-offset-2"
            >
              komercado31@gmail.com
            </a>
            .
          </p>
        </Section>

        {/* 2 */}
        <Section title="2. What We Collect">
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong className="text-on-surface">Student data:</strong> Full
              name, grade level, section, school year, research paper title,
              abstract, keywords, and PDF document
            </li>
            <li>
              <strong className="text-on-surface">Teacher data:</strong> Name (as
              research adviser), email address (for account authentication)
            </li>
            <li>
              <strong className="text-on-surface">Automated data:</strong> Basic
              server logs (IP addresses, timestamps) collected by our hosting
              providers
            </li>
          </ul>
        </Section>

        {/* 3 */}
        <Section title="3. Why We Collect It">
          <p>
            We process personal data solely for the following purposes:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              To maintain a searchable archive of student research papers for
              educational reference
            </li>
            <li>
              To attribute research work to its authors and advisers
            </li>
            <li>
              To enable authorized faculty members to access full records
            </li>
          </ul>
          <p>
            Data is <strong className="text-on-surface">never</strong> used for
            commercial purposes, marketing, profiling, or sale to third parties.
          </p>
        </Section>

        {/* 4 */}
        <Section title="4. Legal Basis">
          <p>
            Under Republic Act No. 10173 (Data Privacy Act of 2012), we process
            personal data on the following bases:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong className="text-on-surface">Consent</strong> — obtained
              through signed consent forms facilitated by research teachers,
              with parental/guardian consent for minors
            </li>
            <li>
              <strong className="text-on-surface">Legitimate interest</strong>{' '}
              — the educational and archival purpose of the site, provided it
              does not override the rights of data subjects
            </li>
          </ul>
        </Section>

        {/* 5 */}
        <Section title="5. Minors' Data">
          <p>
            Most data subjects are high school students (minors under 18). We
            take the following measures:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong className="text-on-surface">Student names are hidden</strong>{' '}
              from public visitors — only authenticated faculty members can view
              them
            </li>
            <li>
              Research papers are uploaded only with{' '}
              <strong className="text-on-surface">
                signed parental/guardian consent
              </strong>
            </li>
            <li>
              Parents, guardians, or students (upon reaching 18) may request
              removal at any time
            </li>
          </ul>
        </Section>

        {/* 6 */}
        <Section title="6. Third-Party Services & Cross-Border Transfer">
          <p>
            Your data is processed by the following third-party providers, whose
            servers are located outside the Philippines:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong className="text-on-surface">Supabase</strong> — database
              hosting and authentication
            </li>
            <li>
              <strong className="text-on-surface">Cloudflare</strong> — PDF file
              storage
            </li>
            <li>
              <strong className="text-on-surface">Vercel</strong> — website
              hosting
            </li>
          </ul>
          <p>
            In accordance with RA 10173 Section 21, we disclose that personal
            data is transferred and stored outside the Philippines. These
            providers maintain industry-standard security practices.
          </p>
        </Section>

        {/* 7 */}
        <Section title="7. Your Rights">
          <p>
            Under the Data Privacy Act of 2012, you have the following rights:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong className="text-on-surface">Right to be informed</strong>{' '}
              — to know how your data is collected and used
            </li>
            <li>
              <strong className="text-on-surface">Right to access</strong> — to
              obtain a copy of your personal data
            </li>
            <li>
              <strong className="text-on-surface">Right to object</strong> — to
              refuse or withdraw consent to processing
            </li>
            <li>
              <strong className="text-on-surface">
                Right to erasure or blocking
              </strong>{' '}
              — to have your data deleted or blocked from processing
            </li>
            <li>
              <strong className="text-on-surface">Right to rectification</strong>{' '}
              — to correct inaccurate personal data
            </li>
            <li>
              <strong className="text-on-surface">
                Right to data portability
              </strong>{' '}
              — to obtain your data in a standard format
            </li>
            <li>
              <strong className="text-on-surface">
                Right to file a complaint
              </strong>{' '}
              — with the National Privacy Commission
            </li>
          </ul>
          <p>
            To exercise any of these rights, email us at{' '}
            <a
              href="mailto:komercado31@gmail.com"
              className="text-primary underline underline-offset-2"
            >
              komercado31@gmail.com
            </a>
            . We will respond within 15 business days.
          </p>
        </Section>

        {/* 8 */}
        <Section title="8. Security">
          <p>
            We implement reasonable security measures to protect personal data:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Student names are access-restricted and hidden from public view
            </li>
            <li>
              Faculty authentication is invite-only (no self-registration)
            </li>
            <li>All data is transmitted over HTTPS (encrypted in transit)</li>
            <li>
              Third-party providers maintain encryption at rest and
              industry-standard security controls
            </li>
          </ul>
        </Section>

        {/* 9 */}
        <Section title="9. Data Retention">
          <p>
            Research papers and associated metadata are retained{' '}
            <strong className="text-on-surface">
              indefinitely for archival purposes
            </strong>
            , unless a data subject or their parent/guardian requests removal.
          </p>
          <p>
            Upon a valid removal request, we will delete the record from our
            database and remove the PDF from storage within{' '}
            <strong className="text-on-surface">48 hours</strong>.
          </p>
        </Section>

        {/* 10 */}
        <Section title="10. National Privacy Commission">
          <p>
            If you believe your data privacy rights have been violated, you may
            file a complaint with the National Privacy Commission:
          </p>
          <div className="bg-surface-container-low p-4 rounded-lg text-xs space-y-1 mt-2">
            <p className="font-semibold text-on-surface">
              National Privacy Commission
            </p>
            <p>3rd Floor, Core G, UPRC III Building</p>
            <p>#3 Pasig Blvd, Pasig City 1604, Philippines</p>
            <p>
              Email:{' '}
              <a
                href="mailto:complaints@privacy.gov.ph"
                className="text-primary underline underline-offset-2"
              >
                complaints@privacy.gov.ph
              </a>
            </p>
            <p>
              Website:{' '}
              <a
                href="https://www.privacy.gov.ph"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2"
              >
                privacy.gov.ph
              </a>
            </p>
          </div>
        </Section>

        {/* 11 */}
        <Section title="11. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. Changes will be
            reflected by the "Last updated" date at the top of this page. We
            encourage you to review this page periodically.
          </p>
        </Section>
      </div>
    </main>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-base font-bold text-on-surface">{title}</h2>
      {children}
    </section>
  )
}
