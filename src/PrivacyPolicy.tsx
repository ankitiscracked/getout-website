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
          connect (such as Slack, Linear, GitHub, or Google Calendar), and
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
        <h2 className="text-xl font-semibold text-stone-800">Google user data</h2>
        <p>
          When you connect Google Calendar, we access your calendar events to
          display your schedule and allow you to create or edit events within the
          app. We also access your Google Contacts to suggest attendees when
          creating calendar events. This data is used solely to provide these
          user-facing features in the app.
        </p>
        <p>
          Our use of Google user data complies with the{" "}
          <a
            href="https://developers.google.com/terms/api-services-user-data-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-600 underline"
          >
            Google API Services User Data Policy
          </a>
          , including the Limited Use requirements. We do not use Google user
          data for advertising, do not sell or transfer it to third parties for
          advertising or any other purpose unrelated to the app's core
          functionality, and do not use it to build user profiles for advertising
          or to serve personalized ads.
        </p>
        <p>
          You can revoke Getout's access to your Google data at any time via your{" "}
          <a
            href="https://myaccount.google.com/connections"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-600 underline"
          >
            Google Account settings
          </a>
          .
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-stone-800">Sharing</h2>
        <p>
          We do not sell your personal information. We do not transfer personal
          information to third parties for advertising purposes or to data
          brokers. We may share information with service providers that help us
          operate the Service (including AI and infrastructure providers), with
          third-party integrations you connect when you request data or actions,
          or if required by law.
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
