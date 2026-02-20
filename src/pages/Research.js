import SectionPage from '../components/SectionPage';

function Research() {
  return (
    <SectionPage title="Research">
      <p>
        Background research informing the design of the F1 Jarvis TORCS platform, covering
        the problem space, existing solutions, and the gap this project addresses.
      </p>

      <h2>Problem Description</h2>
      <p>
        Current telemetry analysis tools in motorsport present a significant barrier to entry
        for educational teams and competitive sim racers. Professional Formula 1 teams employ
        sophisticated engineering systems with dedicated staff for real-time data interpretation,
        however these solutions are prohibitively expensive and complex.
      </p>
      <p>
        Formula Student teams often rely on basic data logging without intelligent analysis
        capabilities, while sim racers typically have limited access to the engineering insights
        that professional drivers receive during races. Without AI-assisted analysis, identifying
        optimal braking points, understanding tire degradation patterns, or making strategic pit
        stop decisions remains difficult for non-expert users.
      </p>

      <h2>Motivation</h2>
      <h3>Educational Value</h3>
      <p>
        Formula Student teams need accessible tools to analyse vehicle performance data and make
        data-driven design decisions. By providing AI-guided insights, the platform allows access
        to sophisticated telemetry analysis without requiring deep domain expertise.
      </p>
      <h3>Competitive Enhancement</h3>
      <p>
        The competitive sim racing community has grown substantially, yet most racers lack the
        real-time engineering support that professional drivers receive. An AI race engineer
        providing live feedback and strategy recommendations can significantly improve both
        performance and the immersive racing experience.
      </p>
      <h3>Technology Demonstration</h3>
      <p>
        This project showcases practical applications of IBM's Granite foundation models in
        real-time data analysis, conversational AI, and decision support systems — use cases
        extending far beyond motorsport to industrial IoT, manufacturing optimisation, and
        remote monitoring applications.
      </p>

      <h2>Existing Solutions & Limitations</h2>
      <table className="section-table">
        <thead>
          <tr>
            <th>Solution</th>
            <th>Type</th>
            <th>Limitation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>MoTeC / Atlas</td>
            <td>Professional telemetry</td>
            <td>Prohibitive cost; requires specialist operators</td>
          </tr>
          <tr>
            <td>RaceLab</td>
            <td>Sim racing overlay</td>
            <td>Display-only; no AI analysis or strategy</td>
          </tr>
          <tr>
            <td>FastF1</td>
            <td>Python analysis library</td>
            <td>Post-race only; no real-time or vocal output</td>
          </tr>
          <tr>
            <td>CAN bus loggers</td>
            <td>Hardware data logging</td>
            <td>Raw data only; requires manual analysis</td>
          </tr>
        </tbody>
      </table>
      <p>
        <strong>Critical Gap:</strong> No unified platform currently integrates real-time sensors,
        multiple simulators, and autonomous AI strategy generation with vocal output.
      </p>

      <h2>References</h2>
      <ol className="ref-list">
        <li>
          SAP News — IBM Granite LLM (2024):{' '}
          <a href="https://news.sap.com/uk/2024/10/ibm-granite-llm-now-available-through-the-generative-ai-hub-in-sap-ai-core/" target="_blank" rel="noopener noreferrer">
            IBM Granite LLM now available through SAP AI Core
          </a>
        </li>
        <li>
          EMQX — CAN Bus Basics (2025):{' '}
          <a href="https://www.emqx.com/en/blog/can-bus-how-it-works-pros-and-cons" target="_blank" rel="noopener noreferrer">
            CAN Bus: How It Works, Pros and Cons
          </a>
        </li>
        <li>
          Hugging Face — QLoRA: Efficient Finetuning of Quantized LLMs (2023):{' '}
          <a href="https://huggingface.co/blog/qlora" target="_blank" rel="noopener noreferrer">
            QLoRA Blog Post
          </a>
        </li>
        <li>
          All Creator Tools — Sim Racing Overlays (2025):{' '}
          <a href="https://allcreatortools.com/blog/overlays-for-sim-racing-racelab-and-its-alternatives" target="_blank" rel="noopener noreferrer">
            RaceLab and Its Alternatives
          </a>
        </li>
        <li>
          Technology Magazine — IBM Granite 3.1 (2024):{' '}
          <a href="https://technologymagazine.com/articles/the-key-to-how-ibms-granite-3-1-is-advancing-enterprise-ai" target="_blank" rel="noopener noreferrer">
            How IBM Granite 3.1 is Advancing Enterprise AI
          </a>
        </li>
        <li>
          GitHub — F1 Telemetry (2022):{' '}
          <a href="https://github.com/hynesconnor/formula1-telemetry-tool" target="_blank" rel="noopener noreferrer">
            formula1-telemetry-tool
          </a>
        </li>
        <li>
          Missouri State CS — TORCS Manual:{' '}
          <a href="https://computerscience.missouristate.edu/SAIL/_Files/Simulated-Car-Racing-Championship-Competition-Software-Manual.pdf" target="_blank" rel="noopener noreferrer">
            TORCS Competition Software Manual
          </a>
        </li>
        <li>
          AutoPi — CAN Bus Data (2025):{' '}
          <a href="https://www.autopi.io/blog/how-to-read-can-bus-data/" target="_blank" rel="noopener noreferrer">
            How to Read CAN Bus Data
          </a>
        </li>
        <li>
          InfluxDB Documentation:{' '}
          <a href="https://docs.influxdata.com/influxdb/v2.6/" target="_blank" rel="noopener noreferrer">
            InfluxDB v2.6 Docs
          </a>
        </li>
        <li>
          Unreal Engine 5 VR Documentation:{' '}
          <a href="https://docs.unrealengine.com/5.3/en-US/unreal-engine-vr-development/" target="_blank" rel="noopener noreferrer">
            UE5 VR Development
          </a>
        </li>
      </ol>
    </SectionPage>
  );
}

export default Research;
