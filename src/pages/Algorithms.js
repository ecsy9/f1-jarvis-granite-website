import SectionPage from '../components/SectionPage';

function Algorithms() {
  return (
    <SectionPage title="Algorithms">
      <p>
        A detailed account of the machine learning approach underpinning F1 Jarvis Granite:
        why fine-tuning was chosen over alternative LLM strategies, how QLoRA makes it
        feasible, and how two specialised models were trained for distinct inference contexts.
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
          <strong>4-bit NF4 quantization</strong> — the base model's weights are loaded in
          4-bit normal-float format, reducing memory footprint by roughly 75% compared
          to full-precision loading while preserving model quality.
        </li>
        <li>
          <strong>LoRA adapters</strong> — instead of updating every weight in the network,
          small low-rank matrices are inserted at each attention layer. Only these adapter
          parameters — less than 1% of the total parameter count — are trained, leaving the
          frozen quantized base untouched.
        </li>
      </ul>
      <p>
        Together these techniques make fine-tuning IBM Granite feasible on a single
        consumer-grade GPU. The resulting adapter is compact, loads on top of the frozen base
        at inference time, and delivers near full fine-tune quality at a fraction of the
        compute cost.
      </p>

      <h2>Two Specialised Models</h2>
      <p>
        Rather than a single general-purpose model, the platform uses two fine-tuned IBM Granite
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
