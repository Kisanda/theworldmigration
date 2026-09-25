import { Editable } from '../Editable';
import { Compass, Globe2, Users, ShieldCheck, HeartHandshake, ArrowUpRight } from 'lucide-react';

const details = [
  { title: 'What we do', Icon: Globe2, text: 'We offer a variety of services including but not limited to, migration consulting services for skilled migrants, procuring work visas, investor visas, entrepreneur visas, study permits, visit visas and document attestation and translations for all countries across the globe. At present we specialize in procuring visas for Australia, Canada, Denmark and Entrepreneur visas for the United Kingdom.' },
  { title: 'Our team', Icon: Users, text: 'The World Migration is the brain child of a team of experts with extensive and in-house experience in the UK and Canadian Immigration Departments. This consultancy has been set up post the retirement of our team members with the vision of helping people to get their visa application processed smoothly. You can be rest assured that you will fully qualify for the chosen visa of your preference with our impartial advice, offered free of charge even before you become a paying client.' },
  { title: 'Our Standards', Icon: ShieldCheck, text: 'The World Migration is a trusted name in the migration consultancy field with a global presence and we are accredited by the Immigration Consultants of Canada Regulatory Council (ICCRC) and Migration Agents Registration Authority (MARA) in Australia. We truly believe that integrity and honesty should be a key part of the proceedings and the services provided here conform to the highest global standards.' },
  { title: 'Why Us?', Icon: HeartHandshake, text: 'Well, you may rightfully ask, why The World Migration over any other consultancy? We are very proud about the fact that we are extremely honest, reliable and provide service that is 100% value for money. Further, scores of people have benefitted from our “no obligation free visa assessment” that has guided them throughout the complex process with our step by step assistance. Furthermore, we are very pleased to announce that most of our new clients are referral clients and our biggest marketing tool has been word of mouth referral by past clients. For a journey that will be truly special, join hands with The World Migration.' },
];

export function HomeIntroduction() {
  
  return <section className="section home-introduction" aria-labelledby="home-intro-heading"><div className="wrap introduction-grid">
    <div><span className="eyebrow">WELCOME TO THE WORLD MIGRATION</span><h2 id="home-intro-heading">Your dreams.<br/><em>Our dedication.</em></h2><a className="text-link dark" href="#about">Discover who we are <ArrowUpRight size={18}/></a></div>
    <div className="introduction-copy"><p><Editable name="welcome_0"/></p><p><Editable name="welcome_1"/></p></div>
  </div></section>;
}

export default function About() {
  
  return <section className="section about-section" id="about"><div className="wrap">
    <div className="about-title"><span className="eyebrow">ABOUT THE WORLD MIGRATION</span><h2><Editable name="about_title"/><br/><em><Editable name="about_emphasis"/></em></h2><span className="about-title-rule"/></div>
    <div className="purpose-grid">
      <article className="purpose-card vision-card"><Compass size={34} strokeWidth={1}/><span className="eyebrow light">01 / OUR PURPOSE</span><h3>Vision</h3><p><Editable name="vision"/></p></article>
      <article className="purpose-card mission-card"><Globe2 size={34} strokeWidth={1}/><span className="eyebrow">02 / OUR COMMITMENT</span><h3>Mission</h3><p><Editable name="mission"/></p></article>
    </div>
    <div className="about-details">{details.map(({title,Icon},index)=><article className="about-detail" key={title}><div className="about-detail-heading"><span className="about-detail-number">0{index+3}</span><Icon size={25} strokeWidth={1.3}/><h3>{title}</h3></div><p><Editable name={`about_detail_${index}`}/></p></article>)}</div>
    <div className="about-invitation"><span>For a journey that will be truly special.</span><a className="button gold" href="#contact">Join hands with The World Migration <ArrowUpRight size={18}/></a></div>
  </div></section>;
}
