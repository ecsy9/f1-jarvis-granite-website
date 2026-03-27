import SectionPage from '../../components/SectionPage';

function Interviews() {
  return (
    <SectionPage title="Interviews & Feedback">
      <p>
        Mid-development interviews were conducted to validate design decisions and identify gaps
        between what we were building and what users actually needed. Participants were recruited
        from the sim racing community and used early builds of Jarvis Live and Jarvis Post during
        active sessions before providing feedback.
      </p>

      <h2>Interview — Hobby Sim Racer</h2>
      <p>
        <em>January 2026. Participant races Assetto Corsa casually and occasionally enters online leagues.</em>
      </p>

      <div className="profile-cards">
        <div className="profile-card">
          <div className="profile-card__title">Feedback Session · Jarvis Live & Jarvis Post</div>
          <div className="profile-card__body">

            <p><strong>What do you currently do after a race to figure out where you lost time?</strong></p>
            <p>
              Honestly, not much. I'll watch the replay if something felt wrong, but I don't really
              dig into data. It's too much effort to set up and I wouldn't know what I'm looking at anyway.
            </p>

            <p><strong>If something was telling you during the race — out loud — where you were losing time, would that be useful or annoying?</strong></p>
            <p>
              Depends how often it talks. If it's constantly in my ear I'd mute it. But if it only
              speaks when something's actually worth saying — like "you're losing a second in sector 2"
              — yeah, that would be really useful. Like having a mate watching your laps.
            </p>

            <p><strong>You tried Jarvis Live for a session. What did you make of it?</strong></p>
            <p>
              It's a lot of information on screen at once. The lap delta thing is great, I understood
              that immediately — green means I'm up, red means I'm down. The tyre stuff I wasn't sure
              about, I didn't know what the colours meant. Maybe a small legend? Also the AI voice
              came in during a braking zone once and I nearly missed the corner — it needs to
              wait until I'm on a straight.
            </p>

            <p><strong>What would make you actually open the post-race report rather than just closing the app?</strong></p>
            <p>
              If it told me one thing I could fix next session. Just one. Not a breakdown of every
              channel — I don't have time for that and I'd never remember it all. Something like
              "you consistently brake too late into turn 4, costs you about half a second." That
              I'd actually go away and work on.
            </p>

            <p><strong>Any features missing that you expected to be there?</strong></p>
            <p>
              I expected to be able to compare two laps overlaid — my best and my worst, or mine
              versus someone else's. That's the first thing I'd want. Also some kind of session
              history so I can see if I'm actually getting faster week on week. Right now I have no
              idea if I'm improving.
            </p>

          </div>
        </div>
      </div>

      <h2>Key Takeaways — Hobby Sim Racer</h2>
      <ul>
        <li><strong>Timing of AI commentary is critical</strong> — interrupting during braking zones breaks immersion and causes errors. Voice output was subsequently gated to straights and low-input zones.</li>
        <li><strong>Visual legend needed for tyre display</strong> — colour coding alone is insufficient for non-expert users; a small inline key was added to the dashboard.</li>
        <li><strong>Post-race debrief must lead with one prioritised finding</strong> — confirmed the "top insight first" design direction for the Granite debrief format.</li>
        <li><strong>Lap comparison and session history are high-value features</strong> — noted as near-term additions for a future development cycle.</li>
      </ul>

      <h2>Interview — UCL Racing Formula Student, Mechanical Engineering</h2>
      <p>
        <em>February 2026. Participant is a third-year Mechanical Engineering student and active member of UCL Racing, the university's Formula Student team. We spoke to them in the context of a separate workstream: building a simulation-accurate Assetto Corsa mod of the UCL Racing car so the team can test setups virtually before track days.</em>
      </p>

      <div className="profile-cards">
        <div className="profile-card">
          <div className="profile-card__title">Feedback Session · Car Performance Data & Assetto Corsa Mod Validation</div>
          <div className="profile-card__body">

            <p><strong>When you're looking at data after a run, what are you actually trying to understand?</strong></p>
            <p>
              Whether the car is doing what the suspension geometry says it should. A lot of the time
              you'll have a theoretical model — camber curves, ride height targets, suspension travel
              limits — and you want to check whether the real run matched any of that. If it didn't,
              something in the setup is wrong or the model needs updating.
            </p>

            <p><strong>What specific graphs tell you the most?</strong></p>
            <p>
              Suspension travel per corner is probably the first thing I look at. You want to see all
              four corners working, and if one corner is barely moving or hitting the bump stop early,
              that's immediately telling you something about spring rate or ride height. Then camber
              gain — I actually asked your team to plot this — which shows how camber changes as the
              suspension compresses. You plot it as an XY scatter of suspension travel against camber,
              and the shape of that curve tells you whether your geometry is giving you the camber
              you need in a corner. If the car is rolling and the camber isn't following the wheel
              correctly, you're losing grip.
            </p>

            <p><strong>What about tyre data?</strong></p>
            <p>
              Tyre temperature across all four corners is critical. We're looking at it per corner —
              FL, FR, RL, RR — and we want to see all four in a reasonably similar range. If one tyre
              is running much hotter than the others, there's a load distribution issue, probably
              from ride height being wrong or the car being unbalanced front to rear. Tyre pressure
              matters too because it changes with temperature — if the pressure goes too high the
              contact patch shrinks and you lose grip, and in Assetto Corsa you can actually see this
              happening in real time which is useful for validating whether the tyre model in the
              mod is realistic.
            </p>

            <p><strong>We're building this as an Assetto Corsa mod. What would make you trust that the sim represents your actual car?</strong></p>
            <p>
              Ride height behaviour first. In the real car, front and rear ride heights shift
              depending on speed because of the aero load — you should be able to see the front
              dropping as speed increases and recovering under braking. If that's not happening in
              the sim the aero model is off. Then suspension travel — compare a run around the same
              circuit in the sim against a real logged run and check whether the travel ranges match.
              If the sim is showing very little travel where the real car was working hard through
              a bump sequence, the spring or damper rates are wrong in the mod. Wheel slip is
              another one — you can see in the real data where the car is on the limit of traction,
              and that should correspond to roughly the same places in the sim. If the sim shows no
              slip where the real car was sliding, the grip level is overestimated.
            </p>

            <p><strong>Would Jarvis's post-run summary be useful for a car development session rather than a race?</strong></p>
            <p>
              Yeah, if it's framed around the car and not just the driver. Like, I don't need it to
              tell me where the driver was slow — I need it to flag things like "rear suspension
              travel was consistently hitting the limit through sector 2" or "front tyre temperatures
              were significantly higher than rear across the whole session." Those are the things that
              change what we do to the car. If the AI can spot patterns in the channel data that we'd
              otherwise have to scroll through manually, that saves a lot of time in a paddock where
              everyone's also building the car at the same time.
            </p>

          </div>
        </div>
      </div>

      <h2>Key Takeaways — UCL Racing</h2>
      <ul>
        <li><strong>Camber gain plot was explicitly requested</strong> — an XY scatter of suspension travel against camber shows whether the suspension geometry is delivering the intended camber change through a corner; this was added as a Matplotlib scatter plot in Jarvis Post.</li>
        <li><strong>Suspension travel per corner is the primary diagnostic</strong> — all four corners (FL/FR/RL/RR) plotted together reveal spring rate issues, bump stop contact, and ride height problems at a glance.</li>
        <li><strong>Ride height front/rear validates aero model in the mod</strong> — the expected drop at speed and recovery under braking must be visible in the sim to confirm the Assetto Corsa aero parameters are correct.</li>
        <li><strong>Tyre temperature and pressure per corner reveal load distribution</strong> — large cross-car imbalances in temperature indicate setup issues rather than driver technique.</li>
        <li><strong>AI debrief should flag car-level patterns, not just driver errors</strong> — for an engineering team, outputs like sustained suspension travel limits or persistent tyre temperature asymmetry are more actionable than sector time loss.</li>
      </ul>
    </SectionPage>
  );
}

export default Interviews;
