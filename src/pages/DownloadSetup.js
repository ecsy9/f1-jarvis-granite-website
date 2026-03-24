import { useState } from 'react';
import SectionPage from '../components/SectionPage';
import './DownloadSetup.css';

const FAQS = [
  {
    q: "My Speech-To-Text isnt working — what should I do?",
    a: "Go to your windows settings and ensure that your primary voice input device is the one that you wish to use for voice input. Alternatively, make sure that you are in a quiet area where there isnt too much outside noise",
  },
  {
    q: "Can I use a steering wheel button for push-to-talk instead of a keyboard key?",
    a: "Yes — supported wheel hardware will appear in the push-to-talk button selector in Settings. Make sure the button you choose is not already bound to a function inside Assetto Corsa, otherwise both actions will fire simultaneously.",
  },
  {
    q: "Does Jarvis work with all Assetto Corsa cars and tracks?",
    a: "Jarvis reads from Assetto Corsa's shared memory interface, which is car- and track-agnostic. All telemetry channels (speed, RPM, tyres, fuel, etc.) are available regardless of which car or track you choose.",
  },
  {
    q: "Can I use Jarvis Post without having run a live session first?",
    a: "Jarvis Post analyses the telemetry file written during your session. You must run at least one Jarvis Live session to generate that file — without it, there is nothing for Jarvis Post to analyse. Alternatively, you can import a previously exported session file and run Jarvis Post based on the imported session data.",
  },
  {
    q: "What happens if I close Jarvis Live mid-session?",
    a: "Telemetry recorded up to that point is saved. When you later open Jarvis Post it will analyse whatever data was captured before you closed the app.",
  },
  {
    q: "I get wheel slip warnings constantly. Why?",
    a: "This is most common when playing on keyboard. Unlike a wheel or gamepad, keyboard inputs are binary — brake and throttle are either fully on or fully off, with no gradual pressure. This causes abrupt traction breaks that reliably trip the wheel slip threshold, even when your driving feels smooth to you. It is not a bug. If the alerts become disruptive, switch the AI verbosity to Minimal in Settings so wheel slip events produce shorter, less intrusive messages rather than full commentary.",
  },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item${open ? ' faq-item--open' : ''}`}>
      <button className="faq-item__q" onClick={() => setOpen(o => !o)}>
        <span>{q}</span>
        <span className="faq-item__arrow">{open ? '▲' : '▼'}</span>
      </button>
      {open && <div className="faq-item__a">{a}</div>}
    </div>
  );
}

const DOWNLOAD_URL = null; // TODO: replace with GitHub Release URL when ready

function DownloadSetup() {
  return (
    <SectionPage title="Download & Setup">
      <div className="download-hero">
        <div className="download-hero__info">
          <span className="download-hero__badge">Windows · v1.0</span>
          <p className="download-hero__desc">
            Download the Jarvis executable and follow the setup guide below to get started.
          </p>
        </div>
        {DOWNLOAD_URL ? (
          <a
            href={DOWNLOAD_URL}
            className="download-btn"
            download
          >
            ↓ Download Jarvis Live (.exe)
          </a>
        ) : (
          <span className="download-btn download-btn--disabled" title="Release coming soon">
            ↓ Download Coming Soon
          </span>
        )}
      </div>

      <h2>Setup instructions</h2>
      <p>1. Download Assetto Corsa</p>
      <p>2. Download Content Manager for Assetto Corsa (Lite version is fine)</p>
      <p>3. Go to Content Manager &gt; Settings &gt; Assetto Corsa &gt; System &gt; Allow Developer Apps</p>
      <p>4. Again in Content Manager &gt; Settings &gt; Assetto Corsa &gt; Python Apps &gt; Enable Python Apps / Developer Apps</p>
      <p>5. Download Jarvis.exe from link above and run it. Wait for local LLM models to download (the download starts as you first run the executable) </p>
      <p>6. Launch any session in Assetto Corsa and make sure Jarvis Live is running before you start driving to collect data</p>
      <p>7. After you are done with your driving session, exit Jarvis Live and navigate to Jarvis Post for post-race analysis</p>

      <h2>Recommended Hardware &amp; Known Limitations</h2>
      <div className="scope-grid">
        <div className="scope-box scope-box--in">
          <div className="scope-box__title">Recommended Hardware</div>
          <ul>
            <li><strong>OS:</strong> Windows only (AC shared memory is Windows-specific)</li>
            <li><strong>RAM:</strong> 8 GB+ (AC + Jarvis + AI models running simultaneously)</li>
            <li><strong>GPU/CPU:</strong> A decent CPU helps with AI inference speed (~2s per response) — the LLM runs locally</li>
            <li><strong>Disk:</strong> ~4 GB free for the two GGUF AI models (downloaded automatically on first launch)</li>
            <li><strong>Microphone:</strong> Required only if using voice input for the AI race engineer</li>
          </ul>
        </div>
        <div className="scope-box scope-box--out">
          <div className="scope-box__title">Known Limitations</div>
          <ul>
            <li>Windows only — no macOS/Linux support (AC shared memory dependency)</li>
            <li>AI race engineer responses have ~2 second latency (local LLM inference)</li>
            <li>First launch downloads ~4 GB of AI models (one-time, requires internet)</li>
          </ul>
        </div>
      </div>

      <h2>In-App settings</h2>
      <p>
        To make sure voice communication behaves as expected, go to Settings in Jarvis App and choose Disabled, Push-to-Talk, or Contunious to determine how you want to interact with the voice system. If you select push-to-talk, you will be promted to choose which button you want to select. 
        Buttons on some driving wheel hardwares will also be available to be used as push-to-talk buttons, however if your wheel is supported make sure that the button is not being used for other functionalities within Assetto Corsa for expected behavior.
      </p>
      

      <h2>FAQ</h2>
      <div className="faq-list">
        {FAQS.map((item, i) => <FaqItem key={i} q={item.q} a={item.a} />)}
      </div>

      <h2>Usage guidance</h2>
      <p>
        The executable will take the user to a menu with options of Jarvis Live, Jarvis Post and Settings. Data will only be recorded once the user clicks Jarvis Live. 
      </p>
      <div className="cm-settings-callout">
        <div className="cm-settings-callout__text">
          <strong>Skip the manual setup</strong>
          <span>Download our pre-configured Content Manager settings and get started in one click.</span>
        </div>
        <a
          href="https://acstuff.club/s/iUcL"
          target="_blank"
          rel="noopener noreferrer"
          className="cm-settings-callout__btn"
        >
          ↓ Content Manager Settings
        </a>
      </div>
      <p>Feel free to contact ece.okutan.24@ucl.ac.uk for any issues or questions</p>
    </SectionPage>
  );
}

export default DownloadSetup;
