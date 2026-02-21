import SectionPage from '../components/SectionPage';

function Evaluation() {
  return (
    <SectionPage title="Evaluation">
      <p>
        Evaluation criteria, risk assessment, and ethical considerations for the
        F1 Jarvis Granite platform.
      </p>

      <h2>Success Criteria</h2>
      <ul>
        <li>2D platform displays real-time telemetry with &lt;500ms latency</li>
        <li>AI recommendations achieve &gt;85% accuracy on test scenarios</li>
        <li>Data integration functional from CAN bus and simulators to database</li>
        <li>IBM Granite with Jarvis orchestration operational with &lt;3 sec response times</li>
        <li>≥3 Formula Student members confirm value (SUS score &gt;70)</li>
        <li>VR platform renders 3D model with interactive telemetry at &gt;60 FPS</li>
        <li>Complete documentation enables system replication by a new team</li>
      </ul>

      <h2>Risk Assessment</h2>
      <table className="section-table">
        <thead>
          <tr>
            <th>Risk</th>
            <th>Likelihood</th>
            <th>Impact</th>
            <th>Mitigation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Formula Student testing timeline misalignment</td>
            <td>Medium</td>
            <td>Medium</td>
            <td>Prioritise simulator integration first; use Proteus as fallback</td>
          </tr>
          <tr>
            <td>TORCS/AC API changes or unavailability</td>
            <td>Low</td>
            <td>High</td>
            <td>Document API versions; design adapter pattern for protocol swaps</td>
          </tr>
          <tr>
            <td>IBM Granite API limits or quota exhaustion</td>
            <td>Medium</td>
            <td>Medium</td>
            <td>Implement caching; monitor usage; apply for increased academic quota</td>
          </tr>
          <tr>
            <td>VR performance issues on target hardware</td>
            <td>Medium</td>
            <td>High</td>
            <td>Early prototyping; aggressive optimisation; reduce model complexity if needed</td>
          </tr>
          <tr>
            <td>Scope creep</td>
            <td>High</td>
            <td>High</td>
            <td>Strict prioritisation: 2D + simulators first, then AI, then VR; scope frozen after Week 4</td>
          </tr>
          <tr>
            <td>Limited LLM fine-tuning data</td>
            <td>Medium</td>
            <td>Medium</td>
            <td>Crowdsource examples from Formula Student and sim racing community</td>
          </tr>
        </tbody>
      </table>

      <h2>Ethical & Legal Considerations</h2>
      <h3>Data Privacy</h3>
      <p>
        GDPR compliance through anonymisation, informed consent, and secure storage.
        No personal data shared with external parties without explicit consent.
        All test datasets anonymised before use.
      </p>
      <h3>Accessibility</h3>
      <p>
        WCAG 2.1 guidelines applied to the 2D platform. VR limitations are acknowledged and
        the 2D dashboard provides full functionality as an alternative for users who cannot
        use VR hardware.
      </p>
      <h3>Open Source</h3>
      <p>
        MIT License for project code. Third-party licences respected: TORCS (GPL),
        Unreal Engine licence terms, IBM Granite academic programme terms.
      </p>
      <h3>Safety</h3>
      <p>
        AI recommendations are advisory only — disclaimers clarify they do not replace
        qualified engineering judgement. VR motion sickness mitigated by targeting &gt;90 FPS.
        Sim racing entertainment-only warnings included.
      </p>
      <h3>AI Transparency</h3>
      <p>
        Transparency maintained regarding AI limitations. Recommendations include an explanation
        of reasoning, and users can flag incorrect or unhelpful recommendations for review.
      </p>
    </SectionPage>
  );
}

export default Evaluation;
