import { Editable, EditableImage } from './Editable';
import { useContent } from './content';
import { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowRight, ArrowDown, Globe2, Compass, ShieldCheck, FileCheck2, BriefcaseBusiness, GraduationCap, Plane, Building2, Menu, X, MapPin, Clock3, Quote } from 'lucide-react';
import ContactForm from './components/ContactForm';
import Reviews from './components/Reviews';
import Footer from './components/Footer';
import About, { HomeIntroduction } from './components/About';
import ConsultationModal from './components/ConsultationModal';
import toronto from './assets/hero-bg.jpg';
import brandLogo from './assets/logo.png';

const photo = (id, width = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;
const places = [
  { name: 'Australia', city: 'Sydney', zone: 'Australia/Sydney', image: photo('photo-1572335993266-846e6f3ba5ba'), note: 'A new perspective on possibility.', program: 'Skilled migration · Work · Study', value: 'australia-pr' },
  { name: 'Canada', city: 'Toronto', zone: 'America/Toronto', image: toronto, note: 'More room for your next chapter.', program: 'Permanent residence · Work · Study', value: 'canada-pr' },
  { name: 'United Kingdom', city: 'London', zone: 'Europe/London', image: photo('photo-1537373328362-c4dc43a03e41'), note: 'Global ambition. A place to belong.', program: 'Business · Skilled work · Study', value: 'uk-entrepreneur' },
  { name: 'Denmark', city: 'Copenhagen', zone: 'Europe/Copenhagen', image: photo('photo-1709154444120-03b09472856a'), note: 'Discover a different way of living.', program: 'Work · Residence · Mobility', value: 'denmark-visa' },
];
const services = [
  { Icon: Compass, title: 'Skilled migration', text: 'A considered pathway for your experience, qualifications, and ambitions.', category: 'Residence', value: 'canada-pr' },
  { Icon: BriefcaseBusiness, title: 'Work & opportunity', text: 'Personal guidance for your next professional chapter overseas.', category: 'Work', value: 'work-visa' },
  { Icon: Building2, title: 'Business & investment', text: 'Thoughtful support for founders and internationally minded entrepreneurs.', category: 'Business', value: 'investor-visa' },
  { Icon: GraduationCap, title: 'Study abroad', text: 'From your academic aspirations to a well-prepared student application.', category: 'Education', value: 'student-visa' },
  { Icon: Plane, title: 'Travel & visit', text: 'Careful preparation for family visits, business travel, and new discoveries.', category: 'Travel', value: 'visitor-visa' },
  { Icon: FileCheck2, title: 'Document services', text: 'Coordinated attestation and translation, with attention to every detail.', category: 'Documents', value: 'attestation' },
];
const steps = [
  ['A conversation first', 'Tell us about your background and where you see your future. Your initial assessment is free.'],
  ['A pathway, made personal', 'We help you understand your options and build a clear plan around your circumstances.'],
  ['Every detail considered', 'Receive guidance through document preparation, review, and your application.'],
  ['Ready for what comes next', 'Stay informed as your application progresses, with support for your next steps.'],
];
function Wordmark() {
  return <a className="wordmark logo-link" href="#top" aria-label="The World Migration home"><img className="brand-logo" src={brandLogo} alt="The World Migration" width="1024" height="592" /></a>;
}
export default function App() {
  const c = useContent();
  const [menu, setMenu] = useState(false);
  const [filter, setFilter] = useState('All services');
  const [now, setNow] = useState(() => new Date());
  const [activeStep, setActiveStep] = useState(0);
  const [selection, setSelection] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInterest, setModalInterest] = useState('');
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    const key = (event) => { if (event.key === 'Escape') setMenu(false); };
    document.addEventListener('keydown', key);
    return () => { clearInterval(timer); document.removeEventListener('keydown', key); };
  }, []);
  const choose = (value) => { setSelection({ value }); setMenu(false); };
  const openConsultation = (val = '') => { setModalInterest(val || selection?.value || ''); setModalOpen(true); setMenu(false); };
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header"><div className="wrap header-row"><Wordmark />
      <nav id="navigation" className={menu ? 'navigation open' : 'navigation'} aria-label="Main navigation">
        {[['Home','top'],['Destinations','destinations'],['Our expertise','services'],['The journey','process'],['About us','about']].map(([label,id]) => <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>{label}</a>)}
        <button type="button" className="button header-cta" onClick={() => openConsultation()} id="header-book-consultation-btn">Book a consultation <ArrowUpRight size={15} /></button>
      </nav><button className="menu-toggle" aria-expanded={menu} aria-controls="navigation" aria-label={menu ? 'Close menu' : 'Open menu'} onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
    </div></header>
    <main id="main">
      <section className="hero" id="top">
        <EditableImage name="hero_image" altName="hero_alt" className="hero-photo" src={c.hero_image || photo('photo-1537373328362-c4dc43a03e41', 2200)} alt={c.hero_alt} fetchPriority="high" />
        <div className="hero-shade" />
        <div className="wrap hero-layout"><div className="hero-copy"><span className="eyebrow light"><span /> A WORLD OF POSSIBILITY</span>
          <h1><Editable name="hero_line1"/><br /><Editable name="hero_line2"/><br /><em><Editable name="hero_line3"/></em></h1>
          <p><Editable name="hero_description"/></p>
          <div className="hero-actions"><button type="button" className="button gold" onClick={() => openConsultation()} id="hero-book-consultation-btn"><Editable name="hero_button"/> <ArrowUpRight size={18} /></button><a className="text-link" href="#destinations">Explore destinations <ArrowDown size={15} /></a></div>
          <div className="hero-reassurance"><ShieldCheck size={17} /><span>Personal attention. Clear advice. Every step.</span></div>
        </div><div className="hero-caption"><span>YOUR NEXT CHAPTER</span><strong><Editable name="hero_caption"/></strong><span>51.5072° N &nbsp; 0.1276° W</span></div></div>
      </section>
      <div className="trust-strip"><div className="wrap trust-grid">{[[Compass,'Individual guidance','Built around your ambitions'],[Globe2,'Four destinations','One considered approach'],[ShieldCheck,'Confidential by design','Your journey is personal'],[FileCheck2,'Attention to detail','From conversation to application']].map(([Icon,title,desc]) => <div className="trust-item" key={title}><Icon size={26} strokeWidth={1.2}/><div><strong>{title}</strong><small>{desc}</small></div></div>)}</div></div>
      <HomeIntroduction />
      <section className="section destinations" id="destinations"><div className="wrap"><div className="section-heading"><div><span className="eyebrow">01 / YOUR WORLD, EXPANDED</span><h2><Editable name="destinations_title"/><br /><em><Editable name="destinations_emphasis"/></em></h2></div><p><Editable name="destinations_intro"/></p></div>
        <div className="destination-grid">{places.map((place,index) => <a className="destination-card" href="#contact" onClick={() => choose(place.value)} key={place.name} aria-label={`Explore ${place.name} and request an assessment`}><EditableImage name={`destination_${index}_image`} src={c[`destination_${index}_image`] || place.image} alt={`${place.city}, ${place.name}`} loading="lazy" /><span className="destination-number">0{index+1}</span><span className="destination-arrow"><ArrowUpRight size={20}/></span><div className="destination-info"><span className="destination-program"><Editable name={`destination_${index}_program`}/></span><h3>{place.name}</h3><p><Editable name={`destination_${index}_note`}/></p></div></a>)}</div>
        <div className="world-clock"><span className="clock-label"><Globe2 size={16}/> A CONNECTED WORLD</span>{places.map(place => <span className="city-time" key={place.city}><span>{place.city}</span><time dateTime={now.toISOString()}>{new Intl.DateTimeFormat('en-GB',{timeZone:place.zone,hour:'2-digit',minute:'2-digit',hour12:false}).format(now)}</time></span>)}</div>
      </div></section>
      <section className="section expertise" id="services"><div className="wrap"><div className="section-heading"><div><span className="eyebrow">02 / THE ART OF MOVING FORWARD</span><h2><Editable name="services_title"/><br /><em><Editable name="services_emphasis"/></em></h2></div><p><Editable name="services_intro"/></p></div>
        <div className="service-tabs" aria-label="Filter services">{['All services','Residence','Work','Business','Education','Travel','Documents'].map(item => <button key={item} aria-pressed={filter===item} className={filter===item?'active':''} onClick={() => setFilter(item)}>{item}</button>)}</div>
        <div className="service-grid">{services.map((service,i) => ({...service,contentIndex:i})).filter(service => filter==='All services'||service.category===filter).map(({Icon,title,value,contentIndex},index) => <a className="service-card" key={title} href="#contact" onClick={() => choose(value)}><div className="service-card-top"><Icon size={31} strokeWidth={1.2}/><span>0{index+1}</span></div><h3><Editable name={`service_${contentIndex}_title`}/></h3><p><Editable name={`service_${contentIndex}_text`}/></p><span className="service-link">Discover your options <ArrowUpRight size={18}/></span></a>)}</div>
      </div></section>
      <About />
      <section className="section journey" id="process"><div className="wrap"><div className="section-heading"><div><span className="eyebrow light">03 / THE JOURNEY, SIMPLIFIED</span><h2>From the first conversation<br/><em>to a new beginning.</em></h2></div><p>A clear process. A dedicated perspective.<br/>Support that moves with you.</p></div><div className="journey-grid"><div className="journey-tabs" role="tablist" aria-label="Your journey" aria-orientation="vertical">{steps.map(([title],index)=><button role="tab" id={`step-${index}`} aria-selected={activeStep===index} aria-controls="step-panel" tabIndex={activeStep===index ? 0 : -1} onKeyDown={(event) => {
                const moves = { ArrowDown: (index+1)%steps.length, ArrowUp: (index+steps.length-1)%steps.length, Home: 0, End: steps.length-1 };
                if (event.key in moves) { event.preventDefault(); setActiveStep(moves[event.key]); document.getElementById(`step-${moves[event.key]}`).focus(); }
              }} key={title} className={activeStep===index?'active':''} onClick={()=>setActiveStep(index)}><span>0{index+1}</span>{title}<ArrowUpRight size={19}/></button>)}</div><div className="journey-panel" id="step-panel" role="tabpanel" aria-labelledby={`step-${activeStep}`}><span className="large-step">0{activeStep+1}</span><Compass size={34} strokeWidth={1}/><h3>{steps[activeStep][0]}</h3><p>{steps[activeStep][1]}</p><a className="text-link" href="#contact">Take the first step <ArrowRight size={17}/></a></div></div></div></section>
      <section className="quote-section"><div className="wrap"><Quote size={30} strokeWidth={1}/><span className="eyebrow">OUR PHILOSOPHY</span><blockquote>“A new country is not just a destination.<br/>It is the beginning of <em>your next chapter.</em>”</blockquote><span className="quote-credit">THE WORLD MIGRATION</span></div></section>
      <Reviews />
      <ContactForm selectedInterest={selection}/>
      <section className="office-strip" id="offices"><div className="wrap office-inner"><div><MapPin size={22}/><span><strong><Editable name="office_title"/></strong><small><Editable name="office_subtitle"/></small></span></div><div><Clock3 size={21}/><span><strong><Editable name="office_hours"/></strong><small><Editable name="office_note"/></small></span></div><a href="#contact" className="text-link dark">Get in touch <ArrowUpRight size={18}/></a></div></section>
    </main>
    <Footer onSelectInterest={choose} />
    <button
      type="button"
      className="floating-consultation-btn"
      onClick={() => openConsultation()}
      aria-label="Open consultation booking popup"
      id="floating-consultation-btn"
    >
      <span className="floating-pulse-dot" />
      <Compass size={16} />
      <span>Book a Consultation</span>
    </button>
    <ConsultationModal
      isOpen={modalOpen}
      onClose={() => setModalOpen(false)}
      defaultInterest={modalInterest}
    />
  </>;
}

