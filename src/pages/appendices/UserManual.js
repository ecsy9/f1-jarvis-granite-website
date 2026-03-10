import SectionPage from '../../components/SectionPage';

function UserManual() {
  return (
    <SectionPage title="User manual and deployment manual">
      <p>
        The F1 Live Telemetry Dashboard is a real-time telemetry visualization tool for sim racing
        games with optional AI race engineer capabilities. It is built with PyQt5 and integrates
        IBM Watson services for voice interaction and AI commentary.
      </p>

      <h2>Setup instructions</h2>
      <p>1. Ensure you have Python 3.x installed on your system.</p>
      <p>2. From the project root, install dependencies:</p>
      <p>
        <code>pip install -r requirements.txt</code>
      </p>
      <p>
        3. (Optional) Configure IBM Watson AI features by copying <code>.env.example</code> to
        <code>.env</code> and filling in your WatsonX, Speech-to-Text, and Text-to-Speech
        credentials.
      </p>

      <h3>Assetto Corsa telemetry setup</h3>
      <p>
        Assetto Corsa telemetry is read via shared memory, which only works on Windows. Make sure
        you are running on Windows and have Assetto Corsa installed.
      </p>
      <p>
        <strong>Step 1 – Enable shared memory</strong>
      </p>
      <p>
        You can enable shared memory either through Content Manager (recommended) or directly in
        Assetto Corsa:
      </p>
      <ul>
        <li>
          In Content Manager: go to <em>Settings → Assetto Corsa → Video → Developer</em> and set
          Shared Memory = ON, Shared Memory Layout = 1. UDP Plugin can remain OFF.
        </li>
        <li>
          In Assetto Corsa: go to <em>Options → General → UI Modules and Shared Memory</em> and set
          Shared Memory = ON, Shared Memory Layout = 1, UDP Plugin = OFF.
        </li>
      </ul>
      <p>
        <strong>Step 2 – Start a driving session</strong>
      </p>
      <p>
        Shared memory is only active when you are on track and the physics engine is running. Start
        a Practice, Qualifying, Race or Hotlap session, wait for the car to load, and make sure you
        are in a driving view (cockpit or similar), not in menus, pause, or replay mode.
      </p>
      <p>
        <strong>Step 3 – Run the dashboard</strong>
      </p>
      <p>Open a terminal, navigate to the project folder, and run:</p>
      <p>
        <code>python integrated_telemetry.py</code>
      </p>
      <p>
        With Assetto Corsa running and a car on track, the terminal should report a successful
        connection to AC shared memory and start printing live packet updates while the UI window
        opens.
      </p>

      <h2>Running the dashboard</h2>
      <p>
        To run with Assetto Corsa (default backend), start a session in game and then execute:
      </p>
      <p>
        <code>python main.py</code>
      </p>
      <p>
        To enable the AI race engineer, start the application with the <code>--ai</code> flag:
      </p>
      <p>
        <code>python main.py --ai</code>
      </p>
      <p>
        For ACC support, combine flags (for example: <code>python main.py --acc --ai</code> to use ACC with AI features).
      </p>

      <h2>Testing and troubleshooting</h2>
      <p>
        Use the following checklist when testing Assetto Corsa integration:
      </p>
      <ul>
        <li>Shared memory enabled in AC settings</li>
        <li>AC is running and you are on track in a live session</li>
        <li>Python script started after the car has loaded on track</li>
        <li>Terminal shows a successful connection and packet updates</li>
        <li>The UI window has opened and graphs begin updating as you drive</li>
      </ul>
      <p>
        If you see &quot;could not connect&quot; or all values remain zero, confirm that AC is on
        track and not paused, and that both AC and the Python script are running under the same
        user (no admin/normal mismatch). For missing modules, re-run{' '}
        <code>pip install -r requirements.txt</code>.
      </p>

      <h2>Usage guidance</h2>
      <p>
        Once running, the dashboard displays live track maps, performance graphs, and detailed
        telemetry including tire temperatures and pressures where available. The interface follows
        a dark theme with multiple canvases for different metrics.
      </p>
      <p>
        If AI features are enabled, you can interact with the AI race engineer via voice. The
        system will monitor telemetry for events such as fuel warnings or tire issues and provide
        proactive spoken feedback, as well as respond to driver queries.
      </p>
      <p>
        All telemetry and AI interactions are recorded to a SQLite database
        (<code>data/telemetry_sessions.db</code>). You can review past sessions with the
        command-line session viewer, listing sessions, inspecting laps, and exporting data to CSV
        for further analysis.
      </p>
      <p>Refer to this guide and the in-repository setup documents for more detailed steps.</p>
    </SectionPage>
  );
}

export default UserManual;
