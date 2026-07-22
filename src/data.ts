/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, Article, MediaContent, ServiceItem, TeamMember } from './types';

export const FOUNDER_DATA: TeamMember = {
  id: 'ajak-deng',
  name: 'Ajak Deng Chiengkou',
  role: 'Founder & Chief Executive Officer',
  bio: 'Ajak Deng Chiengkou is the Founder and Chief Executive Officer of AG Media Co. Ltd. He established AG Media as a digital platform and uploaded its first production on 19 November 2008, marking the beginning of a long-term commitment to multimedia storytelling and cultural documentation. A professional journalist, producer, videographer and editor, Ajak leads the company’s strategic direction and editorial standards. His background in broadcast journalism shapes AG Media’s commitment to accuracy, clarity and cultural integrity. He oversees major productions, provides creative direction, and ensures that all work aligns with the company’s mission to preserve and amplify South Sudanese narratives locally and internationally. Under his leadership, AG Media has evolved from a grassroots social channel into a structured production company with a defined creative and operational framework.',
  image: 'input_file_1.png',
  qualifications: [
    'Founded AG Media Co. Ltd (19 November 2008)',
    'Professional Journalist, Producer, Videographer & Lead Editor',
    'Oversees Major Productions and Brand Strategic Alignment',
    'Expert in Broadcaster-Standard Field Operations and Post-Production Editorial Controls'
  ]
};

export const TEAM_MEMBERS_DATA: TeamMember[] = [
  {
    id: 'peter-deng',
    name: 'Peter Deng Akuei',
    role: 'Managing Director, South Sudan',
    bio: 'Peter Deng Akuei serves as the Managing Director of AG Media in South Sudan. In a focused and lean production structure, he carries both executive responsibility and hands-on technical duties. Deng functions as Executive Producer, videographer, editor and photographer. Beyond his managerial role, he is directly involved in field production and post-production, and he is the principal editor behind much of the content published on Ajakguong social platforms. With more than six years of service at AG Media, he has played a significant role in strengthening the company’s digital presence and production consistency. His training in various areas of technology supports efficient workflow management, equipment handling and delivery standards. Clients working with AG Media in South Sudan engage directly with a professional who understands the full production cycle, from concept development and filming to final edit and distribution.',
    image: 'input_file_0.png',
    qualifications: [
      '6+ Years of Dedicated Service at AG Media',
      'Dual Executive & Hands-on Field Operations Management',
      'Lead Post-Production Editor of Ajakguong Social Archive Media',
      'Technologist Trained in High-End Digital Production Workflow Systems'
    ]
  },
  {
    id: 'chol-philip',
    name: 'Chol Philip Achiek (Chopa)',
    role: 'Photographer & Videographer',
    bio: 'Chol Philip Achiek, known professionally as Chopa, is a university student specialising in photography, videography and digital editing. Skilled in photographic and post-production software, he contributes modern visual techniques to AG Media’s creative output. As a photographer and videographer, he supports event coverage, cultural documentation and digital content development. His technical growth and creative discipline strengthen AG Media’s visual identity across platforms.',
    image: 'input_file_2.png',
    qualifications: [
      'University Scholar in Digital Media & Photography',
      'Highly Skilled in Modern Photographic and Editorial Software Suites',
      'Specialist in Wedding, Cultural, & Ceremonial Visual Documentations',
      'Key Contributor to Platform Digital Visual Aesthetics and Brand Layouts'
    ]
  },
  {
    id: 'abraham-akuei',
    name: 'Abraham Akuei Manyok',
    role: 'Cinematographer & Technical Specialist',
    bio: 'Abraham Akuei Manyok is a Computer Science graduate and one of AG Media’s longest-serving cameramen. His technical discipline and practical field experience contribute to the visual stability and consistency of the company’s productions. He has filmed a wide range of projects, including culturally significant documentation that reflects under-recorded aspects of South Sudanese heritage. His work supports AG Media’s long-term commitment to visual archiving and high production standards. Akuei combines technical knowledge with field adaptability, ensuring dependable camera operation in diverse production environments.',
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=400&h=500', // majestic camera layout representing cinematographer
    qualifications: [
      'Bachelor of Computer Science',
      'One of AG Media’s Longest-Serving Lead Field Cameramen',
      'Specialist in Complex Multi-Environment & Low-Light Visual Capture',
      'Pioneer of Broadcaster-Standard Archival Field Footage Workflows'
    ]
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'river-of-return',
    title: 'The River of Return',
    subtitle: 'A Study of Post-Conflict Repatriation Along the Nile',
    category: 'Documentary',
    year: '2025',
    description: 'This flagship documentary follows families returning from regional refugee camps to rebuild their lives in the South Sudanese agricultural heartland.',
    longDescription: 'Filmed over eighteen months across Upper Nile and Central Equatoria, "The River of Return" offers an intimate, unvarnished look at voluntary repatriation. Eschewing sensationalist trauma-focused lenses, the documentary focuses on local agricultural innovation, customary dispute resolution regarding land ownership, and the revival of communal schools. It stands as a vital piece of civic evidence showing the direct correlation between land security and sustainable peace.',
    impactMetric: '18 Months',
    impactLabel: 'Framer-to-Framer Ethnographic Study',
    credits: [
      { role: 'Executive Producer', name: 'Awan Guol' },
      { role: 'Director of Photography', name: 'Emmanuel Lado' },
      { role: 'Lead Researcher', name: 'Dr. Rebecca Nyandeng' },
      { role: 'Audio Recording & Design', name: 'John Garang Jr.' }
    ],
    image: 'https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85?auto=format&fit=crop&q=80&w=1200&h=675' // majestic river landscape
  },
  {
    id: 'oral-history-archive',
    title: 'The Living Archives Project',
    subtitle: 'Digital Preservation of Indigenous Oral Traditions',
    category: 'Cultural Archive',
    year: '2024 - Present',
    description: 'An active, institutional-grade campaign to record, transcribe, and catalog oral legal and historical traditions of South Sudan\'s elder leaders.',
    longDescription: 'Working closely with local elders, linguists, and regional authorities, the Living Archives Project has created high-fidelity digital transcripts and audio recordings of oral laws, genealogical narratives, and historical peace pacts. To date, we have securely archived collections across Dinka, Nuer, Bari, and Shilluk communities. All metadata conforms to international archiving standards, providing a secure, non-politicised repository for future educational research.',
    impactMetric: '140+ Hours',
    impactLabel: 'Of High-Fidelity Audio Archived',
    credits: [
      { role: 'Chief Archivist', name: 'Grace Keji' },
      { role: 'Language Consultant', name: 'Prof. Marko Deng' },
      { role: 'Technical Lead', name: 'Awan Guol' }
    ],
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=1200&h=675' // books, scripts, old documents
  },
  {
    id: 'victoria-juba-dialogue',
    title: 'Juba-Melbourne Civic Literacy Liaison',
    subtitle: 'Transnational Visual Exchange and Education',
    category: 'Civic Project',
    year: '2025',
    description: 'A structured digital program connecting South Sudanese youth in Victoria, Australia, with civic initiatives and student peers in Juba.',
    longDescription: 'This project bridges the physical distance between the diaspora and the homeland. Through a series of structured workshops in mobile journalism, photography, and civic debate, young people from Melbourne and Juba collaborated to produce dual-perspective visual essays on identity, constitutional responsibility, and long-term nation-building. The resulting exhibition has been showcased at civic centers in both Melbourne and Juba.',
    impactMetric: '400+ Youth',
    impactLabel: 'Directly Engaged in Civic Exchange',
    credits: [
      { role: 'Program Director', name: 'Awan Guol' },
      { role: 'Youth Liaison (Victoria)', name: 'Daniel Majok' },
      { role: 'Creative Mentor (Juba)', name: 'Esther Pitia' }
    ],
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200&h=675' // seminar, learning, meeting
  }
];

export const ARTICLES_DATA: Article[] = [
  {
    id: 'constitutional-literacy',
    title: 'The Role of Media in Post-Conflict Constitutional Literacy',
    excerpt: 'An exploration of how structured community journalism and multi-lingual visual media can foster deep public engagement with national governance frameworks.',
    content: [
      'Constitutional drafting processes in post-conflict societies are frequently criticised as elite-driven exercises. While international advisors and local politicians meet in secure administrative zones, the vast majority of the population—especially those in remote agrarian districts—remain disconnected from the legal instruments that will govern their lives. This gap in constitutional literacy is not merely an educational failure; it is a direct threat to the legitimacy of the state.',
      'In South Sudan, where linguistic diversity is vast and access to print media is heavily concentrated in major urban hubs, the challenge of public engagement is acute. Here, professional media organisations must step in. It is not enough to simply translate complex constitutional clauses into local languages; the media must translate the concepts into lived realities. This requires a transition from formal legalistic reporting to narrative-driven civic education.',
      'Through structured radio broadcasting, localized video essays, and facilitated community viewing circles, AG Media has pioneered a "deliberative media" methodology. By presenting constitutional questions as direct community choices—such as the balance between customary courts and the formal judiciary—we invite citizens to participate in national design. When individuals see their customary values respected and their voices captured with dignity, the national constitution ceases to be an abstract foreign document and becomes a shared covenant.',
      'To build a constitutional culture that survives political transitions, we must commit to long-term, non-partisan documentation. This is not the work of rapid-response international agencies or short-term NGO campaigns. It requires local institutions, staffed by domestic journalists who understand the cultural metaphors, historical grievances, and profound aspirations of the community. Only then can we cultivate an informed, legally literate citizenry capable of holding power to account.'
    ],
    author: 'Awan Guol',
    authorRole: 'Founder & Managing Director',
    publishDate: '14 May 2026',
    category: 'Civic Education',
    readTime: '6 mins read',
    image: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&q=80&w=800&h=450',
    citations: [
      'South Sudan Transitional Constitution, 2011 (As amended)',
      'UNESCO Media Development Indicators Framework',
      'AG Media Field Report: Equatoria Constitutional Liaison (October 2025)'
    ]
  },
  {
    id: 'narrative-sovereignty',
    title: 'Narrative Sovereignty: Why South Sudan Must Archive Its Own History',
    excerpt: 'An analytical critique of external lenses in East African documentary practice and the urgent necessity of sovereign, community-led digital archiving.',
    content: [
      'For decades, the historical record of South Sudan has been curated almost exclusively by external actors. Foreign academics, international conflict analysts, and non-governmental organisations have held a virtual monopoly on the visual and textual representation of our society. While many of these accounts are well-intentioned, they are inevitably shaped by external institutional mandates, donor cycles, and the structural demand for sensationalised humanitarian crises.',
      'This systemic imbalance results in a profound loss of cultural context and historical continuity. Complex traditional mechanisms of conflict resolution are reduced to "ethnic violence," while rich ancestral agricultural systems are framed solely through the lens of chronic dependency. When a nation is denied the sovereignty of its own narrative, its people are deprived of the intellectual resources needed to conceptualise their own future.',
      'Narrative sovereignty is the right of a community to document, interpret, and disseminate its own historical and cultural truths. It is a fundamental component of self-determination. In the digital age, achieving this sovereignty requires the establishment of domestic archiving institutions that adhere to rigorous international technical standards while remaining deeply rooted in local cultural protocols.',
      'At AG Media, we approach archiving not as a static museum activity, but as a living civic duty. By employing South Sudanese technicians, historians, and media practitioners, we ensure that every interview, every recording, and every transcript is processed with an innate understanding of linguistic nuances and local taboos. By housing these records in non-politicised, community-accessible platforms, we return the custody of history to its rightful owners.'
    ],
    author: 'Awan Guol',
    authorRole: 'Founder & Managing Director',
    publishDate: '28 January 2026',
    category: 'Editorial',
    readTime: '8 mins read',
    image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&q=80&w=800&h=450',
    citations: [
      'Deng, F. M. (1972) - "The Dinka of the Sudan", Holt, Rinehart and Winston',
      'The Khartoum Treaty Archives (Historical Reference)',
      'Sovereign Digital Archiving Protocols (AG Media Working Paper, 2024)'
    ]
  },
  {
    id: 'customary-law-reflection',
    title: 'Customary Jurisprudence: Field Reflections on Local Judiciaries',
    excerpt: 'A structured examination of the resilience of traditional courts and their complex, vital relationship with the formal state judicial system.',
    content: [
      'In the remote districts of South Sudan, the formal state judiciary is often a distant abstraction. For the vast majority of citizens, justice is not administered in modern brick courtrooms by wigged judges; it is negotiated under the shade of mature Acacia trees by assembly councils of elders. These traditional courts, operating under centuries-old customary law, handle over eighty percent of civil disputes, including land division, family law, and livestock transactions.',
      'Critics of customary law frequently point to its lack of codification, procedural variation, and traditional gender roles as structural weaknesses. However, from an ethnographic and civic perspective, the resilience of these courts is undeniable. They are accessible, cheap, highly transparent, and focus primarily on restoring community harmony rather than punitive isolation. In a society recovering from protracted conflict, restorative justice is an invaluable asset.',
      'Rather than seeking to dismantle or override customary judiciaries with Western legal duplicates, the path to rule of law in South Sudan lies in systematic integration. The formal Supreme Court and traditional benches must establish mutual paths of appeal and jurisdiction. Media and documentation play a critical role in this transition by publicising landmark customary rulings that align with universal constitutional rights.',
      'AG Media\'s research team has documented over fifty sessions of customary courts across Central Equatoria. Our observations show a growing willingness among traditional chiefs to integrate statutory constitutional protections—particularly regarding women\'s inheritance—provided they are introduced through respectful dialogue rather than external dictation. Capturing these moments of legal evolution is key to showing a mature, evolving, and sovereign legal system.'
    ],
    author: 'AG Media Research Team',
    authorRole: 'Sociology and Legal Documentation Division',
    publishDate: '10 November 2025',
    category: 'Field Report',
    readTime: '5 mins read',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800&h=450',
    citations: [
      'Local Government Act, Republic of South Sudan (2009)',
      'Customary Law Harmonisation Study, Juba University',
      'AG Media Audio Log Volume IV: Traditional Court Sessions (Terekeka State)'
    ]
  }
];

export const MEDIA_CONTENT_DATA: MediaContent[] = [
  {
    id: 'podcast-customary-law',
    title: 'Episode 14: Restoring the Sacred Fire: Customary Law and the Modern State',
    type: 'podcast',
    category: 'Civic Jurisprudence',
    description: 'A deep-dive editorial roundtable with Chief Justin Lado and constitutional scholar Dr. Rebecca Deng on how traditional courts negotiate jurisdiction with the high court.',
    durationOrPages: '42 mins',
    coverImage: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80&w=600&h=400', // high quality microphone/audio
    releaseDate: '12 July 2026',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // high-fidelity default test mp3
    youtubeUrl: 'https://www.youtube.com/embed/SdgE9tW_gXQ' // Customary Law video discussion
  },
  {
    id: 'podcast-oral-traditions',
    title: 'Episode 15: Recording the Unwritten: Oral Traditions and Archival Sovereignty',
    type: 'podcast',
    category: 'Oral Archives',
    description: 'Founder Ajak Deng Chiengkou sits down with Elder Ustaz James Chol to discuss the methodologies of preserving genealogies and clan treaties across generations.',
    durationOrPages: '35 mins',
    coverImage: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&q=80&w=600&h=400',
    releaseDate: '18 July 2026',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', // high-fidelity default test mp3 2
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Archival interview video
  },
  {
    id: 'teaser-river-return',
    title: 'The River of Return (Official Trailer)',
    type: 'video',
    category: 'Documentary',
    description: 'A high-definition preview of our flagship ethnographic documentary, capturing the return of community agricultural networks along the White Nile.',
    durationOrPages: '3:15 mins',
    coverImage: 'https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85?auto=format&fit=crop&q=80&w=600&h=400',
    releaseDate: '01 March 2025',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' // default beautiful sample video asset
  },
  {
    id: 'photo-essay-sudd',
    title: 'The Sudd Wetlands: Balance and Cultural Practice',
    type: 'photo-essay',
    category: 'Ecology & Heritage',
    description: 'A stunning monochrome documentary photo essay detailing the seasonal migration patterns, pastoral heritage, and ecological balance of cattle-keeping in the Nile basin.',
    durationOrPages: '6 frames',
    coverImage: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=600&h=400', // african savannah/wetland feel
    releaseDate: '18 October 2025',
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=800&h=500',
        caption: 'The sunrise across the Sudd wetlands, where seasonal floods define both agricultural planning and cattle-rearing cycles.'
      },
      {
        url: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=800&h=500',
        caption: 'Communal grazing fields: local families gather livestock to discuss cattle vaccination programmes led by local veterinary officers.'
      },
      {
        url: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=800&h=500',
        caption: 'Elders passing oral historical pacts to the next generation during seasonal rest periods, demonstrating historical legal persistence.'
      },
      {
        url: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80&w=800&h=500',
        caption: 'Recording and archiving process: Grace Keji of AG Media calibrating high-fidelity audio equipment in Terekeka.'
      },
      {
        url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800&h=500',
        caption: 'A cross-generational forum where the constitution draft is read in local dialects, creating unified regional dialogue.'
      },
      {
        url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800&h=500',
        caption: 'A view of the regional customary assembly hall, constructed using traditional brickwork and high-vaulted local timber.'
      }
    ]
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'documentary-production',
    title: 'Research-Backed Documentary Production',
    description: 'Cinematic, factually grounded non-fiction visual storytelling. We handle the entire pipeline from ethical community engagement and local research to world-class 4K master delivery.',
    deliverables: [
      'Comprehensive cultural risk assessment and community liaison protocols',
      'Multilingual field capture (Dinka, Nuer, Bari, Jur, English)',
      'Subtitling, voiceovers, and legal clearance audits',
      '4K mastering, surround-sound design, and digital distribution packages'
    ],
    audience: 'NGOs, academic institutions, broadcasters, and humanitarian agencies requiring professional, dignified footage that respects local sovereignty.',
    consultationFocus: 'Translation of complex developmental theories or programmatic achievements into character-driven, highly watchable visual evidence.'
  },
  {
    id: 'cultural-archiving',
    title: 'Structured Archiving & Oral Digitisation',
    description: 'Professional gathering, transcription, and indexing of indigenous oral histories, customary legal precedents, and genealogical records.',
    deliverables: [
      'High-fidelity digital audio and video field recording using broadcast-standard equipment',
      'Verbatim orthographic transcription and rigorous English translations',
      'Metadata schema tagging conforming to Dublin Core and international library specifications',
      'Provision of secure offline digital copies to community custodians and councils'
    ],
    audience: 'Research institutes, cultural heritage organisations, community trusts, and legal councils seeking to codify and safeguard local heritage.',
    consultationFocus: 'Design of community-led protocols that maintain local ownership and custody of ancestral records while enabling academic access.'
  },
  {
    id: 'media-pr-consultancy',
    title: 'Communications & Strategic PR Advisory',
    description: 'Dignified, precise communications counsel for organizations operating within complex civic and cultural landscapes in South Sudan and Australia.',
    deliverables: [
      'Strategic messaging frameworks translating organizational missions into culturally respectful narratives',
      'Crisis communication advisory, threat analysis, and press statement drafting',
      'Local media mapping, engagement protocols, and distribution lists',
      'Media training for local executives and community advocates'
    ],
    audience: 'International development partners, humanitarian networks, civil society organizations, and civic leaders.',
    consultationFocus: 'Aligning external brand expectations with rigorous South Sudanese legal and cultural realities to prevent miscommunication.'
  },
  {
    id: 'civic-training-workshops',
    title: 'Civic Journalism & Archival Workshops',
    description: 'Direct capacity-building courses transferring modern media skills and constitutional knowledge to youth and community organizers.',
    deliverables: [
      'Curricula on mobile journalism ethics, composition, and high-fidelity smartphone capture',
      'Constitutional literacy modules structured around civic engagement and rights documentation',
      'Hands-on indexing, archiving, and digital library management seminars',
      'Direct mentorship placement within active AG Media projects'
    ],
    audience: 'Community councils, schools, regional youth unions, and local civil society networks.',
    consultationFocus: 'Empowering young citizens to become active documentarians of their own communities under professional guidance.'
  },
  {
    id: 'wedding-event-coverage',
    title: 'Event Production & Wedding Celebration Cinema',
    description: 'High-end, culturally resonant, cinematic documentary coverage of weddings, milestone anniversaries, and community gatherings. We craft visual legacies that celebrate life\'s defining unions with pristine style, joy, and deep-seated cultural honor.',
    deliverables: [
      'Multi-camera cinematic film capture in pristine 4K Ultra-HD resolution',
      'Candid documentary photography, professional color grading, and high-end retouching',
      'Custom cinematic wedding trailer (3-5 minutes) and elegant full-length feature documentary',
      'Durable, permanently archived digital folders with premium custom photobooks and layouts'
    ],
    audience: 'Families, couples, and organizations wishing to preserve life-defining celebrations with cinema-grade standards and absolute narrative dignity.',
    consultationFocus: 'Mapping individual familial timelines and traditional highlights to produce highly personalized, timeless matrimonial records.'
  }
];
