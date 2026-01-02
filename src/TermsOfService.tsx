import LegalLayout from "./LegalLayout";

export default function TermsOfService() {
  return (
    <LegalLayout title="Terms of Service">
      <p>Effective date: January 1, 2026.</p>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-stone-800">Acceptance</h2>
        <p>
          By using the Getout website or downloading the app, you agree to these
          terms. If you do not agree, do not use the service.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-stone-800">Privacy</h2>
        <p>
          Our Privacy Policy explains how we collect, use, and share information
          and is incorporated into these terms.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-stone-800">Eligibility</h2>
        <p>
          You must be at least 13 years old (or the minimum legal age in your
          jurisdiction) to use the service.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-stone-800">Use of the service</h2>
        <p>
          You agree to use the service in a lawful manner and not to interfere
          with its operation or security.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-stone-800">Integrations</h2>
        <p>
          If you connect third-party services, you authorize us to access and
          process data from those services on your behalf to provide the features
          you request. Your use of third-party services is subject to their
          terms.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-stone-800">AI features</h2>
        <p>
          The service may generate AI-assisted responses or summaries. AI output
          may be incorrect or incomplete. You are responsible for reviewing
          outputs before relying on them.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-stone-800">Your content</h2>
        <p>
          You retain ownership of content you submit. You grant us a limited
          license to host, process, and display your content solely to provide
          the service.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-stone-800">Availability</h2>
        <p>
          We may change, suspend, or discontinue any part of the service at any
          time without notice.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-stone-800">Disclaimer</h2>
        <p>
          The service is provided on an "as is" and "as available" basis. We
          disclaim all warranties to the fullest extent permitted by law.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-stone-800">Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, Getout is not liable for any
          indirect, incidental, or consequential damages arising from your use of
          the service.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-stone-800">Termination</h2>
        <p>
          We may suspend or terminate access if you violate these terms. You may
          stop using the service at any time.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-stone-800">Contact</h2>
        <p>If you have questions, contact us at support@getout.app.</p>
      </section>
    </LegalLayout>
  );
}
