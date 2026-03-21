import SectionPage from '../components/SectionPage';

function Algorithms() {
  return (
    <SectionPage title="Algorithms">
      <p>
        A detailed account of the machine learning approach underpinning Jarvis:
        why fine-tuning was chosen over alternative LLM strategies, how QLoRA makes it
        feasible, how two specialised models were trained for distinct inference contexts,
        and the rule-based event detection system that operates alongside the LLM.
      </p>

      <h2>Why Fine-Tuning?</h2>

      <h3>Teaching the Model to Think Like an F1 Engineer</h3>
      <p>
        Three broad strategies exist for adapting a foundation model to a specialist domain:
        prompt engineering, retrieval-augmented generation (RAG), and fine-tuning. Prompt
        engineering alone cannot reliably reproduce the terse, data-first communication style
        of a race engineer — every response depends on careful prompt construction and there
        is no persistent memory of domain conventions between calls.
      </p>
      <p>
        RAG was also considered: pairing the model with a live knowledge base of telemetry
        logs and race data would allow factual recall. However, RAG introduces a retrieval
        hop at every inference call — a non-trivial latency penalty in a real-time racing
        environment where feedback must arrive mid-corner. It also requires maintaining and
        indexing a retrieval corpus alongside the model.
      </p>
      <p>
        Fine-tuning was chosen because it bakes the engineering voice and domain reasoning
        directly into the model weights. Once trained, the model generates race debriefs,
        telemetry summaries, and strategic analysis without querying any external store. The
        result is a model that consistently frames observations the way a real race engineer
        would — prioritising lap delta, tyre state, and sector-by-sector breakdowns — making
        it well-suited for generating debriefs and analysis at scale. [1]
      </p>

      <h3>QLoRA: Parameter-Efficient Fine-Tuning</h3>
      <p>
        Full fine-tuning of a multi-billion parameter model demands tens of gigabytes of GPU
        memory and hours of compute — resources unavailable in a student project environment.
        QLoRA (Quantized Low-Rank Adaptation) resolves this by combining two complementary
        techniques: [1]
      </p>
      <ul>
        <li>
          <strong>4-bit NF4 quantisation</strong> — the base model's weights are loaded in
          4-bit normal-float format, reducing memory footprint by roughly 75% compared
          to full-precision loading while preserving model quality.
        </li>
        <li>
          <strong>LoRA adapters</strong> — instead of updating every weight in the network,
          small low-rank matrices are inserted at each attention layer. Only these adapter
          parameters — less than 1% of the total parameter count — are trained, leaving the
          frozen quantised base untouched.
        </li>
      </ul>
      <p>
        Together these techniques make fine-tuning specialist LLMs feasible on a single
        consumer-grade GPU. The resulting adapter is compact, loads on top of the frozen base
        at inference time, and delivers near full fine-tune quality at a fraction of the
        compute cost.
      </p>

      <h3>LoRA Hyperparameters</h3>
      <table className="section-table">
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Value</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>LoRA Rank (r)</td>
            <td>8</td>
            <td>Dimensionality of the low-rank decomposition — controls adapter capacity</td>
          </tr>
          <tr>
            <td>LoRA Alpha</td>
            <td>16</td>
            <td>Scaling factor applied to adapter outputs (alpha/r = 2x scaling)</td>
          </tr>
          <tr>
            <td>LoRA Dropout</td>
            <td>0.05</td>
            <td>Regularisation to prevent overfitting on small datasets</td>
          </tr>
          <tr>
            <td>Target Modules</td>
            <td>q_proj, k_proj, v_proj, o_proj</td>
            <td>All four attention projection matrices — captures query, key, value, and output transformations</td>
          </tr>
        </tbody>
      </table>

      <h2>LLM Selection</h2>
      <p>
        Three leading open-source foundation models were evaluated: IBM Granite, Llama 2/Mistral,
        and closed-source alternatives like GPT-4. The choice of base model affects fine-tuning
        cost, latency, and domain-specific output quality.
      </p>
      <table className="section-table">
        <thead>
          <tr>
            <th>Model</th>
            <th>Key Strengths</th>
            <th>Key Limitations</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Granite 4.0 Micro (Selected)</strong></td>
            <td>
              Enterprise-grade; domain-optimised; built for QLoRA; compact size runs on consumer CPUs
            </td>
            <td>
              Smaller than GPT-4; requires curated fine-tuning data
            </td>
          </tr>
          <tr>
            <td>ChatGPT / GPT-4</td>
            <td>
              State-of-the-art; minimal fine-tuning needed; robust across domains
            </td>
            <td>
              Closed-source; expensive; requires internet; latency from API calls;
              licensing constraints prevent local deployment
            </td>
          </tr>
          <tr>
            <td>Llama 2 / Mistral</td>
            <td>
              Open-source; large community; flexible; proven at scale
            </td>
            <td>
              Not domain-optimised; higher memory for larger variants; community support only
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        Granite 4.0 Micro was selected primarily because it enables fully offline inference
        on consumer hardware. After fine-tuning, the model is quantised to Q4_K_M GGUF format
        (~2 GB per model), reducing the original floating-point weights by approximately 75%
        with minimal quality loss. Inference runs via llama-cpp-python with no GPU required —
        critical for a desktop application distributed to end users who may not have dedicated
        graphics hardware.
      </p>

      <h2>Two Specialised Models</h2>
      <p>
        Rather than a single general-purpose model, the platform uses two fine-tuned Granite 4.0 Micro
        instances — each trained for a distinct inference context with different input formats,
        output styles, and latency requirements.
      </p>
      <figure className="page-figure">
        <img
          src={`${process.env.PUBLIC_URL}/images/finetuning_comparison.png`}
          alt="Comparison of base model vs fine-tuned model outputs for live race engineer and post-race analyst tasks"
        />
        <figcaption>
          Base model vs fine-tuned model outputs for both tasks. The fine-tuned model gives
          specific, structured responses; the base model gives generic ones.
          Training: QLoRA on ~1,000 F1 examples per task.
        </figcaption>
      </figure>

      <h3>Live Race Engineer Model</h3>
      <p>
        The live model operates on a completely different cadence. It receives a short telemetry
        snapshot — current speed, RPM, throttle percentage, and brake pressure — and returns a
        brief, radio-style instruction in the voice of a race engineer. Responses are intentionally
        terse: the driver is at speed and cannot process a paragraph. Training data was structured
        as prompt–completion pairs to reinforce this concise output format.
      </p>
      <pre className="code-block"><code>{`// Training pair
Prompt:     "Telemetry: speed 256.4, rpm 10647.8,
             throttle 82.8, brake 12.3. Advice:"

Completion: "Good job Oscar, these tyres are now in,
             based on the first stint we can use the rear
             a bit more, tyres look good."`}</code></pre>
      <p>
        At inference time, the live model is constrained to a maximum of 48 tokens per response
        with a temperature of 0.3 to ensure deterministic, consistent outputs. A 5-second
        generation timeout prevents the model from blocking the telemetry pipeline.
      </p>

      <h3>Post-Race Debrief Model</h3>
      <p>
        This model ingests a structured JSON payload produced at the end of each session: race
        result, lap-by-lap times, stint breakdowns including compound and average pace, pit stop
        data, and a sample of low-frequency car telemetry (speed, RPM, gear, throttle, brake,
        DRS). From this it generates a multi-section engineering debrief — covering pace
        consistency, tyre degradation analysis, strategy effectiveness, driver strengths and
        weaknesses, and actionable recommendations — written in the formal register of an F1
        post-race report.
      </p>
      <pre className="code-block"><code>{`// Training pair (abridged)
Input:  { "result": {"start":1,"finish":1},
          "lap_summary": {"total":57,"avg":98.89,
            "fastest":{"lap":44,"time":96.236}},
          "stints": [
            {"compound":"SOFT","laps":"1-36","avg_time":98.624},
            {"compound":"HARD","laps":"37-57","avg_time":99.347}
          ], ... }

Output: "### 1. Overall Performance and Result
         Max Verstappen secured a P1 finish, delivering a dominant
         and controlled performance throughout the 57-lap event...
         ### 2. Pace Consistency and Key Lap Times
         The driver's pace was exceptionally stable...
         ### 3. Tire Management and Degradation
         Analysis of the Soft compound (Stint 1) reveals minimal
         degradation — only +0.508s over 11 laps (~0.046s/lap)...
         ### 4. Strategy Effectiveness
         The strategy utilised two primary pit windows...
         ### 5. Strengths
         Exceptional Consistency: sub-98s laps maintained regardless
         of fuel load or compound...
         ### 6. Weaknesses
         Lap 36 Variance: a 100.964s lap just prior to the second
         pit stop suggests a 3.1s drop-off from the previous lap...
         ### 7. Comparison to Teammate / Field
         The driver's ability to maintain 97s pace on used Softs
         suggests a significant aerodynamic platform advantage...
         ### 8. Analysis of Car Data
         Telemetry samples show 254 km/h in 7th gear at 9861 RPM
         with 1% braking — consistent with high-speed stabilisation...
         ### 9. Recommendations
         Investigate Laps 20–30 to determine whether ERS deployment
         or tyre surface temperature drove the mid-stint improvement..."`}</code></pre>
      <p>
        The two-model approach means each adapter is optimised for its task: the debrief model
        is allowed full markdown output and multi-paragraph reasoning, while the live model is
        penalised during training for verbose completions. Neither use case was well served by a
        single combined model.
      </p>

      <h2>Data</h2>

      <h3>Dataset</h3>
      <p>
        Both models were fine-tuned on approximately 1,000 curated training examples per task,
        constructed from real F1 race data. Each example pairs a telemetry input with an
        expert-style response:
      </p>
      <ul>
        <li>
          <strong>Live Race Engineer dataset:</strong> ~1,000 prompt–completion pairs mapping
          telemetry snapshots (speed, RPM, throttle, brake, tire data, fuel levels) to concise
          radio-style instructions. Examples were written to reflect the communication patterns
          of real F1 team radio — terse, data-specific, and prioritised by urgency.
        </li>
        <li>
          <strong>Post-Race Analyst dataset:</strong> ~1,000 structured JSON–to–debrief pairs.
          Each input contains a full session summary (race result, lap-by-lap times, stint
          breakdowns, pit stop data, telemetry samples) and each output is a multi-section
          engineering report following a consistent 9-section format.
        </li>
      </ul>

      <h3>Data Preprocessing</h3>
      <p>
        Raw telemetry data undergoes several preprocessing steps before being presented to the
        models:
      </p>
      <ul>
        <li>
          <strong>Lap time validation:</strong> Invalid and negative lap times are filtered out
          to prevent the model from learning on corrupted data.
        </li>
        <li>
          <strong>Fuel consumption tracking:</strong> Per-lap fuel usage is calculated by
          comparing fuel levels at lap start and end. Pit stops are detected when fuel increases
          by more than 2 litres between consecutive laps — indicating a refuel event.
        </li>
        <li>
          <strong>Stint detection:</strong> Sessions are automatically segmented into stints
          based on detected pit stops, providing the model with strategic context about
          compound changes and stint lengths.
        </li>
        <li>
          <strong>Telemetry aggregation:</strong> High-frequency telemetry (~60Hz) is maintained
          in a rolling 60-second buffer of 600 samples. For prompt construction, this is
          summarised into key statistics (averages, peaks, trends) to fit within the model's
          context window.
        </li>
        <li>
          <strong>Prompt truncation:</strong> Inputs exceeding 1,024 tokens are truncated to
          ensure the model has sufficient context window remaining for response generation
          within the 2,048-token context limit.
        </li>
      </ul>

      <h3>Training</h3>
      <p>
        Both models were trained using the same QLoRA configuration on the Granite 4.0 Micro
        base. After training, a three-stage conversion pipeline produces the final deployable
        models:
      </p>
      <ol>
        <li>
          <strong>Merge:</strong> The LoRA adapter weights are merged back into the base model,
          producing a full-precision merged checkpoint.
        </li>
        <li>
          <strong>Convert:</strong> The merged model is converted to GGUF format (f16
          intermediate) using llama.cpp tooling.
        </li>
        <li>
          <strong>Quantise:</strong> The f16 GGUF is quantised to Q4_K_M — a medium quantisation
          level that balances model quality against file size and inference speed. The resulting
          ~2 GB files run efficiently on consumer CPUs without GPU acceleration.
        </li>
      </ol>
      <p>
        The final GGUF models are hosted on Hugging Face Hub and automatically downloaded on
        first launch, with a progress dialog informing the user of download status.
      </p>

      <h2>Inference Architecture</h2>

      <h3>Two-Layer Detection System</h3>
      <p>
        The live AI race engineer operates as a two-layer system: a fast rule-based telemetry
        agent for event detection, and a slower LLM agent for natural language response
        generation.
      </p>

      <table className="section-table">
        <thead>
          <tr>
            <th>Layer</th>
            <th>Component</th>
            <th>Latency</th>
            <th>Function</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1 — Detection</td>
            <td>TelemetryAgent (rule-based)</td>
            <td>&lt;50ms</td>
            <td>Evaluates telemetry against thresholds; emits typed events with priority levels</td>
          </tr>
          <tr>
            <td>2 — Generation</td>
            <td>RaceEngineerAgent (LLM)</td>
            <td>~2–5s</td>
            <td>Receives events + session context; generates natural language response via GGUF inference</td>
          </tr>
        </tbody>
      </table>

      <h3>Event Detection Thresholds</h3>
      <p>
        The rule-based TelemetryAgent monitors live telemetry against configurable thresholds
        to detect race-critical events without LLM involvement:
      </p>
      <table className="section-table">
        <thead>
          <tr>
            <th>Event Category</th>
            <th>Warning Threshold</th>
            <th>Critical Threshold</th>
            <th>Cooldown</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Fuel Remaining</td>
            <td>≤ 5 laps</td>
            <td>≤ 2 laps</td>
            <td>60s / 45s</td>
          </tr>
          <tr>
            <td>Tire Temperature</td>
            <td>≥ 100°C</td>
            <td>≥ 110°C</td>
            <td>—</td>
          </tr>
          <tr>
            <td>Tire Wear</td>
            <td>≥ 70%</td>
            <td>≥ 85%</td>
            <td>—</td>
          </tr>
          <tr>
            <td>Wheel Slip</td>
            <td>≥ 50.0 ratio</td>
            <td>≥ 100.0 ratio</td>
            <td>Speed &gt; 10 km/h filter</td>
          </tr>
          <tr>
            <td>Gap Change</td>
            <td colspan="2">≥ 1.0s change (ahead or behind)</td>
            <td>—</td>
          </tr>
        </tbody>
      </table>

      <h3>Event Priority System</h3>
      <p>
        Detected events are assigned one of four priority levels that determine how they
        are queued and whether they interrupt ongoing LLM generation:
      </p>
      <ul>
        <li><strong>CRITICAL (0):</strong> Immediate interrupts — fuel critical, brake failure, collision</li>
        <li><strong>HIGH (1):</strong> Urgent alerts — pit now, tire failure, wheel slip critical</li>
        <li><strong>MEDIUM (2):</strong> Queued normally — pit window open, gap changes, lap summary</li>
        <li><strong>LOW (3):</strong> Skipped if busy — sector times, minor telemetry updates</li>
      </ul>

      <h3>Verbosity Levels</h3>
      <p>
        The LLM response length is controlled by three verbosity modes, each with a dedicated
        prompt template:
      </p>
      <table className="section-table">
        <thead>
          <tr>
            <th>Mode</th>
            <th>Max Length</th>
            <th>Style</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Minimal</td>
            <td>&lt;15 words</td>
            <td>Urgent, clipped</td>
            <td>"Box box! Fuel critical."</td>
          </tr>
          <tr>
            <td>Moderate (default)</td>
            <td>1–2 sentences</td>
            <td>Direct, informative</td>
            <td>"Fuel for two more laps. We need to box this lap, confirm box."</td>
          </tr>
          <tr>
            <td>Verbose</td>
            <td>Up to 4 sentences</td>
            <td>Detailed with reasoning</td>
            <td>"Fuel is critical at 1.8 laps remaining. Gap behind is 3.2 seconds so we have clean air for an in-lap. Box this lap, we'll switch to hards for the final stint."</td>
          </tr>
        </tbody>
      </table>

      <h3>Conversation History</h3>
      <p>
        The race engineer maintains a rolling conversation history of the last 3 driver–engineer
        exchanges. This allows the LLM to maintain context across interactions — for example,
        if the driver asks "what about the rears?" after a fronts discussion, the model has
        the prior exchange available to interpret the follow-up correctly.
      </p>

      <h3>Inference Parameters</h3>
      <table className="section-table">
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Value</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Max Tokens</td>
            <td>48</td>
            <td>Enforces brevity for live radio-style responses</td>
          </tr>
          <tr>
            <td>Temperature</td>
            <td>0.3</td>
            <td>Low variance for consistent, deterministic outputs</td>
          </tr>
          <tr>
            <td>Top K</td>
            <td>50</td>
            <td>Limits token sampling pool</td>
          </tr>
          <tr>
            <td>Top P (nucleus)</td>
            <td>0.95</td>
            <td>Cumulative probability cutoff for sampling</td>
          </tr>
          <tr>
            <td>Context Window</td>
            <td>2,048 tokens</td>
            <td>Maximum input + output length per inference call</td>
          </tr>
          <tr>
            <td>Generation Timeout</td>
            <td>5 seconds</td>
            <td>Prevents blocking the telemetry pipeline on slow hardware</td>
          </tr>
        </tbody>
      </table>

      <h2>References</h2>
      <ol className="ref-list">
        <li>
          Hugging Face — QLoRA: Efficient Finetuning of Quantized LLMs (2023):{' '}
          <a href="https://huggingface.co/blog/qlora" target="_blank" rel="noopener noreferrer">
            QLoRA Blog Post
          </a>
        </li>
      </ol>
    </SectionPage>
  );
}

export default Algorithms;
