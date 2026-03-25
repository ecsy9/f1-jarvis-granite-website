import SectionPage from '../../components/SectionPage';

function GDPRPrivacy() {
  return (
    <SectionPage title="GDPR and Privacy of Data">
      <p>
        This appendix explains how the F1 Live Telemetry Dashboard handles telemetry and any
        associated personal data in line with GDPR principles. It is written for course assessment
        purposes and does not constitute legal advice.
      </p>

      <h2>Data collected</h2>
      <p>
        The application processes two distinct categories of data:
      </p>
      <h3>1. User-generated telemetry (when using the dashboard)</h3>
      <p>
        Technical telemetry data such as car speed, position, lap times, tire temperatures and
        pressures, fuel usage, and session metadata (track, car model, session type and timestamps).
      </p>
      <p>
        If the optional AI race engineer and voice features are enabled, the system may also process:
      </p>
      <ul>
        <li>Voice audio streams for speech-to-text processing</li>
        <li>Text transcripts of driver questions</li>
        <li>AI-generated commentary linked to a specific session or driver</li>
      </ul>
      <p>
        When these data points can be linked to an identifiable individual (for example, via a
        username), they are treated as personal data under GDPR.
      </p>

      <h3>2. Historical F1 telemetry (for AI model training only)</h3>
      <p>
        The AI race engineer model was fine-tuned on historical Formula 1 telemetry data sourced
        from public APIs:
      </p>
      <ul>
        <li>
          <strong>openf1</strong>: Community-maintained Python library providing aggregated F1 race
          data from official sources
        </li>
        <li>
          <strong>fastf1</strong>: Open-source F1 telemetry data provider, also aggregating publicly
          available race information
        </li>
      </ul>
      <p>
        This historical data is:
      </p>
      <ul>
        <li>Publicly available from official F1 sources</li>
        <li>Aggregated in anonymous form (team and car numbers, not personal identifiers)</li>
        <li>Used solely for training the AI model to recognize driving patterns</li>
        <li>Not stored or retained in the application after model training</li>
        <li>Not used for any profiling or purposes beyond improving the AI advisor</li>
      </ul>

      <h2>Purpose and legal basis</h2>
      <p>
        User-generated data is processed for the following purposes:
      </p>
      <ul>
        <li>Providing real-time visual feedback to the driver</li>
        <li>Recording sessions so performance can be reviewed later</li>
        <li>Enabling the AI race engineer to generate advice and respond to questions</li>
      </ul>
      <p>
        Historical F1 telemetry data is processed solely for training machine learning models to
        improve the accuracy and responsiveness of the AI race engineer feature. This training data
        is not retained after the model is finalized and does not inform ongoing personalization.
      </p>
      <p>
        In an educational or personal-use context, the primary lawful basis is legitimate interest
        in analysing and improving driving performance. In a production or commercial deployment,
        an appropriate lawful basis, such as explicit consent from drivers, would need to be
        clearly documented and obtained.
      </p>

      <h2>Data controller</h2>
      <p>
        For the purposes of GDPR, the data controller is the individual or team member whose
        machine runs the dashboard, as the application operates entirely locally and autonomously.
        The data remains under the control and responsibility of the user who operates the system.
      </p>

      <h2>Storage and retention</h2>
      <p>
        Telemetry samples, lap information and AI interactions are stored locally in a SQLite
        database file (<code>data/telemetry_sessions.db</code>) on the machine where the
        application runs.
      </p>
      <p>
        By default, data is retained until the user manually deletes the database file or uses
        provided tools to remove individual sessions. A real-world deployment should define and
        implement a formal retention policy, such as automatic deletion after a fixed period.
      </p>

      <h2>Third-party services</h2>
      <p>
        The application integrates with third-party services in two distinct ways:
      </p>
      <h3>At runtime (when using the dashboard)</h3>
      <p>
        When voice features are enabled, audio data is processed by:
      </p>
      <ul>
        <li>
          <strong>IBM Watson Speech-to-Text and Text-to-Speech services</strong>, which receive
          short segments of audio to transcribe or to generate spoken responses
        </li>
      </ul>
      <p>
        These services are accessed over encrypted HTTPS connections using API keys configured in
        the <code>.env</code> file. The project itself does not perform advertising or unrelated
        profiling, but processing is ultimately subject to IBM&apos;s own service terms and privacy
        policies.
      </p>

      <h3>During development (model training only)</h3>
      <p>
        The AI race engineer model was trained using public APIs:
      </p>
      <ul>
        <li><strong>openf1</strong> and <strong>fastf1</strong> for historical F1 telemetry</li>
      </ul>
      <p>
        This data retrieval occurs only during model development and training. The trained model
        does not continue to access these APIs at runtime, and no personal user data is shared with
        these services.
      </p>

      <h2>Data subject rights</h2>
      <p>
        Under GDPR, individuals have rights such as:
      </p>
      <ul>
        <li>Right of access to data stored about them</li>
        <li>Right to rectification of inaccurate data</li>
        <li>Right to erasure (deletion of their data)</li>
        <li>Right to restrict or object to certain types of processing</li>
      </ul>
      <p>
        In this course project, these rights are modelled conceptually through the ability to
        delete or export driving sessions from the local database. A full production system should
        provide explicit user-facing controls and contact details for exercising these rights.
      </p>

      <h2>Security measures</h2>
      <p>
        All telemetry and AI interaction data is stored locally on the user&apos;s machine. The
        application does not expose a remote API or open ports for external access by default.
      </p>
      <p>
        Users are responsible for protecting the workstation on which the dashboard runs, for
        example through operating-system user accounts, disk encryption, and secure backups. API
        keys and credentials are stored in a local <code>.env</code> file, which should never be
        committed to version control or shared publicly.
      </p>

      <h2>Scope and disclaimer</h2>
      <p>
        This project has been built as part of a university systems course and is intended for
        demonstration and educational use. If the dashboard is deployed in a real-world or
        commercial environment, a full GDPR compliance review, a detailed privacy policy, and a
        data-processing agreement with any third-party providers would be required.
      </p>
      <p>
        The information in this appendix is a high-level overview of intended privacy practices and
        is not legal advice.
      </p>
    </SectionPage>
  );
}

export default GDPRPrivacy;
