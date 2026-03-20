import { useParams, Link } from 'react-router-dom';
import teamMembers from './teamData';
import './TeamMember.css';

function TeamMember() {
  const { slug } = useParams();
  const member = teamMembers.find((m) => m.slug === slug);

  if (!member) {
    return (
      <div className="team-page">
        <div className="team-page__container">
          <Link to="/" className="team-page__back">← Back to Home</Link>
          <div className="team-page__not-found">
            <h2>Member not found</h2>
            <p>No team member matches that profile.</p>
          </div>
        </div>
      </div>
    );
  }

  const initials = member.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <div className="team-page">
      <div className="team-page__container">
        <Link to="/" className="team-page__back">← Back to Home</Link>

        <div className="team-profile">
          <div className="team-profile__avatar">
            {member.photo ? (
              <img src={member.photo} alt={member.name} />
            ) : (
              <span className="team-profile__avatar-placeholder">{initials}</span>
            )}
          </div>

          <div className="team-profile__info">
            <p className="team-profile__role">{member.role}</p>
            <h1 className="team-profile__name">{member.name}</h1>
            <div className="team-profile__links">
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="team-profile__link"
                >
                  <span className="team-profile__link-icon">in</span>
                  LinkedIn
                </a>
              )}
              {member.github && (
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="team-profile__link"
                >
                  <span className="team-profile__link-icon">⌥</span>
                  GitHub
                </a>
              )}
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="team-profile__link"
                >
                  <span className="team-profile__link-icon">✉</span>
                  {member.email}
                </a>
              )}
            </div>
          </div>
        </div>

        <hr className="team-page__divider" />

        <p className="team-page__bio">{member.description}</p>
      </div>
    </div>
  );
}

export default TeamMember;
