/* Northbank Technology Park — prototype seed data.
 * Every company, person, product, address and number here is fictional. Field names match what the
 * page scripts read; the store copies `initialUser` into sessionStorage (see prototype/store.js). */
(() => {
  const companyCategories = { software: 'Software', data: 'Data & AI', security: 'Security', hardware: 'Hardware & IoT', education: 'Education' };
  const C = (id, name, category, building, country, intro, lead, tags) => ({
    id, name, short: name.split(' ')[0], sector: companyCategories[category], category, country, building, intro, lead, tags,
    website: `${id}.example`, phone: '+84 28 0000 0000',
  });
  const companies = [
    C('lattice', 'Lattice Systems', 'software', 'Atlas', 'Vietnam', 'Custom software for banks and insurers.', 'Lattice Systems builds core banking, claims and customer apps for financial companies in Southeast Asia. About 600 engineers work from four floors of Atlas.', ['Banking software', 'Mobile apps', 'QA']),
    C('mangrove', 'Mangrove AI', 'data', 'Atlas', 'Singapore', 'Document and language AI for operations teams.', 'Mangrove AI turns forms, invoices and contracts into structured data. Its regional engineering team moved to Atlas in 2026.', ['Document AI', 'NLP', 'Data pipelines']),
    C('tessera', 'Tessera Health', 'software', 'Beacon', 'Vietnam', 'Clinic and hospital software.', 'Tessera Health makes booking, records and billing software used by 140 private clinics in Vietnam.', ['Health tech', 'Records', 'Billing']),
    C('oriel', 'Oriel Pay', 'software', 'Atlas', 'Vietnam', 'Payment rails for online merchants.', 'Oriel Pay processes card and QR payments for mid-sized online shops and runs its risk team on campus.', ['Payments', 'Fintech', 'Risk']),
    C('kite', 'Kite Logistics Tech', 'software', 'Beacon', 'Vietnam', 'Route planning for delivery fleets.', 'Kite plans daily routes for 9,000 delivery vehicles and builds the driver app that goes with it.', ['Logistics', 'Routing', 'Mobile apps']),
    C('sable', 'Sable Security', 'security', 'Cobalt', 'Vietnam', 'Managed detection and response.', 'Sable Security watches customer networks around the clock from its operations room next to the Cobalt data center.', ['SOC', 'Incident response', 'Pen testing']),
    C('pivot', 'Pivot Robotics', 'hardware', 'Delta Labs', 'Japan', 'Warehouse robots and their software.', 'Pivot Robotics designs autonomous carts for warehouses and tests them on a 600 m² floor in Delta Labs.', ['Robotics', 'Embedded', 'Computer vision']),
    C('fernwood', 'Fernwood Studios', 'software', 'Beacon', 'Vietnam', 'Mobile and PC games.', 'Fernwood Studios has shipped eleven mobile games and is building its first PC title with a team of 120.', ['Games', 'Unity', 'Art']),
    C('quill', 'Quill Learning', 'education', 'Grove', 'Vietnam', 'Online courses for working engineers.', 'Quill Learning runs evening and weekend courses in cloud, data and testing, taught on campus and online.', ['Training', 'Cloud', 'Testing']),
    C('halyard', 'Halyard Telecom', 'hardware', 'Cobalt', 'Vietnam', 'Fibre and private networks for business parks.', 'Halyard Telecom runs one of the two fibre routes into Northbank and builds private 5G networks for factories.', ['Fibre', 'Private 5G', 'Networks']),
    C('pelican', 'Pelican Analytics', 'data', 'Atlas', 'Australia', 'Retail analytics and forecasting.', 'Pelican Analytics forecasts demand for retail chains and grocery stores across the region.', ['Forecasting', 'Retail', 'BI']),
    C('bastion', 'Bastion Labs', 'security', 'Forge', 'Vietnam', 'Application security testing tools.', 'Bastion Labs makes a scanner that checks code for security flaws before release. It joined Forge in 2025.', ['AppSec', 'DevSecOps', 'Startups']),
    C('copperline', 'Copperline Labs', 'hardware', 'Delta Labs', 'Korea', 'Power electronics for electric scooters.', 'Copperline Labs designs battery management boards and tests them in a shielded lab in Delta Labs.', ['Power electronics', 'Batteries', 'Embedded']),
    C('riverglass', 'Riverglass ERP', 'software', 'Atlas', 'Vietnam', 'ERP for manufacturers.', 'Riverglass ERP runs purchasing, stock and production planning for 300 factories in Vietnam.', ['ERP', 'Manufacturing', 'Cloud']),
    C('tidewater', 'Tidewater Data', 'data', 'Cobalt', 'Vietnam', 'Managed data platforms.', 'Tidewater Data builds and runs data warehouses for companies that do not want a data team of their own.', ['Data platform', 'Cloud', 'Managed services']),
    C('kestrel-vision', 'Kestrel Vision', 'data', 'Delta Labs', 'Vietnam', 'Camera-based quality inspection.', 'Kestrel Vision spots defects on production lines with cameras and models trained on factory images.', ['Computer vision', 'Manufacturing', 'Edge AI']),
    C('saltmarsh', 'Saltmarsh Apps', 'software', 'Beacon', 'Vietnam', 'Product studio for startups.', 'Saltmarsh Apps designs and builds first versions of products for early-stage startups.', ['Product design', 'Web', 'Mobile apps']),
    C('brightpath', 'Brightpath Academy', 'education', 'Grove', 'Vietnam', 'Coding school for career changers.', 'Brightpath Academy runs a 16-week full-time programme and places most graduates with member companies.', ['Bootcamp', 'Web development', 'Careers']),
    C('keystone', 'Keystone Identity', 'security', 'Atlas', 'Germany', 'Identity checks for online sign-up.', 'Keystone Identity verifies ID documents and faces for banks and marketplaces.', ['Identity', 'KYC', 'Fraud']),
    C('anvil', 'Anvil Semiconductor', 'hardware', 'Delta Labs', 'Taiwan', 'Chip design services.', 'Anvil Semiconductor designs and verifies chips for consumer devices, with a design center of 80 engineers.', ['Chip design', 'Verification', 'Semiconductors']),
    C('juniper', 'Juniper Ledger', 'software', 'Atlas', 'Vietnam', 'Accounting software for small businesses.', 'Juniper Ledger keeps the books of 40,000 small businesses and files their e-invoices.', ['Accounting', 'E-invoice', 'SME']),
    C('wayfarer', 'Wayfarer Travel Tech', 'software', 'Beacon', 'Thailand', 'Booking systems for tour operators.', 'Wayfarer builds booking and payment systems for tour operators and small hotels.', ['Travel', 'Booking', 'Payments']),
    C('granite', 'Granite Insights', 'data', 'Forge', 'Vietnam', 'Market research with survey data.', 'Granite Insights runs online panels and turns survey answers into dashboards for brands.', ['Research', 'Surveys', 'Dashboards']),
    C('volt', 'Volt Circuitry', 'hardware', 'Delta Labs', 'Vietnam', 'Prototype boards in days.', 'Volt Circuitry builds and tests prototype circuit boards for member companies and startups on campus.', ['PCB', 'Prototyping', 'Testing']),
    C('marlowe', 'Marlowe Retail Systems', 'software', 'Atlas', 'United Kingdom', 'Point-of-sale and loyalty software.', 'Marlowe runs the tills and loyalty apps of 2,000 shops and cafés.', ['Retail', 'POS', 'Loyalty']),
    C('cedarpoint', 'Cedarpoint Digital', 'software', 'Beacon', 'Vietnam', 'Digital agency for brands.', 'Cedarpoint Digital builds websites, apps and campaigns for consumer brands.', ['Web', 'Marketing', 'Design']),
    C('halftone', 'Halftone Media', 'software', 'Forge', 'Vietnam', 'Short-form video tools.', 'Halftone Media makes editing tools for short videos and is one of Forge’s fastest growing startups.', ['Video', 'Creator tools', 'Startups']),
    C('lantern', 'Lantern Cloud', 'software', 'Cobalt', 'Vietnam', 'Cloud hosting for local companies.', 'Lantern Cloud rents servers and managed Kubernetes from racks in the Cobalt data center.', ['Cloud', 'Hosting', 'Kubernetes']),
    C('orchard', 'Orchard Tutors', 'education', 'Grove', 'Vietnam', 'Online tutoring for school students.', 'Orchard Tutors connects 8,000 tutors with school students for live online lessons.', ['Edtech', 'Tutoring', 'Mobile apps']),
    C('ferro', 'Ferro Sensors', 'hardware', 'Forge', 'Vietnam', 'Air quality sensors for buildings.', 'Ferro Sensors makes low-cost air quality sensors; 40 of them run on the Northbank campus.', ['IoT', 'Sensors', 'Buildings']),
  ];

  const solutionCategories = { ai: 'AI and data', cloud: 'Cloud and development', cyber: 'Security', erp: 'Business software' };
  const S = (id, name, companyId, category, type, focus, summary, features, deployment, demo = true) => ({
    id, name, provider: companies.find((c) => c.id === companyId).name, companyId, category, type, focus, summary, features, deployment, demo,
  });
  const solutions = [
    S('docusift', 'DocuSift', 'mangrove', 'ai', 'Product', 'Reading invoices and forms', 'DocuSift reads invoices, receipts and application forms and returns clean, checked data to your systems.', ['Templates for 40 Vietnamese invoice layouts', 'Human review queue for low-confidence fields', 'API and CSV export'], 'Cloud'),
    S('mangrove-chat', 'Mangrove Assist', 'mangrove', 'ai', 'Product', 'Answering staff questions from policy documents', 'An internal assistant that answers staff questions from your own policies and manuals, with links to the source page.', ['Works in Vietnamese and English', 'Answers cite the source document', 'Admin view of unanswered questions'], 'Cloud'),
    S('pelican-forecast', 'Pelican Forecast', 'pelican', 'ai', 'Product', 'Store-level demand forecasts', 'Daily demand forecasts per store and product, so buyers order less of what does not sell.', ['Weather and holiday effects', 'Forecast accuracy report', 'Order suggestions'], 'Cloud'),
    S('kestrel-inspect', 'Kestrel Inspect', 'kestrel-vision', 'ai', 'Product', 'Defect detection on production lines', 'Cameras and an edge computer that flag scratches, dents and missing parts on the line.', ['Runs on site without internet', 'Trained on your own images', 'Shift reports'], 'On premise'),
    S('tidewater-platform', 'Tidewater Platform', 'tidewater', 'ai', 'Service', 'A managed data warehouse', 'Tidewater sets up, runs and monitors your data warehouse and dashboards for a monthly fee.', ['Setup in six weeks', 'Daily data quality checks', 'Named data engineer'], 'Cloud'),
    S('granite-panels', 'Granite Panels', 'granite', 'ai', 'Service', 'Survey research', 'Online surveys with a panel of 120,000 people in Vietnam, delivered as a live dashboard.', ['Sample design', 'Weekly trackers', 'Raw data export'], 'Cloud', false),
    S('lantern-kube', 'Lantern Kubernetes', 'lantern', 'cloud', 'Service', 'Managed Kubernetes in Ho Chi Minh City', 'Managed Kubernetes clusters hosted in the Cobalt data center, with data kept in Vietnam.', ['99.95% uptime target', 'Daily backups', '24/7 support in Vietnamese'], 'Cloud'),
    S('lantern-backup', 'Lantern Backup', 'lantern', 'cloud', 'Service', 'Offsite backup', 'Encrypted backups of servers and laptops to the Cobalt data center.', ['Restore tests every quarter', 'Ransomware protection', 'Pay per terabyte'], 'Cloud'),
    S('saltmarsh-mvp', 'First Version Sprint', 'saltmarsh', 'cloud', 'Service', 'Designing and building a first product', 'A 12-week sprint that takes a startup from idea to a first version real users can try.', ['Product discovery', 'Design and build', 'Launch support'], 'Cloud', false),
    S('volt-proto', 'Volt Prototype Boards', 'volt', 'cloud', 'Service', 'Fast circuit board prototypes', 'Circuit board prototypes built and tested on campus in five working days.', ['Design review', 'Assembly', 'Functional tests'], 'On premise'),
    S('sable-mdr', 'Sable Watch', 'sable', 'cyber', 'Service', 'Around-the-clock threat monitoring', 'Sable analysts watch your network and cloud accounts day and night and respond to attacks.', ['24/7 analysts in Northbank', 'Response within 15 minutes', 'Monthly report'], 'Cloud'),
    S('sable-pentest', 'Sable Test', 'sable', 'cyber', 'Service', 'Penetration testing', 'Certified testers attack your web apps and networks the way a real attacker would, then help you fix what they find.', ['Web, mobile and network tests', 'Retest included', 'Report for auditors'], 'On premise'),
    S('bastion-scan', 'Bastion Scan', 'bastion', 'cyber', 'Product', 'Finding security flaws in code', 'Bastion Scan checks every code change for security flaws before it is released.', ['Works with GitHub and GitLab', 'Fix suggestions', 'OWASP Top 10 report'], 'Cloud'),
    S('keystone-verify', 'Keystone Verify', 'keystone', 'cyber', 'Product', 'Checking ID documents online', 'Keystone Verify checks ID cards and faces during online sign-up in under ten seconds.', ['Vietnamese ID cards and passports', 'Liveness check', 'Audit trail'], 'Cloud'),
    S('riverglass-erp', 'Riverglass ERP', 'riverglass', 'erp', 'Product', 'Purchasing, stock and production', 'An ERP for manufacturers covering purchasing, stock, production planning and costing.', ['Vietnamese accounting rules', 'Barcode stock counts', 'Mobile approvals'], 'Cloud'),
    S('juniper-books', 'Juniper Books', 'juniper', 'erp', 'Product', 'Bookkeeping and e-invoices', 'Bookkeeping, payroll and e-invoices for businesses with up to 200 staff.', ['Connected to the tax e-invoice system', 'Bank feeds', 'Accountant access'], 'Cloud'),
    S('marlowe-pos', 'Marlowe POS', 'marlowe', 'erp', 'Product', 'Tills and loyalty for shops', 'Point-of-sale and loyalty for shops and cafés, with stock that updates as you sell.', ['Works offline', 'QR payments', 'Loyalty app'], 'Cloud'),
    S('tessera-clinic', 'Tessera Clinic', 'tessera', 'erp', 'Product', 'Running a private clinic', 'Booking, patient records and billing for private clinics.', ['Online booking', 'E-prescriptions', 'Insurance claims'], 'Cloud'),
    S('kite-routes', 'Kite Routes', 'kite', 'erp', 'Product', 'Daily delivery routes', 'Plans delivery routes every morning and tracks drivers through the day.', ['Driver app', 'Proof of delivery', 'Fuel reports'], 'Cloud'),
    S('wayfarer-book', 'Wayfarer Booking', 'wayfarer', 'erp', 'Product', 'Bookings for tour operators', 'Online bookings, payments and guide schedules for tour operators.', ['Multi-currency payments', 'Guide app', 'Partner sales'], 'Cloud', false),
  ];

  const units = [
    { id: 'atlas-0705', building: 'Atlas', buildingKey: 'atlas', floor: 7, area: 420, seats: 60, status: 'available', availableFrom: '2026-12-01', fitout: 'Fitted out', features: ['River view', 'Two meeting rooms', 'Dual fibre'] },
    { id: 'atlas-0402', building: 'Atlas', buildingKey: 'atlas', floor: 4, area: 180, seats: 26, status: 'available', availableFrom: '2026-12-15', fitout: 'Shell and core', features: ['Near the lifts', 'Shared meeting rooms', 'Dual fibre'] },
    { id: 'atlas-1101', building: 'Atlas', buildingKey: 'atlas', floor: 11, area: 900, seats: 130, status: 'soon', availableFrom: '2027-03-01', fitout: 'Fitted out', features: ['Whole floor', 'Private reception', 'Terrace'] },
    { id: 'beacon-b12', building: 'Beacon', buildingKey: 'beacon', floor: 1, area: 85, seats: 12, status: 'available', availableFrom: '2027-02-01', fitout: 'Furnished', features: ['Ready to move in', 'Coworking lounge', 'Phone booths'] },
    { id: 'beacon-b31', building: 'Beacon', buildingKey: 'beacon', floor: 3, area: 140, seats: 20, status: 'available', availableFrom: '2026-12-01', fitout: 'Furnished', features: ['Ready to move in', 'Kitchen', 'Lockers'] },
    { id: 'beacon-b45', building: 'Beacon', buildingKey: 'beacon', floor: 4, area: 60, seats: 8, status: 'leased', availableFrom: '2027-09-01', fitout: 'Furnished', features: ['Corner unit', 'Phone booths', 'Lockers'] },
    { id: 'delta-l304', building: 'Delta Labs', buildingKey: 'delta', floor: 3, area: 160, seats: 14, status: 'available', availableFrom: '2026-12-10', fitout: 'Lab ready', features: ['3-phase power', 'ESD floor', 'Loading bay access'] },
    { id: 'delta-l112', building: 'Delta Labs', buildingKey: 'delta', floor: 1, area: 600, seats: 30, status: 'soon', availableFrom: '2027-04-01', fitout: 'Lab ready', features: ['Ground floor test area', 'Heavy floor loading', 'Roller door'] },
    { id: 'delta-l205', building: 'Delta Labs', buildingKey: 'delta', floor: 2, area: 220, seats: 18, status: 'leased', availableFrom: '2027-06-01', fitout: 'Lab ready', features: ['Shielded room', '3-phase power', 'Clean bench'] },
    { id: 'forge-f08', building: 'Forge', buildingKey: 'forge', floor: 2, area: 45, seats: 6, status: 'available', availableFrom: '2026-12-01', fitout: 'Furnished', features: ['Startup terms', 'Mentor hours', 'Event space'] },
    { id: 'forge-f14', building: 'Forge', buildingKey: 'forge', floor: 3, area: 70, seats: 10, status: 'soon', availableFrom: '2027-01-15', fitout: 'Furnished', features: ['Startup terms', 'Demo room', 'Event space'] },
    { id: 'atlas-0910', building: 'Atlas', buildingKey: 'atlas', floor: 9, area: 260, seats: 38, status: 'leased', availableFrom: '2027-08-01', fitout: 'Fitted out', features: ['River view', 'Server room', 'Dual fibre'] },
  ];

  const jobCategories = { engineering: 'Engineering', business: 'Business', design: 'Design', operations: 'Operations', education: 'Teaching' };
  const J = (id, title, companyId, category, type, level, posted, deadline, summary, duties, requirements) => ({
    id, title, company: companies.find((c) => c.id === companyId).name, companyId, category, type, level, posted, deadline, summary, duties, requirements,
  });
  const jobs = [
    J('mangrove-data-engineer', 'Data Engineer', 'mangrove', 'engineering', 'Full time', 'Mid-level', '2026-11-12', '2026-12-31', 'Build the pipelines that move document data from customers into Mangrove AI’s models.', ['Build and run data pipelines in Python and SQL', 'Monitor data quality and fix failed jobs', 'Work with ML engineers on training data'], ['3+ years with data pipelines', 'Strong SQL', 'English for written work']),
    J('lattice-qa-engineer', 'QA Automation Engineer', 'lattice', 'engineering', 'Full time', 'Mid-level', '2026-11-03', '2026-12-20', 'Automate tests for core banking apps used by millions of customers.', ['Write automated UI and API tests', 'Keep the test suite fast and stable', 'Report and track defects'], ['2+ years of test automation', 'Playwright, Selenium or similar', 'Attention to detail']),
    J('lattice-ba', 'Business Analyst', 'lattice', 'business', 'Full time', 'Senior', '2026-10-28', '2026-12-15', 'Turn bank requirements into clear stories for the delivery team.', ['Run workshops with bank teams', 'Write user stories and acceptance criteria', 'Support testing and launch'], ['4+ years as a BA', 'Banking domain knowledge', 'Fluent English']),
    J('fernwood-ui-artist', 'Game UI Artist', 'fernwood', 'design', 'Full time', 'Mid-level', '2026-11-08', '2026-12-28', 'Design menus, icons and in-game screens for a new PC title.', ['Design game UI and icons', 'Build UI in Unity with developers', 'Keep the style guide up to date'], ['Portfolio of shipped game UI', 'Figma and Photoshop', 'Unity is a plus']),
    J('sable-soc-analyst', 'Security Analyst (SOC)', 'sable', 'engineering', 'Full time', 'Junior', '2026-11-14', '2027-01-10', 'Watch customer networks and respond to alerts on a shift rota.', ['Triage alerts from customer systems', 'Escalate and document incidents', 'Improve detection rules'], ['Networking basics', 'Interest in security', 'Shift work, including nights']),
    J('pivot-embedded', 'Embedded Software Engineer', 'pivot', 'engineering', 'Full time', 'Senior', '2026-10-30', '2026-12-30', 'Write the motor control and safety software for warehouse robots.', ['Develop firmware in C and C++', 'Test on robots in Delta Labs', 'Review safety requirements'], ['5+ years embedded C/C++', 'Real-time systems', 'Robotics is a plus']),
    J('tessera-product-designer', 'Product Designer', 'tessera', 'design', 'Full time', 'Mid-level', '2026-11-10', '2026-12-31', 'Design clinic software that receptionists and doctors use all day.', ['Research with clinic staff', 'Design flows and screens', 'Test designs with users'], ['3+ years product design', 'Strong portfolio', 'Health tech is a plus']),
    J('kite-ops-lead', 'Fleet Operations Lead', 'kite', 'operations', 'Full time', 'Senior', '2026-11-01', '2026-12-18', 'Help delivery customers get value from Kite Routes in their first 90 days.', ['Onboard new fleet customers', 'Train dispatchers', 'Feed customer issues back to product'], ['Logistics experience', 'Comfortable with data', 'Vietnamese and English']),
    J('oriel-account-manager', 'Merchant Account Manager', 'oriel', 'business', 'Full time', 'Mid-level', '2026-11-05', '2026-12-22', 'Look after a book of online merchants and grow their payment volume.', ['Manage 60 merchant accounts', 'Run quarterly reviews', 'Work with risk on onboarding'], ['3+ years account management', 'Payments or e-commerce', 'Good with numbers']),
    J('quill-cloud-instructor', 'Cloud Instructor (part time)', 'quill', 'education', 'Part time', 'Senior', '2026-11-09', '2027-01-15', 'Teach evening courses on cloud infrastructure to working engineers.', ['Teach two evenings a week', 'Prepare labs and exercises', 'Mentor learners'], ['Working cloud experience', 'Clear speaker', 'Certification is a plus']),
    J('lattice-facilities', 'Facilities Coordinator', 'lattice', 'operations', 'Full time', 'Junior', '2026-11-13', '2026-12-26', 'Keep Lattice’s four floors in Atlas running smoothly.', ['Handle office requests', 'Work with Northbank building services', 'Plan moves and fit-outs'], ['Organised and calm', 'Basic Excel', 'Vietnamese and English']),
  ];

  const articleCategories = { news: 'Northbank news', member: 'Member news', event: 'Events', career: 'Careers', forge: 'Forge startups', solution: 'Solutions', industry: 'Industry', investment: 'Investment' };
  const A = (id, cat, date, title, summary, body, opts = {}) => ({ id, cat, date, title, summary, body, featured: !!opts.featured, jobId: opts.jobId || null, image: opts.image || null });
  const articles = [
    A('cobalt-second-hall', 'news', '2026-11-17', 'Cobalt data center adds a second 2 MW hall', 'The new hall doubles rack space in Cobalt and opens to customers in March 2027.', ['Northbank has finished building a second 2 MW hall in the Cobalt data center. The hall adds 220 racks and opens to customers in March 2027.', 'Lantern Cloud and Tidewater Data have reserved the first rows. Remaining racks can be booked through Northbank infrastructure services.', 'Both halls share the same dual fibre routes and the 24/7 security operations center.'], { featured: true, image: 'server-rack' }),
    A('forge-spring-cohort', 'forge', '2026-11-13', 'Forge opens applications for its spring startup cohort', 'Twelve startups will get desks, mentors and a demo day in Echo Hall.', ['Forge, Northbank’s startup center, is taking applications for its spring cohort until 15 January 2027.', 'Selected teams get six months of desks in Forge, weekly mentor hours with member companies and a demo day in Echo Hall.', 'Teams of two to eight people working on software or hardware products can apply.'], { image: 'developer' }),
    A('mangrove-moves-atlas', 'member', '2026-11-04', 'Mangrove AI moves its regional team into Atlas', 'The document AI company takes half of floor 6 and plans to hire 80 people.', ['Mangrove AI has moved its regional engineering team into Atlas, taking half of floor 6.', 'The company plans to hire 80 engineers and data specialists over the next year, starting with the data engineer role now open.'], { jobId: 'mangrove-data-engineer', image: 'open-office' }),
    A('hardware-week', 'event', '2026-10-24', 'Echo Hall hosts the Saigon Hardware Week', 'Three days of talks and demos from 40 hardware companies.', ['Saigon Hardware Week returns to Echo Hall from 4 to 6 December, with talks, demos and a prototyping area run by Volt Circuitry.', 'Entry is free for people working at Northbank member companies.'], { image: 'meeting-room' }),
    A('demo-day-dec', 'event', '2026-10-20', 'Forge demo day: twelve startups on stage', 'The autumn cohort presents to investors and member companies on 2 December.', ['The twelve startups of Forge’s autumn cohort present their products in Echo Hall on 2 December.', 'Investors and member companies can book seats through the events team.'], { image: 'working-session' }),
    A('hiring-fair', 'career', '2026-11-11', 'Hiring fair: 30 member companies, one afternoon', 'Engineering, design and business roles in Grove on 16 December.', ['Thirty member companies are hiring at the Northbank hiring fair in Grove on 16 December.', 'Lattice Systems is among them, with QA and business analyst roles open now.'], { jobId: 'lattice-qa-engineer', image: 'laptop-work' }),
    A('sable-soc-hiring', 'career', '2026-11-14', 'Sable Security is growing its operations room', 'Junior analysts can join a shift team watching customer networks.', ['Sable Security is adding a new shift to its security operations room next to Cobalt.', 'The company trains junior analysts in its first three months.'], { jobId: 'sable-soc-analyst', image: 'city-night' }),
    A('docusift-invoices', 'solution', '2026-10-15', 'DocuSift now reads 40 Vietnamese invoice layouts', 'Finance teams can send invoices straight to their accounting system.', ['Mangrove AI has added templates for 40 common Vietnamese invoice layouts to DocuSift.', 'Juniper Books customers can connect DocuSift in a few clicks.'], { image: 'quiet-desk' }),
    A('river-shuttle', 'news', '2026-10-09', 'River shuttle links Northbank with Thủ Thiêm every 20 minutes', 'A new electric boat service runs at peak hours on weekdays.', ['An electric river shuttle now runs between the Northbank jetty and Thủ Thiêm every 20 minutes at peak hours.', 'Rides are free with a Northbank access card.'], { image: 'district-aerial' }),
    A('incentive-update', 'investment', '2026-09-30', 'What the 2026 incentive changes mean for tech investors', 'A short guide to tax incentives for software, semiconductor and R&D projects.', ['Changes in 2026 widened tax incentives for semiconductor design and R&D projects.', 'Use the eligibility checker on the incentives page for a first view of what may apply to your project.'], { image: 'facade-grid' }),
    A('green-campus', 'news', '2026-09-22', 'Northbank cuts campus energy use by 14%', 'New cooling in Cobalt and rooftop solar on Grove did most of the work.', ['Energy use across the campus fell 14% year on year after new cooling in Cobalt and solar panels on the Grove roof.', 'Monthly readings are published on the open data page.'], { image: 'glass-roofline' }),
    A('semis-talent', 'industry', '2026-09-15', 'Chip design talent: where Vietnam stands', 'Anvil Semiconductor on hiring and training chip designers locally.', ['Anvil Semiconductor’s design center in Delta Labs has grown to 80 engineers in two years.', 'The company trains new graduates for six months before they join project teams.'], { image: 'tower-corner' }),
    A('pivot-test-floor', 'member', '2026-09-08', 'Pivot Robotics opens a 600 m² robot test floor', 'Warehouse robots now run test routes day and night in Delta Labs.', ['Pivot Robotics has opened a 600 m² test floor on the ground level of Delta Labs.', 'The company is hiring embedded engineers for its robot software team.'], { jobId: 'pivot-embedded', image: 'loft-office' }),
    A('design-meetup', 'event', '2026-09-02', 'Product design meetup at Beacon', 'Designers from five member companies share their work every first Thursday.', ['A monthly product design meetup takes place in the Beacon lounge on the first Thursday of each month.', 'Everyone working on campus is welcome.'], { image: 'coworking' }),
  ];

  const resourceCategories = { corporate: 'Northbank', campus: 'Campus', legal: 'Legal', business: 'Templates' };
  const resources = [
    { id: 'northbank-guide', cat: 'corporate', title: 'Northbank guide 2026', format: 'PDF', kind: 'generated', updated: '2026-10-01', desc: 'Campus, buildings, services and how to become a member.' },
    { id: 'campus-map', cat: 'campus', title: 'Campus map', format: 'PDF', kind: 'generated', updated: '2026-09-15', desc: 'Buildings, parking, the river jetty and entrances.' },
    { id: 'fitout-guide', cat: 'campus', title: 'Fit-out guide for tenants', format: 'PDF', kind: 'generated', updated: '2026-08-20', desc: 'What you can change in your space and how to get it approved.' },
    { id: 'office-checklist', cat: 'business', title: 'Office move checklist', format: 'XLSX', kind: 'generated', updated: '2026-10-12', desc: 'Every step from signing the lease to your first day in the office.' },
    { id: 'visit-request', cat: 'business', title: 'Group visit request form', format: 'DOCX', kind: 'generated', updated: '2026-07-03', desc: 'For schools, delegations and groups of more than ten people.' },
    { id: 'event-booking', cat: 'business', title: 'Echo Hall booking form', format: 'DOCX', kind: 'generated', updated: '2026-06-18', desc: 'Book Echo Hall or its meeting rooms for your event.' },
    { id: 'house-rules', cat: 'legal', title: 'Campus house rules', format: 'PDF', kind: 'generated', updated: '2026-05-30', desc: 'Access, deliveries, noise, safety and parking rules.' },
    { id: 'data-policy', cat: 'legal', title: 'Visitor data policy', format: 'PDF', kind: 'generated', updated: '2026-04-11', desc: 'What we record when you visit and how long we keep it.' },
    { id: 'annual-review', cat: 'corporate', title: 'Annual review 2025', format: 'PDF', kind: 'generated', updated: '2026-03-20', desc: 'Members, jobs, energy use and investment over the year.' },
  ];

  /* Open environmental data: monthly readings, Jan–Oct 2026, one value per station and parameter. */
  const datasetGroups = { water: 'Water', air: 'Air', testing: 'Lab tests' };
  const datasets = [
    { id: 'wastewater', group: 'water', title: 'Wastewater treatment', stations: ['Central treatment plant', 'Outfall 1'], params: ['COD', 'BOD5', 'pH', 'TSS'] },
    { id: 'supply-water', group: 'water', title: 'Supply water', stations: ['Central tank', 'Atlas building'], params: ['pH', 'Turbidity', 'Free chlorine'] },
    { id: 'air-campus', group: 'air', title: 'Campus air quality', stations: ['Central park', 'Main gate'], params: ['PM2.5', 'PM10', 'NO2'] },
    { id: 'groundwater', group: 'water', title: 'Groundwater', stations: ['Well G1', 'Well G2'], params: ['pH', 'Total iron'] },
    { id: 'air-river-road', group: 'air', title: 'River Road air', stations: ['River Road sensor'], params: ['PM2.5', 'CO'] },
    { id: 'lake', group: 'water', title: 'Lake water', stations: ['Retention lake'], params: ['Ammonia', 'COD'] },
    { id: 'drinking-water', group: 'testing', title: 'Drinking water tests', stations: ['Building fountains'], params: ['Coliform', 'E. coli'] },
  ];
  const paramSpec = {
    COD: ['mg/L', 30, 12, 150], BOD5: ['mg/L', 14, 6, 50], pH: ['', 7.1, 0.4, 8.5], TSS: ['mg/L', 28, 10, 100], Turbidity: ['NTU', 0.9, 0.5, 2], 'Free chlorine': ['mg/L', 0.5, 0.2, 1],
    'PM2.5': ['µg/m³', 24, 14, 50], PM10: ['µg/m³', 48, 22, 100], NO2: ['µg/m³', 32, 14, 100], 'Total iron': ['mg/L', 2.2, 1.4, 5], CO: ['mg/m³', 4.2, 2.6, 10], Ammonia: ['mg/L', 0.3, 0.2, 0.9], Coliform: ['MPN/100mL', 0.6, 1, 3], 'E. coli': ['MPN/100mL', 0.2, 0.4, 1],
  };
  const months = ['2026-01', '2026-02', '2026-03', '2026-04', '2026-05', '2026-06', '2026-07', '2026-08', '2026-09', '2026-10'];
  let rnd = 20261125; const random = () => (rnd = (rnd * 1103515245 + 12345) % 2147483648) / 2147483648;
  const readings = [];
  datasets.forEach((d) => d.stations.forEach((station) => d.params.forEach((param) => months.forEach((month) => {
    const [unit, base, spread, limit] = paramSpec[param];
    let value = base + (random() - 0.5) * 2 * spread;
    if (random() > 0.93) value = limit * (1.05 + random() * 0.2); /* occasional reading over the limit */
    value = Math.max(0, Math.round(value * 100) / 100);
    readings.push({ dataset: d.id, station, month, param, unit, value, limit });
  }))));

  const incentiveSectors = [
    { id: 'software', label: 'Software and digital products' },
    { id: 'digital-content', label: 'Digital content and games' },
    { id: 'semiconductor-ai', label: 'Semiconductors and AI' },
    { id: 'rnd', label: 'Research and development center' },
    { id: 'hardware', label: 'Electronics and hardware' },
    { id: 'it-services', label: 'IT services and outsourcing' },
    { id: 'data-center', label: 'Data center and cloud' },
    { id: 'training', label: 'Technology training' },
  ];
  const incentiveGroups = [
    { id: 'cit', title: 'Corporate income tax incentives by sector', sectors: ['software', 'digital-content', 'semiconductor-ai', 'rnd'], note: 'Depends on the sector and the project; the tax authority sets the rate and period.' },
    { id: 'import', title: 'Import duty exemption for fixed assets', sectors: ['semiconductor-ai', 'hardware', 'rnd', 'data-center'], note: 'For equipment and materials that cannot be sourced in Vietnam.' },
    { id: 'land', title: 'Reduced land and space rent', sectors: ['semiconductor-ai', 'rnd', 'training'], note: 'Northbank discounts rent for qualifying R&D and training projects.' },
    { id: 'talent', title: 'Support for training local engineers', sectors: ['software', 'semiconductor-ai', 'it-services', 'training'], note: 'Co-funded training through Quill Learning and Brightpath Academy.' },
    { id: 'fast-track', title: 'Fast-track licensing', sectors: ['software', 'digital-content', 'semiconductor-ai', 'rnd', 'hardware', 'it-services', 'data-center', 'training'], note: 'Northbank’s one-stop desk prepares and files licence applications.' },
    { id: 'startup', title: 'Forge startup package', sectors: ['software', 'digital-content', 'hardware'], note: 'Six months of desks, mentors and a demo day for selected startups.' },
  ];

  window.QTSC_SEED = {
    version: '2026-11-25.northbank-1',
    companies, companyCategories, solutions, solutionCategories, units,
    unitStatus: { available: 'Available', soon: 'Available soon', leased: 'Leased' },
    visitSlots: ['08:30', '09:30', '10:30', '14:00', '15:00', '16:00'],
    jobs, jobCategories, articles, articleCategories, resources, resourceCategories, datasets, datasetGroups, readings,
    incentiveSectors, incentiveGroups,
    newsletterTopics: { updates: 'Northbank news', events: 'Events', careers: 'Jobs', legal: 'Rules and policy', investment: 'Investment' },
    initialUser: {
      bookings: [{ id: 'BK-26A1F3', unitId: 'atlas-0705', date: '2026-12-04', time: '09:30', name: 'Linh Tran', email: 'linh.tran@example.com', phone: '0901234567', people: 3, note: 'We would like to see how the floor could be split for an R&D team.', status: 'confirmed', createdAt: '2026-11-10T08:00:00.000Z' }],
      applications: [{ id: 'AP-26B7C2', jobId: 'lattice-qa-engineer', name: 'Linh Tran', email: 'linh.tran@example.com', phone: '0901234567', cvName: 'LinhTran-CV.pdf', letter: 'I would like to work on test automation for banking apps.', status: 'submitted', createdAt: '2026-11-08T03:15:00.000Z' }],
      enquiries: [], demoRequests: [], contacts: [], newsletter: null,
    },
  };
})();
