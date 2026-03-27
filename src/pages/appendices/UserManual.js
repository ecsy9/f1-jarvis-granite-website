import SectionPage from '../../components/SectionPage';

function UserManual() {
  return (
    <SectionPage title="User Manual">
      <p>
        Jarvis is a real-time telemetry and AI race engineer application for Assetto Corsa.
        Follow the steps below to install and get started, or watch the demo video for a full walkthrough.
      </p>

      <div
        style={{
          position: 'relative',
          paddingTop: '56.25%',
          marginTop: '1.5rem',
          marginBottom: '2.5rem',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 12px 30px rgba(15, 23, 42, 0.35)',
        }}
      >
        <iframe
          src="https://drive.google.com/file/d/1hAGzLmAYI-o_QV6JVSKBCvI-7vS8Slfx/preview"
          title="Jarvis Demo Video"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            border: 'none',
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <h2>In-app settings</h2>
      <p>
        Go to <strong>Settings</strong> to configure voice interaction. Choose between{' '}
        <em>Disabled</em>, <em>Push-to-Talk</em>, or <em>Continuous</em> depending on how you
        want to interact with the AI race engineer. If you select Push-to-Talk, you will be
        prompted to bind a key or button.
      </p>
      <p>
        Steering wheel buttons are supported for push-to-talk on compatible hardware. If you use
        a wheel button, make sure it is not already bound to a function inside Assetto Corsa to
        avoid both actions firing at the same time.
      </p>
      <p>
        You can also adjust the <strong>AI verbosity</strong> level in Settings. Setting this to{' '}
        <em>Minimal</em> reduces the frequency and length of AI commentary — useful if you find
        the voice feedback distracting during a session.
      </p>

      <h2>Installation</h2>
      <p>1. Download Assetto Corsa.</p>
      <p>2. Download Content Manager for Assetto Corsa (the Lite version is fine).</p>
      <p>3. In Content Manager, go to <em>Settings → Assetto Corsa → System</em> and enable <strong>Allow Developer Apps</strong>.</p>
      <p>4. In Content Manager, go to <em>Settings → Assetto Corsa → Python Apps</em> and enable <strong>Enable Python Apps</strong> / <strong>Developer Apps</strong>.</p>
      <p>5. Download <strong>Jarvis-Setup.exe</strong> from the <a href="/#/appendices/user-manual">Download page</a> and run the installer.</p>
      <p>6. On first launch, Jarvis will automatically download the local AI models (~4 GB). Keep the app open and wait for the download to complete before starting a session.</p>

      <h2>Starting a session</h2>
      <p>
        Launch Jarvis. The main menu gives you three options: <strong>Jarvis Live</strong>,{' '}
        <strong>Jarvis Post</strong>, and <strong>Settings</strong>.
      </p>
      <p>
        Start a session in Assetto Corsa first, then click <strong>Jarvis Live</strong>. Data
        recording begins as soon as you click — make sure Jarvis Live is open before you start
        driving so that all laps are captured.
      </p>
      <p>
        When your session is done, exit Jarvis Live and open <strong>Jarvis Post</strong> to
        review your post-session analysis.
      </p>

      <h2>Jarvis Live — dashboard overview</h2>
      <p>
        The live dashboard shows real-time telemetry as you drive: lap delta (green = ahead of
        reference, red = behind), tyre temperatures per corner with a colour legend, wheel slip
        indicators, fuel level, and a track map with your current position.
      </p>
      <p>
        The AI race engineer monitors the session automatically. It will speak when something
        meaningful happens — a consistent time loss in a sector, a tyre warning, or a fuel alert.
        AI commentary is gated to straights and low-input zones so it never interrupts a braking
        point. You can also ask questions via voice at any time.
      </p>

      <h2>Jarvis Post — session manager</h2>
      <p>
        When you click <strong>Jarvis Post</strong>, a session manager opens before the analysis
        view. From here you can:
      </p>
      <ul>
        <li><strong>Select a session</strong> — click any row in the table to load it. The table shows session data including date, track, and lap count.</li>
        <li><strong>Rename a session</strong> — double-click the session name to rename it.</li>
        <li><strong>Delete a session</strong> — select a session and use the delete option to remove it.</li>
        <li><strong>Export a session</strong> — export a session file to share with others or back up your data.</li>
        <li><strong>Import a session</strong> — import a previously exported session file to analyse data from another run.</li>
      </ul>

      <h2>Jarvis Post — post-session analysis</h2>
      <p>
        After selecting a session, Jarvis Post loads the telemetry recorded during that run. Select
        any lap to review your data.
      </p>
      <ul>
        <li><strong>Graphs menu</strong> — use the <em>Graphs</em> dropdown in the top left to choose which 6 channels to display. You can swap any of them out at any time.</li>
        <li><strong>Zoom</strong> — adjust the graph zoom level using the control in the bottom right.</li>
        <li><strong>Playback speed</strong> — change how fast the data plays back using the speed control in the bottom left, next to the play button.</li>
      </ul>
      <p>
        The AI debrief can be accessed through the top (right under the File, View, and Graph menus) named "Analyst". It surfaces the most impactful findings from your session — for
        example, a consistent late braking point at a specific corner — so you have one concrete
        thing to work on next time.
      </p>

      <h2>Jarvis VR</h2>
      <p>
        Jarvis VR is a separate Unreal Engine application that visualises your telemetry data in
        a virtual reality environment. You can download it directly from within the Jarvis app.
      </p>
      <p>1. In the Jarvis app, click <strong>Download Jarvis VR</strong>.</p>
      <p>2. Choose a location on your computer to save the zip file and confirm the download.</p>
      <p>3. Once downloaded, unzip the file in your chosen location.</p>
      <p>4. Open the unzipped folder and double-click <strong>JARVIS VR</strong> to launch the application.</p>

      <h2>Troubleshooting</h2>
      <ul>
        <li><strong>Jarvis Live shows no data</strong> — make sure Assetto Corsa is running and you are on track in an active session (not in menus, pause, or replay). Start Jarvis Live after the car has loaded on track.</li>
        <li><strong>AI models not downloading</strong> — the download requires an internet connection on first launch. Check your firewall settings if the download stalls.</li>
        <li><strong>Speech-to-Text not working</strong> — go to Windows sound settings and confirm your desired microphone is set as the default input device. A quiet environment also helps with recognition accuracy.</li>
        <li><strong>Constant wheel slip warnings</strong> — this is expected when driving on keyboard. Binary inputs cause abrupt traction breaks. Set AI verbosity to Minimal in Settings to reduce the noise.</li>
      </ul>
      <p>For anything else, contact <a href="mailto:ece.okutan.24@ucl.ac.uk">ece.okutan.24@ucl.ac.uk</a>.</p>
    </SectionPage>
  );
}

export default UserManual;
