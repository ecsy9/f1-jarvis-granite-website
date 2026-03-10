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
      <p>
        1. Ensure you have Python installed on your system.
      </p>
      <p>
        2. From the project root, install dependencies:
      </p>
      <p>
        <code>pip install -r requirements.txt</code>
      </p>
      <p>
        3. (Optional) Configure IBM Watson AI features by copying <code>.env.example</code> to
        <code>.env</code> and filling in your WatsonX, Speech-to-Text, and Text-to-Speech
        credentials.
      </p>
      <p>
        4. For Assetto Corsa (AC), enable shared memory in the game&apos;s settings (Options →
        General → UI Modules, set Shared Memory = ON, Layout = 1).
      </p>
      <p>
        5. For Assetto Corsa Competizione (ACC), configure <code>broadcasting.json</code> in your documents folder with the correct UDP port and
        passwords.
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
      <p>
        Refer to the separate setup guide in the repository for detailed configuration of game
        backends and IBM Watson services.
      </p>
    </SectionPage>
  );
}

export default UserManual;
