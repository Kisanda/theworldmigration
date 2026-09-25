import { useState } from 'react';
import {
  Search,
  Map,
  FileText,
  Landmark,
  PlaneTakeoff,
  Sparkles,
  CheckCircle2,
  Star,
} from 'lucide-react';

const processSteps = [
  {
    step: '01',
    stageName: 'Stage 01',
    badge: 'Step 01 · Pre-Screening',
    title: 'No-Obligation Free Assessment',
    tagline: 'Impartial Initial Check',
    desc: 'We evaluate your CV, language scores, and qualifications free of charge before you pay a single dollar. If your chosen route is not viable, we explain why upfront.',
    Icon: Search,
    SparkleIcon: Sparkles,
    highlight: '100% Free · 24h Review',
    theme: 'peach',
    color: '#E65100',
    softBg: 'linear-gradient(145deg, #FFF6F0 0%, #FFE9DC 100%)',
    borderColor: '#FFD7C2',
    accentBadge: '#FFF0E6',
    pillText: 'Free Assessment',
  },
  {
    step: '02',
    stageName: 'Stage 02',
    badge: 'Step 02 · Blueprint',
    title: 'Strategic Pathway Architecture',
    tagline: 'Custom Immigration Roadmap',
    desc: 'Drawing on our in-depth knowledge of dynamic immigration laws, we map the exact subclass, provincial nomination, or work scheme that maximizes your grant probability.',
    Icon: Map,
    SparkleIcon: Star,
    highlight: 'Australia · Canada · UK · Denmark',
    theme: 'sky',
    color: '#0284C7',
    softBg: 'linear-gradient(145deg, #F0F8FF 0%, #E0F2FE 100%)',
    borderColor: '#BAE6FD',
    accentBadge: '#E0F2FE',
    pillText: 'Custom Roadmap',
  },
  {
    step: '03',
    stageName: 'Stage 03',
    badge: 'Step 03 · Verification',
    title: 'Credentials & Legalization',
    tagline: 'Skills & Translations',
    desc: 'Our team coordinates skills assessments (ACS, Engineers Australia, VETASSESS, WES) alongside certified multi-lingual translations and embassy attestation.',
    Icon: FileText,
    SparkleIcon: CheckCircle2,
    highlight: 'ACS · WES · Multi-Lingual Attest',
    theme: 'lavender',
    color: '#7C3AED',
    softBg: 'linear-gradient(145deg, #FAF5FF 0%, #F3E8FF 100%)',
    borderColor: '#E9D5FF',
    accentBadge: '#F3E8FF',
    pillText: 'Certified Docs',
  },
  {
    step: '04',
    stageName: 'Stage 04',
    badge: 'Step 04 · Quality Audit',
    title: 'Retired Officers Dossier Review',
    tagline: 'Government Standard Audit',
    desc: 'Before formal submission, your complete petition is audited by consultants with extensive in-house UK and Canadian Immigration Department experience.',
    Icon: Landmark,
    SparkleIcon: CheckCircle2,
    highlight: 'Former Visa Officers Audit',
    theme: 'mint',
    color: '#15803D',
    softBg: 'linear-gradient(145deg, #F0FDF4 0%, #DCFCE7 100%)',
    borderColor: '#BBF7D0',
    accentBadge: '#DCFCE7',
    pillText: 'Officers Audit',
  },
  {
    step: '05',
    stageName: 'Stage 05',
    badge: 'Step 05 · Celebration',
    title: 'Visa Grant & Relocation Briefing',
    tagline: 'Smooth Arrival Support',
    desc: 'Upon visa approval, we provide thorough pre-departure briefings, port-of-entry guidance, and settlement roadmaps so your journey is truly special.',
    Icon: PlaneTakeoff,
    SparkleIcon: Sparkles,
    highlight: 'Welcome & Landing Care',
    theme: 'honey',
    color: '#D97706',
    softBg: 'linear-gradient(145deg, #FFFDF0 0%, #FEF3C7 100%)',
    borderColor: '#FDE68A',
    accentBadge: '#FEF3C7',
    pillText: 'Relocation & Visa',
  },
];

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="section process-cute-section" id="process">
      <div className="wrap">
        {/* Header */}
        <div className="section-head text-center">
          <div className="cute-section-pill">
            <Sparkles size={14} strokeWidth={2} style={{ color: '#F59E0B' }} />
            <span>Our Proven 5-Stage Methodology</span>
            <Sparkles size={14} strokeWidth={2} style={{ color: '#F59E0B' }} />
          </div>
          <h2 className="cute-process-heading">
            From Day 1 Evaluation <br />
            To Your <span className="cute-heading-highlight">Boarding Pass.</span>
          </h2>
          <p className="cute-process-subtitle">
            Every step is transparent, methodical, and designed to protect you from costly mistakes throughout your immigration journey.
          </p>
        </div>

        {/* 5 Cards Grid */}
        <div className="cute-cards-grid">
          {processSteps.map((s, idx) => {
            const isSelected = activeStep === idx;
            const IconComp = s.Icon;
            const SparkleComp = s.SparkleIcon;
            return (
              <div
                key={s.step}
                className={`cute-step-card card-theme-${s.theme} ${isSelected ? 'card-selected' : ''}`}
                onClick={() => setActiveStep(idx)}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setActiveStep(idx);
                  }
                }}
              >
                {/* Top Badge Pill */}
                <div className="cute-card-topbar">
                  <span className="cute-step-pill">
                    <SparkleComp size={12} strokeWidth={2} className="cute-pill-sparkle-icon" />
                    {s.stageName}
                  </span>
                  <span className="cute-step-idx">{s.step}</span>
                </div>

                {/* Animated Icon Bubble */}
                <div className="cute-icon-stage">
                  <div className="cute-icon-circle">
                    <IconComp
                      size={30}
                      strokeWidth={1.8}
                      style={{ color: s.color }}
                      className="cute-icon-svg"
                    />
                  </div>
                  <div className="cute-icon-shadow" />
                </div>

                {/* Content */}
                <div className="cute-card-body">
                  <span className="cute-tagline">{s.tagline}</span>
                  <h3 className="cute-title">{s.title}</h3>
                  <p className="cute-desc">{s.desc}</p>
                </div>

                {/* Bottom Highlight Chip */}
                <div className="cute-card-footer">
                  <span className="cute-highlight-chip">
                    <span className="cute-chip-dot" />
                    {s.highlight}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
