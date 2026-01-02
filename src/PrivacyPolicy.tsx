import LegalLayout from "./LegalLayout";

export default function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy">
      <p>Effective date: January 1, 2026.</p>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-stone-800">Overview</h2>
        <p>
          This policy explains how Getout collects, uses, and shares information
          when you use our website and desktop app (the “Service”). It also
          explains what data is stored on your device versus on our servers.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-stone-800">Information we collect</h2>
        <p>
          We collect information you provide (such as emails you send to support
          and content you submit in the app), information from integrations you
          connect (such as Slack, Linear, Gmail, GitHub, or Google Calendar), and
          standard log data from your browser or device (such as IP address,
          device type, and pages visited) to keep the Service secure and
          functioning.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-stone-800">Where data is stored</h2>
        <p>
          On your device, we store app data such as notes, collections, drawings,
          and URL history. Your Getout session tokens are stored in your OS
          keychain. On our servers, we store integration tokens, chat
          conversations and metadata needed for features like history and
          summaries, and identifiers for selected context items (such as a Slack
          thread ID or Linear issue ID).
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-stone-800">How we use information</h2>
        <p>
          We use information to operate the Service, respond to requests, improve
          performance, protect against abuse, and provide features you request
          (including fetching data from connected integrations and generating
          summaries).
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-stone-800">AI processing</h2>
        <p>
          To provide AI features, we send relevant data (such as your prompts and
          selected context) to third-party AI service providers. We do not use
          your data to train our own models. A list of subprocessors is available
          on request.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-stone-800">Sharing</h2>
        <p>
          We do not sell your personal information. We may share information with
          service providers that help us operate the Service (including AI and
          infrastructure providers), with third-party integrations you connect
          when you request data or actions, or if required by law.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-stone-800">Retention</h2>
        <p>
          We keep information only as long as needed for the purposes described
          above, unless a longer period is required by law. You can request
          deletion of your server-stored data by contacting us.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-stone-800">Contact</h2>
        <p>If you have questions, contact us at support@getout.app.</p>
      </section>
    </LegalLayout>
  );
}
