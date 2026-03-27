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

      <h2>Key Takeaways</h2>
      <ul>
        <li><strong>Timing of AI commentary is critical</strong> — interrupting during braking zones breaks immersion and causes errors. Voice output was subsequently gated to straights and low-input zones.</li>
        <li><strong>Visual legend needed for tyre display</strong> — colour coding alone is insufficient for non-expert users; a small inline key was added to the dashboard.</li>
        <li><strong>Post-race debrief must lead with one prioritised finding</strong> — confirmed the "top insight first" design direction for the Granite debrief format.</li>
        <li><strong>Lap comparison and session history are high-value features</strong> — noted as near-term additions for a future development cycle.</li>
      </ul>
    </SectionPage>
  );
}

export default Interviews;
