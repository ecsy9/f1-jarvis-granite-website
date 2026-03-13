import SectionPage from '../components/SectionPage';

function UIDesign() {
  return (
    <SectionPage title="UI Design">

      <h2>Sketches</h2>
      <p>
        We drew two options of sketches to better visualise the user interface of the
        application, and to help receive more detailed feedback on the users' preferences.
      </p>

      <h3>Option 1 — Information Abundance</h3>
      <p>Emphasising comprehensive data availability.</p>
      <div className="sketch-grid">
        <figure className="sketch-grid__item">
          <img
            src={`${process.env.PUBLIC_URL}/images/option1_1.jpg`}
            alt="Option 1 sketch — screen 1"
          />
          <figcaption>Screen 1</figcaption>
        </figure>
        <figure className="sketch-grid__item">
          <img
            src={`${process.env.PUBLIC_URL}/images/option1_2.jpg`}
            alt="Option 1 sketch — screen 2"
          />
          <figcaption>Screen 2</figcaption>
        </figure>
        <figure className="sketch-grid__item">
          <img
            src={`${process.env.PUBLIC_URL}/images/option1_3.jpg`}
            alt="Option 1 sketch — screen 3"
          />
          <figcaption>Screen 3</figcaption>
        </figure>
      </div>

      <h3>Option 2 — Progressive Disclosure</h3>
      <p>Prioritising critical data based on current context.</p>
      <div className="sketch-grid">
        <figure className="sketch-grid__item">
          <img
            src={`${process.env.PUBLIC_URL}/images/option2_1.jpg`}
            alt="Option 2 sketch — screen 1"
          />
          <figcaption>Screen 1</figcaption>
        </figure>
        <figure className="sketch-grid__item">
          <img
            src={`${process.env.PUBLIC_URL}/images/option2_2.jpg`}
            alt="Option 2 sketch — screen 2"
          />
          <figcaption>Screen 2</figcaption>
        </figure>
        <figure className="sketch-grid__item">
          <img
            src={`${process.env.PUBLIC_URL}/images/option2_3.jpg`}
            alt="Option 2 sketch — screen 3"
          />
          <figcaption>Screen 3</figcaption>
        </figure>
      </div>

      <h2>Evaluation of Sketches</h2>
      <p>
        Before moving onto prototype development, we decided to make use of feedback from
        the users on the design alternatives for a formal evaluation. The participant
        demographics from the user consultation are as follows: 12 participants (6 gamers
        and 6 engineers); age range of 25–48; 58% male, 42% female; range of 2–18 years
        of experience in the field. [4]
      </p>
      <table className="section-table">
        <thead>
          <tr>
            <th>Heuristic</th>
            <th>Option 1 — "Information Abundance"</th>
            <th>Option 2 — "Progressive Disclosure"</th>
            <th>Key Insights</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Visibility of System Status</strong></td>
            <td>
              All telemetry data is displayed simultaneously, but the overload of graphs
              makes it hard to track updates. (avg. task completion time: 8.3 secs)
            </td>
            <td>
              Clearly indicates live data streams and AI analysis stages with real-time
              highlights and dynamic graphs. (avg. task completion time: 2.7 secs)
            </td>
            <td>
              Option 2 offers better real-time awareness and visual clarity under time
              pressure.
            </td>
          </tr>
          <tr>
            <td><strong>Error Prevention</strong></td>
            <td>
              Dense layout increases chance of selecting or interpreting the wrong
              dataset. (avg. error rate: 23%)
            </td>
            <td>
              Displays only contextually relevant information, preventing user confusion.
              (avg. error rate: 8%)
            </td>
            <td>
              Option 2 minimises cognitive load and supports safer, more accurate
              interaction.
            </td>
          </tr>
          <tr>
            <td><strong>Error Recognition &amp; Recovery (AI Support)</strong></td>
            <td>
              AI feedback exists only in a small text box, disconnected from visual
              graphs — users must interpret meaning manually.
            </td>
            <td>
              AI integrates directly into telemetry visualisations (real vs. ideal
              performance graphs) and suggests corrective actions visually and textually.
            </td>
            <td>
              Option 2 enables faster error recognition and guided recovery through
              AI-driven visual feedback.
            </td>
          </tr>
        </tbody>
      </table>

      <div className="design-decision">
        <strong>Design Decision:</strong> Proceed with Option 2's adaptive approach for
        the wireframe prototype, but incorporate user preference toggle for "Expert Mode"
        that enables Option 1-style comprehensive dashboard for post-race analysis and
        advanced users who prefer manual control.
      </div>

      <h2>References</h2>
      <ol className="ref-list">
        <li>[4] Research Consent Form — participant data collected under informed consent.</li>
      </ol>

    </SectionPage>
  );
}

export default UIDesign;
