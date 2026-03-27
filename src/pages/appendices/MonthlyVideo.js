import SectionPage from '../../components/SectionPage';

function MonthlyVideo() {
  return (
    <SectionPage title="Videos">
      <p>
        Project videos including the elevator pitch and monthly progress updates.
      </p>

      <h2>Final Video</h2>
      <div
        style={{
          position: 'relative',
          paddingTop: '56.25%',
          marginTop: '1.5rem',
          borderRadius: '2px',
          overflow: 'hidden',
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.5)',
        }}
      >
        <iframe
          src="https://drive.google.com/file/d/1kNOOO0j6PoPySxjw2H2uZimdM9lFdZN_/preview"
          title="Final Video — F1 Jarvis Granite"
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
      <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#6b7280' }}>
        If the embedded player does not load, you can open the video directly in Google Drive:
        {' '}
        <a
          href="https://drive.google.com/file/d/1kNOOO0j6PoPySxjw2H2uZimdM9lFdZN_/view"
          target="_blank"
          rel="noopener noreferrer"
        >
          Final video
        </a>
        .
      </p>

      <h2 style={{ marginTop: '3rem' }}>Elevator Pitch</h2>
      <div
        style={{
          position: 'relative',
          paddingTop: '56.25%',
          marginTop: '1.5rem',
          borderRadius: '2px',
          overflow: 'hidden',
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.5)',
        }}
      >
        <iframe
          src="https://drive.google.com/file/d/1ZAYNHfS27EZnMafOaSbK0L1aoIIcIfI_/preview"
          title="Elevator Pitch — F1 Jarvis Granite"
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
      <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#6b7280' }}>
        If the embedded player does not load, you can open the video directly in Google Drive:
        {' '}
        <a
          href="https://drive.google.com/file/d/1ZAYNHfS27EZnMafOaSbK0L1aoIIcIfI_/view"
          target="_blank"
          rel="noopener noreferrer"
        >
          Elevator pitch video
        </a>
        .
      </p>

      <h2 style={{ marginTop: '3rem' }}>February Update</h2>
      <div
        style={{
          position: 'relative',
          paddingTop: '56.25%',
          marginTop: '1.5rem',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 12px 30px rgba(15, 23, 42, 0.35)',
        }}
      >
        <iframe
          src="https://drive.google.com/file/d/1yb4dr_hu-lWe2fE6Rk7d6VbuB9banGum/preview"
          title="February Update - F1 Jarvis Granite"
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
      <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#6b7280' }}>
        If the embedded player does not load, you can open the video directly in Google Drive:
        {' '}
        <a
          href="https://drive.google.com/file/d/1yb4dr_hu-lWe2fE6Rk7d6VbuB9banGum/view"
          target="_blank"
          rel="noopener noreferrer"
        >
          February update video
        </a>
        .
      </p>

      <h2 style={{ marginTop: '3rem' }}>January Update</h2>
      <div
        style={{
          position: 'relative',
          paddingTop: '56.25%',
          marginTop: '1.5rem',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 12px 30px rgba(15, 23, 42, 0.35)',
        }}
      >
        <iframe
          src="https://drive.google.com/file/d/1MZUe-ipMUsZysXXpSSHgxfDtPgXi4JY9/preview"
          title="January Update - F1 Live Telemetry Dashboard"
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

      <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#6b7280' }}>
        If the embedded player does not load, you can open the video directly in Google Drive:
        {' '}
        <a
          href="https://drive.google.com/file/d/1MZUe-ipMUsZysXXpSSHgxfDtPgXi4JY9/view"
          target="_blank"
          rel="noopener noreferrer"
        >
          January update video
        </a>
        .
      </p>
    </SectionPage>
  );
}

export default MonthlyVideo;
