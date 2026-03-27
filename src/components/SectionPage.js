import { useState, useEffect, useRef } from 'react';
import './SectionPage.css';
import './Diagrams.css';

function SectionPage({ title, children, activeTab, sectionTabs = [], onSectionChange }) {
  const contentRef = useRef(null);
  const sectionMenuRef = useRef(null);
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');
  const [isSectionMenuOpen, setIsSectionMenuOpen] = useState(false);

  const canSwitchSections =
    Boolean(activeTab) &&
    Array.isArray(sectionTabs) &&
    sectionTabs.length > 1 &&
    typeof onSectionChange === 'function';
  const shouldShowToc = canSwitchSections || headings.length > 1;

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const h2s = Array.from(el.querySelectorAll('h2'));
    const items = h2s.map((h, i) => {
      const id = `s-${i}`;
      h.id = id;
      return { id, label: h.textContent.trim() };
    });
    setHeadings(items);
    setActiveId(items[0]?.id ?? '');

    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: '-10% 0% -80% 0%' }
    );
    h2s.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [children]);

  useEffect(() => {
    setIsSectionMenuOpen(false);
  }, [activeTab]);

  useEffect(() => {
    if (!isSectionMenuOpen) return undefined;

    const handleClickOutside = (event) => {
      if (!sectionMenuRef.current?.contains(event.target)) {
        setIsSectionMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsSectionMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isSectionMenuOpen]);

  return (
    <main className="section-page">
      <div className="section-page__container">
        <h1 className="section-page__title">{title}</h1>
        <div className="section-page__body">
          <div className="section-page__content" ref={contentRef}>
            {children}
          </div>
          {shouldShowToc && (
            <nav
              className={`section-toc${isSectionMenuOpen ? ' section-toc--menu-open' : ''}`}
              aria-label="On this page"
            >
              <p className="section-toc__heading">On this page</p>
              {activeTab && (
                <div className="section-toc__active-tab" ref={sectionMenuRef}>
                  {canSwitchSections ? (
                    <>
                      <button
                        type="button"
                        className={`section-toc__active-tab-trigger${isSectionMenuOpen ? ' section-toc__active-tab-trigger--open' : ''}`}
                        onClick={() => setIsSectionMenuOpen((open) => !open)}
                        aria-expanded={isSectionMenuOpen}
                        aria-haspopup="listbox"
                      >
                        <span className="section-toc__active-tab-label">
                          <strong>Current section:</strong> {activeTab}
                        </span>
                        <span className="section-toc__active-tab-caret" aria-hidden="true">▾</span>
                      </button>
                      {isSectionMenuOpen && (
                        <ul className="section-toc__active-options" role="listbox" aria-label="Section selector">
                          {sectionTabs.map((tab) => (
                            <li key={tab}>
                              <button
                                type="button"
                                role="option"
                                aria-selected={tab === activeTab}
                                className={`section-toc__active-option${tab === activeTab ? ' section-toc__active-option--active' : ''}`}
                                onClick={() => {
                                  onSectionChange(tab);
                                  setIsSectionMenuOpen(false);
                                  if (typeof window !== 'undefined') {
                                    window.requestAnimationFrame(() => {
                                      window.scrollTo({ top: 0, behavior: 'smooth' });
                                    });
                                  }
                                }}
                              >
                                {tab}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <span>
                      <strong>Current section:</strong> {activeTab}
                    </span>
                  )}
                </div>
              )}
              {headings.length > 0 && (
                <ul className="section-toc__list">
                  {headings.map(({ id, label }) => (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        className={`section-toc__link${activeId === id ? ' section-toc__link--active' : ''}`}
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </nav>
          )}
        </div>
      </div>
    </main>
  );
}

export default SectionPage;
