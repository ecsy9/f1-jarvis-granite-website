import { useState } from 'react';
import SectionPage from '../components/SectionPage';
import './Implementation.css';

const TABS = ['Overview', 'Data Pipeline & UI', 'AI Pipeline', 'VR'];

function Implementation() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <SectionPage title="Implementation" activeTab={activeTab}>
      <div className="impl-tabs">
        {TABS.map(tab => (
          <button
            key={tab}
            className={`impl-tab${activeTab === tab ? ' impl-tab--active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Overview' && (<>
        <p>
          Development follows an Agile methodology with two-week sprints across four parallel tracks,
          covering the full 18-week project timeline from November 2025 to March 2026.
        </p>

        <h2>Parallel Development Tracks</h2>
        <div className="info-cards">
          <div className="info-card">
            <div className="info-card__label">Track 1 — Data Integration</div>
            <div className="info-card__value">CAN bus handling, TORCS integration, Assetto Corsa integration, InfluxDB setup</div>
          </div>
          <div className="info-card">
            <div className="info-card__label">Track 2 — 2D Visualisation</div>
            <div className="info-card__value">Dashboard framework, real-time displays, post-race replay, UI refinement</div>
          </div>
          <div className="info-card">
            <div className="info-card__label">Track 3 — AI Services</div>
            <div className="info-card__value">Granite API integration, fine-tuning pipeline, strategy engine, voice synthesis</div>
          </div>
          <div className="info-card">
            <div className="info-card__label">Track 4 — VR Platform</div>
            <div className="info-card__value">Unreal Engine 5 setup, 3D visualisation, telemetry sync, user interaction</div>
          </div>
        </div>

        <h2>Project Phases</h2>
        <table className="section-table">
          <thead>
            <tr>
              <th>Phase</th>
              <th>Weeks</th>
              <th>Focus Areas</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Planning & Design</td>
              <td>1–4</td>
              <td>Requirements gathering, architecture design, environment setup</td>
            </tr>
            <tr>
              <td>Core Development</td>
              <td>5–12</td>
              <td>Parallel tracks: Data integration, 2D dashboard, AI services, VR platform</td>
            </tr>
            <tr>
              <td>Integration & Testing</td>
              <td>13–16</td>
              <td>System integration, performance testing, user testing</td>
            </tr>
            <tr>
              <td>Documentation & Finalisation</td>
              <td>17–18</td>
              <td>Documentation completion, final refinements, submission</td>
            </tr>
          </tbody>
        </table>

        <h2>Major Milestones</h2>
        <table className="section-table">
          <thead>
            <tr>
              <th>Milestone</th>
              <th>Target Date</th>
              <th>Deliverable</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>M1: Requirements Complete</td>
              <td>Week 4 — 28 Nov 2025</td>
              <td>Specification document, architecture design</td>
            </tr>
            <tr>
              <td>M2: Data Pipeline Prototype</td>
              <td>Week 7 — 19 Dec 2025</td>
              <td>CAN bus + TORCS integration working</td>
            </tr>
            <tr>
              <td>M3: 2D Platform Alpha</td>
              <td>Week 10 — 9 Jan 2026</td>
              <td>Dashboard with real-time visualisation</td>
            </tr>
            <tr>
              <td>M4: AI Integration Alpha</td>
              <td>Week 12 — 23 Jan 2026</td>
              <td>Basic strategy recommendations operational</td>
            </tr>
            <tr>
              <td>M5: VR Environment Alpha</td>
              <td>Week 14 — 6 Feb 2026</td>
              <td>Interactive VR environment</td>
            </tr>
            <tr>
              <td>M6: System Integration</td>
              <td>Week 16 — 6 Mar 2026</td>
              <td>All components integrated and tested</td>
            </tr>
            <tr>
              <td>M7: Testing Complete</td>
              <td>Week 17 — 13 Mar 2026</td>
              <td>All testing finished</td>
            </tr>
            <tr>
              <td>M8: Project Submission</td>
              <td>Week 18 — 27 Mar 2026</td>
              <td>Final deliverables submitted</td>
            </tr>
          </tbody>
        </table>

        <h2>Development Process</h2>
        <h3>Sprint Structure</h3>
        <p>
          Two-week sprints with sprint planning, daily async standups via Discord, a mid-sprint
          check-in, and a sprint review/demo at the end of each cycle.
        </p>
        <h3>Git Workflow</h3>
        <p>
          Feature branch workflow with pull request reviews. The main branch is kept stable;
          all development happens on feature branches merged via PR.
        </p>
        <h3>Communication</h3>
        <p>
          Discord for daily team communication; GitHub Projects for task tracking;
          bi-weekly demos presented to supervisors Prof. Hilton and Prof. McNamara.
        </p>
      </>)}

      {activeTab === 'Data Pipeline & UI' && (<>
        <p>Coming soon.</p>
      </>)}

      {activeTab === 'AI Pipeline' && (<>
        <p>Coming soon.</p>
      </>)}

      {activeTab === 'VR' && (<>
        <p>
          The VR project consists of nine key implementation features spanning environment setup,
          vehicle asset pipelines, interactive media, AI-driven presentations, and the custom C++
          telemetry chart system. Each section below describes the frameworks, plugins, and
          specific techniques used to implement that feature.
        </p>

        <h2>VR Environment Setup</h2>
        <p>
          <strong>Frameworks:</strong> Unreal Engine 4.27, VR Chemistry Lab template (pre-existing
          UE4 project).
        </p>
        <p>
          The project was initialised from a pre-existing VR Chemistry Lab template that provided
          the building exterior, core VR locomotion (teleport arc and smooth thumbstick movement),
          VR grab/interaction mechanics via motion controllers, and a working elevator with
          in-world destination screens for spatial navigation. No C++ or Blueprint modifications
          were made to these systems — they were inherited and used as-is.
        </p>
        <p>
          The interior was reconfigured entirely through the Unreal Editor's level design tools:
          existing lab geometry and props were removed, and motorsport-themed assets were placed
          using the editor's transform gizmos. The sim racer rig was assembled by individually
          importing static mesh assets (seat, steering wheel frame, pedals, monitor stand,
          displays) and manually positioning and rotating each piece in the level viewport until
          they formed a single cohesive unit. F1 tyres and engineering workstation meshes were
          placed around the space similarly.
        </p>
        <p>
          Every placed object required collision setup to enable VR physical interaction:
        </p>
        <pre className="code-block"><code>{`Static Mesh Editor → Collision → Auto Convex Collision
  Hull Count:    8–16   (balance accuracy vs. runtime performance)
  Max Hull Verts: 32
  Hull Precision: 100000

For complex concave meshes (e.g. sim rig frame):
  Static Mesh Editor → Collision → Add Box Simplified Collision
  (manually position and scale collision primitives to approximate the shape)

Alternative for dense meshes where accuracy is required:
  Collision → Use Complex Collision As Simple
  (uses the full render geometry — higher cost, exact shape)`}</code></pre>

        <h2>Vehicle Asset Import &amp; Optimisation</h2>
        <p>
          <strong>Tools:</strong> Blender 3.x (Decimate modifier), Python 3.12 + Pillow 11.1.0
          (<code>export_car.py</code>), Unreal Engine 4.27 FBX/OBJ import pipeline.
        </p>
        <p>
          Three vehicles were brought into the VR environment through different import pipelines,
          each requiring a different level of pre-processing.
        </p>

        <h3>Lewis Hamilton's Ferrari — Direct Import</h3>
        <p>
          A pre-made high-detail 3D model was imported directly as a UE4 static mesh via the
          standard FBX import workflow. The model was already at a polygon count suitable for VR
          rendering, so no geometry reduction was needed. Collision was generated in the Static
          Mesh Editor and the asset was placed as the centrepiece of the VR hub.
        </p>

        <h3>UCL Formula Student Car — Blender Decimate Pipeline</h3>
        <p>
          The original Formula Student car mesh contained approximately 9.5 million triangles —
          far beyond the VR budget (dropping frame rate well below the 90 fps comfort threshold).
          The mesh was imported into Blender, where the <strong>Decimate modifier</strong> in
          Collapse mode was applied to reduce triangle count to ~250,000:
        </p>
        <pre className="code-block"><code>{`# Blender Python console equivalent of the manual Decimate workflow:
import bpy

obj = bpy.context.active_object
mod = obj.modifiers.new(name="Decimate", type='DECIMATE')
mod.decimate_type = 'COLLAPSE'
mod.ratio = 250000 / 9500000  # ≈ 0.0263
bpy.ops.object.modifier_apply(modifier="Decimate")
# Result: ~250,000 triangles (from ~9.5M)`}</code></pre>
        <p>
          After decimation, materials were stripped (Blender's geometry reduction invalidates some
          UV islands). The mesh was exported as FBX, re-imported into UE4, and materials and
          textures were re-applied and configured in the Material Editor to restore accurate
          colouring. Collision was then generated in UE4.
        </p>

        <h3>TORCS F1 Car (IBM Livery) — Custom Python Export Pipeline</h3>
        <p>
          TORCS stores car geometry in a non-standard extended AC3D format (<code>.acc</code>) and
          textures in SGI format (<code>.rgb</code>). No existing tool could parse the extended
          vertex format (6 values per vertex: <code>x y z nx ny nz</code>) or the 9-value surface
          reference lines (vertex index + 4 UV channels). A custom Python script{' '}
          <code>export_car.py</code> was written to handle the full pipeline:
        </p>
        <pre className="code-block"><code>{`# Parsing TORCS-extended AC3D vertex lines
# Standard AC3D: "vert x y z"
# TORCS extended: each vertex line has 6 floats: x y z nx ny nz
for line in vertex_lines:
    parts = line.split()
    x, y, z   = float(parts[0]), float(parts[1]), float(parts[2])
    nx, ny, nz = float(parts[3]), float(parts[4]), float(parts[5])
    vertices.append((x, y, z))
    normals.append((nx, ny, nz))

# Parsing surface ref lines (9 values per ref)
# vert_idx u_base v_base u_tiled v_tiled u_skids v_skids u_shad v_shad
for ref_line in surface_refs:
    parts = ref_line.split()
    vert_idx = int(parts[0])
    u, v = float(parts[1]), float(parts[2])  # base UV channel only
    face_verts.append((vert_idx, u, v))

# SGI .rgb → PNG conversion (vertical flip for UE4 origin convention)
from PIL import Image
img = Image.open("car1-ow1.rgb")
img = img.transpose(Image.FLIP_TOP_BOTTOM)
img.save("car1-ow1_livery.png")`}</code></pre>
        <p>
          The script also performs fan triangulation for quads and n-gons (converting all faces to
          triangles for OBJ compatibility), writes standard Wavefront OBJ + MTL files, and exports
          all 4 wheels as separate meshes. Output was validated by checking that all
          vertex/UV/normal indices are in-bounds and rendering a matplotlib 3D wireframe preview
          before UE4 import. The script is fully deterministic and re-runnable.
        </p>
        <table className="section-table">
          <thead>
            <tr>
              <th>Output File</th>
              <th>Content</th>
              <th>Size</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>car1-ow1.obj</code> + <code>.mtl</code></td>
              <td>Car body mesh + material references</td>
              <td>1,954 verts / 2,640 tris</td>
            </tr>
            <tr>
              <td><code>wheel_*.obj</code> (×4) + <code>wheels.mtl</code></td>
              <td>Wheel meshes + material reference</td>
              <td>240 verts / 302 tris each</td>
            </tr>
            <tr>
              <td><code>car1-ow1_livery.png</code></td>
              <td>IBM livery texture (converted from SGI <code>.rgb</code>)</td>
              <td>512×512</td>
            </tr>
            <tr>
              <td><code>tex-wheel.png</code></td>
              <td>Secondary wheel texture</td>
              <td>128×128</td>
            </tr>
            <tr>
              <td><code>shadow.png</code></td>
              <td>Shadow decal texture</td>
              <td>—</td>
            </tr>
            <tr>
              <td><code>wheel3d.png</code></td>
              <td>Wheel rim/tyre texture</td>
              <td>copied as-is</td>
            </tr>
          </tbody>
        </table>

        <h2>Interactive Video Playback</h2>
        <p>
          <strong>Framework:</strong> Unreal Engine 4.27 Media Framework (FileMediaSource,
          MediaPlayer, MediaTexture), UE4 Blueprints.
        </p>
        <p>
          A <code>FileMediaSource</code> asset is created in UE4 pointing to a local{' '}
          <code>.mp4</code> file on disk. A <code>MediaPlayer</code> asset consumes the source
          and manages playback state (play, pause, stop, seek). A <code>MediaTexture</code>{' '}
          receives decoded video frames from the MediaPlayer and exposes them as a texture, which
          is plugged into a Material's Emissive slot and applied to a screen mesh in the VR scene.
          A Blueprint actor attached to the screen listens for VR controller input and calls{' '}
          <code>Play</code> / <code>Pause</code> on the MediaPlayer:
        </p>
        <pre className="code-block"><code>{`Event: OnComponentBeginOverlap (VR hand / pointer collider)
  → Set bCanInteract = true
  → Show highlight outline on screen mesh

Event: VR Trigger Pressed  (while bCanInteract == true)
  → If MediaPlayer.IsPlaying():
        MediaPlayer.Pause()
    Else:
        MediaPlayer.Play()

Event: OnComponentEndOverlap
  → Set bCanInteract = false
  → Hide highlight outline`}</code></pre>
        <pre className="code-block"><code>{`FileMediaSource  (.mp4 file on disk)
        │
        ▼
MediaPlayer  (controls playback state — play / pause / seek)
        │
        ▼
MediaTexture  (receives decoded video frames as a UTexture2D)
        │
        ▼
Material  (Emissive Color ← MediaTexture node)
        │
        ▼
Screen Mesh Actor  (StaticMeshComponent with material applied)`}</code></pre>

        <h2>Emissive Screen Materials</h2>
        <p>
          <strong>Framework:</strong> Unreal Engine 4.27 Material Editor, Unlit shading model.
        </p>
        <p>
          For screens displaying static logos or images (as opposed to video), a Material using
          the <strong>Unlit shading model</strong> is created in UE4's Material Editor. The
          texture is connected directly to the <strong>Emissive Color</strong> input node. This
          bypasses all scene lighting calculations — the image renders at full brightness
          regardless of the environment's light actor placement or intensity.
        </p>
        <p>
          This accurately mimics real-world backlit screens: a monitor or TV emits its own light
          rather than reflecting ambient light. Using a standard Lit material would cause the
          screen surface to appear dark or shadowed depending on the nearby scene lighting,
          which is physically incorrect for a self-illuminating display.
        </p>
        <pre className="code-block"><code>{`Material Properties:
  Shading Model : Unlit
  Blend Mode    : Opaque

Node Graph:
  TextureSample (logo.png)
        │
        └──► Emissive Color  (main output)

Result: Image renders at full brightness, completely unaffected by
        scene light actors, light maps, or ambient occlusion.`}</code></pre>

        <h2>AI-Driven Slide Presentations (Convai)</h2>
        <p>
          <strong>Frameworks:</strong> Convai cloud platform, imgbb.com (image hosting), Unreal
          Engine 4.27 Blueprints, Convai UE4 plugin.
        </p>
        <p>
          Presentation slides were authored externally and uploaded to imgbb.com, where a "Direct
          Link" URL (raw image URL with no HTML wrapper or authentication requirement) was
          extracted for each slide. These URLs were pasted into a Convai Character's knowledge
          base / backstory configuration on the Convai web platform, along with instructions
          about slide order and context.
        </p>
        <p>
          In UE4, the Convai plugin provides a <code>ConvaiCharacter</code> actor. Its{' '}
          <code>Character ID</code> property is set to match the configured character on the
          Convai platform. A Blueprint links the character to a target screen mesh in the VR
          scene — when the AI decides to display a slide during user interaction, it sends the
          image URL and the Blueprint renders it on the screen material.
        </p>
        <pre className="code-block"><code>{`[Offline Setup]
  Author slides → Upload to imgbb.com → Copy direct image URLs
       ↓
  Convai web platform → Create Character
       ↓
  Paste slide URLs into Character knowledge base
  (configure slide order and presentation context)
       ↓
  Note Character ID (e.g. "abc123-def456")

[UE4 Setup]
  Place ConvaiCharacter actor in VR level
       ↓
  Set Character ID property = "abc123-def456"
       ↓
  Blueprint: bind ConvaiCharacter → target screen mesh actor

[Runtime in VR]
  User approaches / speaks to Convai avatar
       ↓
  Convai processes interaction (cloud inference)
       ↓
  Decides to show slide → returns image URL
       ↓
  Blueprint fetches image → displays on screen material`}</code></pre>
        <div className="design-decision">
          <strong>Implementation Note — Content Decoupling via External Hosting:</strong> Because
          slide images are hosted on imgbb.com and referenced by URL in Convai's knowledge base,
          slide content can be updated at any time without reopening the UE4 editor, recompiling,
          or repackaging the project. The Convai character fetches images at runtime — updating a
          slide is a matter of replacing the hosted URL.
        </div>

        <h2>Telemetry — Dynamic Widget Construction</h2>
        <p>
          <strong>Frameworks:</strong> Unreal Engine 4.27 (UMG, Slate, UWidgetComponent), Kantan
          Charts plugin (<code>USimpleCartesianPlot</code>), C++.
        </p>
        <p>
          Each <code>ATelemetryVisualizer</code> actor creates its chart <strong>entirely at
          runtime in C++</strong> — there is no pre-made Widget Blueprint. A minimal{' '}
          <code>UChartContainerWidget</code> (a thin <code>UUserWidget</code> subclass) is created
          via <code>CreateWidget&lt;&gt;</code>, and a <code>USimpleCartesianPlot</code> is
          constructed via <code>WidgetTree-&gt;ConstructWidget&lt;&gt;</code> and set as its root
          widget.
        </p>
        <p>
          The critical implementation detail is the <strong>ordering of widget attachment and data
          population</strong>. The container must be assigned to the <code>UWidgetComponent</code>{' '}
          via <code>SetWidget()</code> <em>before</em> any series or datapoints are added.{' '}
          <code>SetWidget</code> triggers <code>TakeWidget()</code> → Slate widget construction
          → <code>SynchronizeProperties()</code>, which binds the chart's internal datasource
          interface. Without this, the Slate widget has a null datasource — axes and background
          render correctly (driven by UPROPERTY reads) but data series are never queried, producing
          perfectly scaled empty graphs with invisible lines and no compile-time or runtime error.
        </p>
        <pre className="code-block"><code>{`// 1. Create the UMG container widget
UChartContainerWidget* Container =
    CreateWidget<UChartContainerWidget>(GetWorld(),
        UChartContainerWidget::StaticClass());

// 2. Build the plot inside the container's WidgetTree
USimpleCartesianPlot* Plot =
    Container->WidgetTree->ConstructWidget<USimpleCartesianPlot>(
        USimpleCartesianPlot::StaticClass());
Container->WidgetTree->RootWidget = Plot;

// 3. CRITICAL: Attach to WidgetComponent BEFORE populating data.
//    SetWidget() → TakeWidget() → SynchronizeProperties() → binds datasource.
//    If this line comes AFTER BP_AddDatapoint, all data lines are invisible.
WidgetComp->SetWidget(Container);

// 4. NOW add series and data (datasource is bound, queries will succeed)
Plot->BP_AddSeriesWithId(bOK, SeriesID, Name, true, false, true);
for (int32 i = 0; i < NumPoints; i += Step)
{
    Plot->BP_AddDatapoint(SeriesID, FVector2D(X[i], Y[i]), bPointOK);
}

// 5. Configure axes, fixed range, colours, and line style
ConfigureChart(Plot, MinX, MaxX, MinY, MaxY);

// 6. Flush all UPROPERTY changes made after SetWidget() to the Slate layer
Plot->SynchronizeProperties();`}</code></pre>
        <p>
          The final <code>SynchronizeProperties()</code> call is also necessary — axis
          configuration, plot scale, and style overrides applied after <code>SetWidget()</code>{' '}
          modify UPROPERTYs on the UMG object but may not propagate to the underlying Slate widget
          until explicitly flushed.
        </p>

        <h2>Telemetry — Multi-Series Grouped Metrics</h2>
        <p>
          <strong>Frameworks:</strong> C++ (<code>TArray</code>, <code>FName</code>,{' '}
          <code>FLinearColor</code>), Kantan Charts (<code>BP_AddSeriesWithId</code>,{' '}
          <code>AddSeriesStyleOverride</code>).
        </p>
        <p>
          Grouped metrics (Tyre Pressure, Tyre Temp, Tyre Wear, Wheel Slip, Suspension Travel,
          Ride Height, Car Damage) plot multiple colour-coded lines on a single chart instance.
          This is implemented via a static <code>GetSubSeries()</code> function that takes an{' '}
          <code>ETelemetryMetric</code> enum value and returns a{' '}
          <code>TArray&lt;FTelemetrySubSeries&gt;</code>. Each entry holds <code>JsonKey</code>{' '}
          (the key in the <code>.jsession</code> telemetry object), <code>DisplayName</code>{' '}
          (the chart legend label), and <code>Color</code> (the line colour).
        </p>
        <p>
          The data population loop in <code>LoadMetricFromJson</code> iterates this array
          uniformly — the same loop body handles 1-line, 2-line, 4-line, and 5-line charts with
          no branching on metric type.
        </p>
        <pre className="code-block"><code>{`// High-contrast colours chosen for dark VR backgrounds
static const FLinearColor ColourFL(0.00f, 0.90f, 0.40f, 1.0f);  // green
static const FLinearColor ColourFR(0.20f, 0.65f, 1.00f, 1.0f);  // blue
static const FLinearColor ColourRL(1.00f, 0.55f, 0.00f, 1.0f);  // orange
static const FLinearColor ColourRR(1.00f, 0.20f, 0.40f, 1.0f);  // red-pink

// Example — 4-corner grouped metric (same colour scheme for tyre/suspension)
case ETelemetryMetric::TyrePressure:
    Out.Add({TEXT("tyre_pressure_fl"), TEXT("FL"), ColourFL});
    Out.Add({TEXT("tyre_pressure_fr"), TEXT("FR"), ColourFR});
    Out.Add({TEXT("tyre_pressure_rl"), TEXT("RL"), ColourRL});
    Out.Add({TEXT("tyre_pressure_rr"), TEXT("RR"), ColourRR});
    break;

// The data population loop is identical regardless of sub-series count:
for (const FTelemetrySubSeries& SS : SubSeries)
{
    Plot->BP_AddSeriesWithId(bOK, FName(*SS.JsonKey),
        FText::FromString(SS.DisplayName), true, false, true);
    Plot->AddSeriesStyleOverride(FName(*SS.JsonKey), nullptr, SS.Color);

    for (int32 i = 0; i < NumPoints; i += Step)
        Plot->BP_AddDatapoint(FName(*SS.JsonKey), FVector2D(X[i], Y[i]), bOK);
}`}</code></pre>

        <h2>Telemetry — Native Win32 File Dialog</h2>
        <p>
          <strong>Frameworks:</strong> Win32 API (<code>commdlg.h</code> —{' '}
          <code>GetOpenFileName</code>), Unreal Engine 4.27 input system.
        </p>
        <p>
          UE4's built-in <code>IDesktopPlatform</code> module wraps the OS file dialog but is{' '}
          <strong>editor-only</strong> — it is not compiled into Shipping builds and causes a
          linker error: <em>"Missing precompiled manifest for 'DesktopPlatform'"</em>. The
          solution is to bypass <code>DesktopPlatform</code> entirely and call the Win32{' '}
          <code>GetOpenFileName</code> API directly via <code>commdlg.h</code>. This is the same
          underlying API that <code>DesktopPlatform</code> wraps internally, so behaviour is
          identical — but it has zero additional module dependencies and works in all build
          configurations (Editor, Development, Shipping).
        </p>
        <p>
          UE4's <code>Windows/AllowWindowsPlatformTypes.h</code> and{' '}
          <code>Windows/HideWindowsPlatformTypes.h</code> bracket the Win32 include to prevent
          macro conflicts with Unreal's type system. After the dialog closes (file selected or
          cancelled), <code>SetInputMode(FInputModeGameOnly)</code> recaptures mouse and VR input
          focus — without this the OS cursor remains active and the player loses mouse look.
        </p>
        <pre className="code-block"><code>{`#if PLATFORM_WINDOWS
#include "Windows/AllowWindowsPlatformTypes.h"
#include <commdlg.h>
#include "Windows/HideWindowsPlatformTypes.h"
#endif

// Inside OnOpenFilePressed():
TCHAR FilePath[MAX_PATH] = { 0 };

OPENFILENAME Ofn;
FMemory::Memzero(&Ofn, sizeof(Ofn));
Ofn.lStructSize = sizeof(OPENFILENAME);
Ofn.lpstrFilter = TEXT("JSession Files (*.jsession)\\0*.jsession\\0");
Ofn.lpstrFile   = FilePath;
Ofn.nMaxFile    = MAX_PATH;
Ofn.lpstrTitle  = TEXT("Select .jsession Telemetry File");
Ofn.Flags       = OFN_FILEMUSTEXIST | OFN_PATHMUSTEXIST | OFN_NOCHANGEDIR;

if (!GetOpenFileName(&Ofn))
{
    // User cancelled — still recapture VR input focus
    PC->SetInputMode(FInputModeGameOnly());
    return;
}

// ... load and parse file ...

PC->SetInputMode(FInputModeGameOnly());`}</code></pre>

        <h2>Telemetry — JSON Parsing &amp; Broadcast</h2>
        <p>
          <strong>Frameworks:</strong> Unreal Engine 4.27 (<code>FFileHelper</code>,{' '}
          <code>FJsonSerializer</code>, <code>TActorIterator</code>), C++.
        </p>
        <p>
          The <code>.jsession</code> file is loaded into an <code>FString</code> via{' '}
          <code>FFileHelper::LoadFileToString</code>, then deserialized via{' '}
          <code>FJsonSerializer::Deserialize</code> into an <code>FJsonObject</code> tree. The{' '}
          <code>"elapsed_time"</code> array is pre-extracted into a <code>TArray&lt;float&gt;</code>{' '}
          as the shared X-axis for all chart instances. A{' '}
          <code>TActorIterator&lt;ATelemetryVisualizer&gt;</code> then iterates every instance
          in the level and calls <code>LoadMetricFromJson</code> on each — one parse, N chart
          updates simultaneously.
        </p>
        <p>
          Down-sampling: if any metric array exceeds 6,000 points, a uniform step is computed
          as <code>FMath::CeilToInt(NumPoints / 6000.0f)</code> and only every N-th point is
          pushed to the chart. This preserves the overall shape and trend of the data while
          keeping GPU work and memory allocation within VR frame-time limits.
        </p>
        <pre className="code-block"><code>{`// Load and parse the .jsession file once
FString JsonString;
FFileHelper::LoadFileToString(JsonString, *SelectedFilePath);

TSharedPtr<FJsonObject> RootJson;
TSharedRef<TJsonReader<>> Reader = TJsonReaderFactory<>::Create(JsonString);
FJsonSerializer::Deserialize(Reader, RootJson);

TSharedPtr<FJsonObject> TeleObj = RootJson->GetObjectField(TEXT("telemetry"));

// Pre-extract shared X-axis (elapsed_time) — avoids repeated JSON lookups
TArray<float> ElapsedTimeArray;
for (const auto& Val : TeleObj->GetArrayField(TEXT("elapsed_time")))
    ElapsedTimeArray.Add((float)Val->AsNumber());

// Broadcast to every ATelemetryVisualizer actor in the level
for (TActorIterator<ATelemetryVisualizer> It(GetWorld()); It; ++It)
{
    It->LoadMetricFromJson(TeleObj, ElapsedTimeArray);
}

// Down-sampling (inside LoadMetricFromJson, per sub-series):
int32 NumPoints = DataArray.Num();
int32 Step = FMath::Max(1, FMath::CeilToInt(NumPoints / 6000.0f));
for (int32 i = 0; i < NumPoints; i += Step)
{
    float X = ElapsedTime[i];
    float Y = (float)DataArray[i]->AsNumber();
    Plot->BP_AddDatapoint(SeriesID, FVector2D(X, Y), bOK);
}`}</code></pre>

      </>)}
    </SectionPage>
  );
}

export default Implementation;
