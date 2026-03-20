import SectionPage from '../components/SectionPage';
import './DownloadSetup.css';

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
      

      <h2>Usage guidance</h2>
      <p>
        The executable will take the user to a menu with options of Jarvis Live, Jarvis Post and Settings. Data will only be recorded once the user clicks Jarvis Live. 
      </p>
      <p>Feel free to contact ece.okutan.24@ucl.ac.uk for any issues or questions</p>
    </SectionPage>
  );
}

export default DownloadSetup;
