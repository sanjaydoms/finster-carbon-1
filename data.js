/* Shared content for the KARBN site. Sourced from finstercarbon.com, masterbatcheu.com and
   the supplied brief. Values marked [to be confirmed] are deliberately not invented. */
window.KARBN = (function () {
  const TBC = "[To be confirmed]";

  const FAMILIES = [
    { slug: "carbon-black", num: "01", name: "Carbon Black", grades: "N330 · N550 · N660", desc: "Industrial carbon black engineered for rubber, plastics and other demanding applications. Supplied as powder and in granulated form for dispersion-critical processes." },
    { slug: "masterbatch", num: "02", name: "Masterbatch", grades: "LDPE · LLDPE · PE · ABS", desc: "High-performance black and additive masterbatch for polymer processing — high concentrations of carbon black, typically 15–50%, dispersed in a thermoplastic carrier resin." },
    { slug: "circular-materials", num: "03", name: "Circular Materials", grades: "rCB · TPO · Crumb Rubber", desc: "Recovered materials created from end-of-life tyres and designed for industrial reuse — a lower-carbon-footprint route to reinforcing rubber, plastics and coatings." },
  ];

  const PRODUCTS = [
    {
      slug: "n330", name: "N330", family: "Carbon Black", familySlug: "carbon-black",
      tagline: "Reinforcing Furnace Black",
      desc: "Furnace-grade carbon black for reinforcing rubber compounds. Also specified as the pigment in the group's high-concentration black masterbatch.",
      material: "Carbon Black", polymers: ["Rubber"], apps: ["Rubber", "Automotive", "Industrial"], reqs: ["High Jetness", "Dispersion"],
      spec: "ASTM N330 · reinforcing grade", appLine: "RUBBER · AUTOMOTIVE · MASTERBATCH FEED",
      figures: [{ v: "N330", l: "ASTM DESIGNATION" }, { v: "40%", l: "LOADING IN K-C5400" }],
      rows: [{ k: "Type", v: "Furnace black, ASTM N330" }, { k: "Iodine adsorption", v: TBC }, { k: "DBP absorption", v: TBC }, { k: "Pour density", v: TBC }, { k: "Form", v: TBC }, { k: "Packaging", v: TBC }],
      perf: ["High reinforcement", "High jetness", "Consistent dispersion", "Established rubber-grade specification"],
      applications: ["Tyres", "Tubes", "Conveyor belts", "Moulded rubber goods", "Black masterbatch"],
    },
    {
      slug: "n550", name: "N550", family: "Carbon Black", familySlug: "carbon-black",
      tagline: "Semi-Reinforcing Furnace Black",
      desc: "Semi-reinforcing furnace black for extruded and moulded rubber goods where processing behaviour and dimensional stability are specified.",
      material: "Carbon Black", polymers: ["Rubber"], apps: ["Rubber", "Industrial"], reqs: ["Dispersion", "Opacity"],
      spec: "ASTM N550 · semi-reinforcing", appLine: "RUBBER · EXTRUSION · MOULDED GOODS",
      figures: [{ v: "N550", l: "ASTM DESIGNATION" }],
      rows: [{ k: "Type", v: "Furnace black, ASTM N550" }, { k: "Iodine adsorption", v: TBC }, { k: "DBP absorption", v: TBC }, { k: "Form", v: TBC }, { k: "Packaging", v: TBC }],
      perf: ["Good extrusion behaviour", "Dimensional stability", "Semi-reinforcing structure"],
      applications: ["Extruded profiles", "Hoses", "Moulded goods", "Industrial rubber"],
    },
    {
      slug: "n660", name: "N660", family: "Carbon Black", familySlug: "carbon-black",
      tagline: "Semi-Reinforcing Furnace Black",
      desc: "Semi-reinforcing grade used where lower structure and easier processing are required in general rubber compounds.",
      material: "Carbon Black", polymers: ["Rubber"], apps: ["Rubber", "Industrial"], reqs: ["Dispersion"],
      spec: "ASTM N660 · low structure", appLine: "RUBBER · PROFILES · GENERAL COMPOUNDS",
      figures: [{ v: "N660", l: "ASTM DESIGNATION" }],
      rows: [{ k: "Type", v: "Furnace black, ASTM N660" }, { k: "Iodine adsorption", v: TBC }, { k: "DBP absorption", v: TBC }, { k: "Form", v: TBC }, { k: "Packaging", v: TBC }],
      perf: ["Easy processing", "Low structure", "Cost-efficient loading"],
      applications: ["General rubber compounds", "Profiles", "Mats and sheeting"],
    },
    {
      slug: "industrial-carbon-black", name: "Industrial Carbon Black", family: "Carbon Black", familySlug: "carbon-black",
      tagline: "Application-Specified Grades",
      desc: "General industrial carbon black supplied against the application requirement rather than a fixed grade list.",
      material: "Carbon Black", polymers: ["Rubber", "PE"], apps: ["Industrial", "Rubber"], reqs: ["Opacity"],
      spec: "Grades to be confirmed", appLine: "INDUSTRIAL FORMULATION",
      figures: [],
      rows: [{ k: "Available grades", v: TBC }, { k: "Form", v: TBC }, { k: "Packaging", v: TBC }],
      perf: ["Specified to the application", "Supplied against technical requirement"],
      applications: ["Industrial formulation", "Compounding", "Pigmentation"],
    },
    {
      slug: "black-carbon-powder", name: "Black Carbon Powder", family: "Carbon Black", familySlug: "carbon-black",
      tagline: "Powder Carbon Black",
      desc: "Powder carbon black listed in the group's manufactured and exported product range.",
      material: "Carbon Black", polymers: ["PE", "Rubber"], apps: ["Industrial", "Rubber"], reqs: ["Opacity", "High Jetness"],
      spec: "Powder form", appLine: "PIGMENT · FILLER · COMPOUNDING",
      figures: [],
      rows: [{ k: "Form", v: "Powder" }, { k: "Grade", v: TBC }, { k: "Packaging", v: TBC }],
      perf: ["High jetness", "Opacity", "General-purpose filler"],
      applications: ["Compounding", "Pigmentation", "Industrial products"],
    },
    {
      slug: "k-c5400", name: "K-C5400", family: "Masterbatch", familySlug: "masterbatch",
      tagline: "Premium Black Masterbatch",
      desc: "High-concentration black masterbatch engineered for consistent dispersion and demanding polymer-processing applications.",
      material: "Masterbatch", polymers: ["LLDPE", "PE"], apps: ["Film", "Injection Moulding", "Blow Moulding"], reqs: ["High Jetness", "Dispersion", "Thermal Stability", "UV Stability", "Polymer Compatibility"],
      spec: "40% carbon · N330 · virgin LLDPE carrier", appLine: "FILM · INJECTION · BLOW · ROTO MOULDING",
      figures: [{ v: "40%", l: "CARBON CONCENTRATION" }, { v: "300°C", l: "HEAT STABILITY" }, { v: "3–5", l: "MFI, g/10 MIN" }, { v: "1.20–1.25", l: "DENSITY, g/cc" }],
      rows: [{ k: "Carrier", v: "Virgin LLDPE" }, { k: "Carbon black", v: "N330" }, { k: "Carbon content", v: "40%" }, { k: "MFI", v: "3–5 g/10 min" }, { k: "Density", v: "1.20–1.25 g/cc" }, { k: "Heat stability", v: "300°C" }, { k: "Form", v: "Granules" }, { k: "Packaging", v: "25 kg" }],
      perf: ["High jetness", "Consistent dispersion", "Thermal stability", "UV resistance", "Polymer compatibility"],
      applications: ["Film", "Injection moulding", "Blow moulding", "Roto moulding"],
      note: "Specification supplied in the project brief rather than read from a live source page. Confirm against the current technical data sheet before publication.",
    },
    {
      slug: "lldpe-masterbatch", name: "LLDPE Masterbatch", family: "Masterbatch", familySlug: "masterbatch",
      tagline: "Black Concentrate, LLDPE Carrier",
      desc: "Black concentrate on an LLDPE carrier for film and general polymer processing.",
      material: "Masterbatch", polymers: ["LLDPE"], apps: ["Film", "Injection Moulding", "Pipes"], reqs: ["Dispersion", "Polymer Compatibility"],
      spec: "15–50% carbon black in carrier resin", appLine: "FILM · PIPE · INJECTION",
      figures: [{ v: "15–50%", l: "CARBON BLACK LOADING" }],
      rows: [{ k: "Carrier", v: "LLDPE" }, { k: "Carbon black loading", v: "15–50% (range across black masterbatch)" }, { k: "Carbon black grade", v: TBC }, { k: "MFI", v: TBC }, { k: "Form", v: TBC }, { k: "Packaging", v: TBC }],
      perf: ["Consistent dispersion", "Polymer compatibility", "Opacity"],
      applications: ["Blown and cast film", "Pipe", "Injection moulding"],
    },
    {
      slug: "ldpe-masterbatch", name: "LDPE Masterbatch", family: "Masterbatch", familySlug: "masterbatch",
      tagline: "Black Concentrate, LDPE Carrier",
      desc: "Black concentrate on an LDPE carrier, suited to blown film and blow moulding.",
      material: "Masterbatch", polymers: ["LDPE"], apps: ["Film", "Blow Moulding"], reqs: ["Dispersion", "Opacity"],
      spec: "15–50% carbon black in carrier resin", appLine: "FILM · BLOW MOULDING",
      figures: [{ v: "15–50%", l: "CARBON BLACK LOADING" }],
      rows: [{ k: "Carrier", v: "LDPE" }, { k: "Carbon black loading", v: "15–50% (range across black masterbatch)" }, { k: "MFI", v: TBC }, { k: "Form", v: TBC }, { k: "Packaging", v: TBC }],
      perf: ["Opacity", "Consistent dispersion", "Film-line stability"],
      applications: ["Blown film", "Blow moulding", "Liners"],
    },
    {
      slug: "virgin-lldpe-masterbatch", name: "Virgin LLDPE Masterbatch", family: "Masterbatch", familySlug: "masterbatch",
      tagline: "Virgin-Carrier Black Concentrate",
      desc: "Fully virgin-carrier concentrate for applications where recycled carrier content is not permitted.",
      material: "Masterbatch", polymers: ["LLDPE"], apps: ["Film", "Injection Moulding"], reqs: ["High Jetness", "Dispersion", "Polymer Compatibility"],
      spec: "Virgin carrier resin", appLine: "FILM · TECHNICAL PARTS",
      figures: [{ v: "Virgin", l: "CARRIER RESIN" }],
      rows: [{ k: "Carrier", v: "Virgin LLDPE" }, { k: "Carbon black loading", v: TBC }, { k: "MFI", v: TBC }, { k: "Form", v: TBC }, { k: "Packaging", v: TBC }],
      perf: ["High jetness", "Consistent dispersion", "No recycled carrier content"],
      applications: ["Technical film", "Injection-moulded parts"],
    },
    {
      slug: "plastic-black-masterbatch", name: "Plastic Black Masterbatch", family: "Masterbatch", familySlug: "masterbatch",
      tagline: "General Plastics Black Concentrate",
      desc: "Black concentrate for general plastics processing across several base polymers.",
      material: "Masterbatch", polymers: ["PE", "ABS", "PVC"], apps: ["Injection Moulding", "Industrial"], reqs: ["Opacity", "Polymer Compatibility"],
      spec: "Loading to be confirmed", appLine: "INJECTION · GENERAL PLASTICS",
      figures: [],
      rows: [{ k: "Carrier", v: TBC }, { k: "Compatible polymers", v: "PE · ABS · PVC" }, { k: "Carbon black loading", v: TBC }, { k: "Form", v: TBC }, { k: "Packaging", v: TBC }],
      perf: ["Opacity", "Broad polymer compatibility"],
      applications: ["Injection moulding", "General plastics", "Industrial parts"],
    },
    {
      slug: "uv-stabilizer-masterbatch", name: "UV Stabilizer Masterbatch", family: "Additives", familySlug: "masterbatch",
      tagline: "Additive Masterbatch",
      desc: "Additive concentrate for polymer applications with extended outdoor exposure.",
      material: "Additives", polymers: ["LLDPE", "LDPE", "PE"], apps: ["Agriculture", "Pipes", "Film"], reqs: ["UV Stability", "Thermal Stability"],
      spec: "Additive package to be confirmed", appLine: "AGRICULTURE FILM · PIPE · OUTDOOR",
      figures: [],
      rows: [{ k: "Carrier", v: TBC }, { k: "Additive package", v: TBC }, { k: "Recommended dosage", v: TBC }, { k: "Form", v: TBC }, { k: "Packaging", v: TBC }],
      perf: ["UV resistance through long exposure cycles", "Thermal stability"],
      applications: ["Mulch film", "Greenhouse film", "Pipe", "Outdoor mouldings"],
    },
    {
      slug: "recovered-carbon-black", name: "Recovered Carbon Black", family: "Circular Materials", familySlug: "circular-materials",
      tagline: "rCB — Recovered Carbon Black",
      desc: "Recovered carbon black is a sustainable output from the pyrolysis of end-of-life tyres. It serves as a greener alternative to conventional petroleum-based carbon black, offering a lower carbon footprint for reinforcing rubber, plastics and coatings.",
      material: "Recovered Carbon Black", polymers: ["Rubber", "PE"], apps: ["Rubber", "Automotive", "Industrial"], reqs: ["Dispersion", "Recycled Content"],
      spec: "ISO 9001:2015 · consistent particle size distribution", appLine: "TYRES · CONVEYOR BELTS · SEALS · COATINGS",
      figures: [{ v: "85%", l: "GHG REDUCTION VS. VIRGIN CB*" }, { v: "ISO", l: "9001:2015 CERTIFIED" }],
      rows: [{ k: "Source", v: "Pyrolysis of end-of-life tyres" }, { k: "Function", v: "Semi-reinforcing filler" }, { k: "Particle size distribution", v: "Consistent (as published)" }, { k: "Quality system", v: "ISO 9001:2015" }, { k: "Ash content", v: TBC }, { k: "Form", v: TBC }, { k: "Packaging", v: TBC }],
      perf: ["Reduces carbon footprint", "Cost-effective material solution", "Enhances material strength and durability", "Excellent dispersion properties", "Contributes to circular economy initiatives"],
      applications: ["Tyres", "Tubes", "Conveyor belts", "Rubber fenders", "Oil seals", "Gaskets", "Rubber profiles", "Moulded & extruded rubber products"],
      note: "The 85% GHG reduction is a company-stated figure published on finstercarbon.com. Attach the supporting methodology or third-party assessment before publication.",
    },
    {
      slug: "tyre-pyrolysis-oil", name: "Tyre Pyrolysis Oil", family: "Circular Materials", familySlug: "circular-materials",
      tagline: "TPO — Tyre Pyrolysis Oil",
      desc: "Tyre pyrolysis oil is a high-energy liquid fuel derived from the thermal decomposition of waste tyres. It serves as a sustainable, cost-effective alternative to conventional fossil fuels while maintaining high calorific efficiency.",
      material: "Pyrolysis Oil", polymers: ["Rubber"], apps: ["Industrial"], reqs: ["Recycled Content"],
      spec: "36,000 t annual production*", appLine: "FURNACE FUEL · CARBON BLACK FEED · MARINE · REFINERY",
      figures: [{ v: "36,000 t", l: "ANNUAL PRODUCTION*" }],
      rows: [{ k: "Source", v: "Thermal decomposition of waste tyres" }, { k: "Annual production", v: "36,000 t (company-stated)" }, { k: "Calorific value", v: TBC }, { k: "Sulphur content", v: TBC }, { k: "Density", v: TBC }, { k: "Supply mode", v: TBC }],
      perf: ["High-energy industrial fuel", "Recovered from rubber waste", "Alternative to conventional fossil fuels"],
      applications: ["Industrial furnace fuel", "Feedstock for carbon black", "Marine fuel", "Refinery feedstock", "Petrochemical complexes"],
      note: "Production figure as published by the company; described on the source site as the single largest vertically integrated TPO facility in the world. Not independently verified here.",
    },
    {
      slug: "crumb-rubber", name: "Crumb Rubber", family: "Circular Materials", familySlug: "circular-materials",
      tagline: "Graded Rubber Granulate",
      desc: "Graded rubber granulate recovered from mechanical processing of end-of-life tyres, for compounding and surfacing applications.",
      material: "Crumb Rubber", polymers: ["Rubber"], apps: ["Rubber", "Industrial"], reqs: ["Recycled Content"],
      spec: "Mesh sizes to be confirmed", appLine: "COMPOUNDING · SURFACING · MOULDED GOODS",
      figures: [],
      rows: [{ k: "Source", v: "Mechanical processing of end-of-life tyres" }, { k: "Mesh sizes", v: TBC }, { k: "Steel / fibre content", v: TBC }, { k: "Packaging", v: TBC }],
      perf: ["Recycled content", "Graded granulate", "Diverts tyres from landfill"],
      applications: ["Rubber compounding", "Surfacing", "Moulded goods"],
    },
    {
      slug: "recovered-steel", name: "Recovered Steel", family: "Circular Materials", familySlug: "circular-materials",
      tagline: "Recovered Tyre Steel",
      desc: "Steel recovered during tyre processing. Not listed in the published product range — confirm availability and specification before publication.",
      material: "Recovered Carbon Black", polymers: ["Rubber"], apps: ["Industrial"], reqs: ["Recycled Content"],
      spec: "Stream to be confirmed", appLine: "SCRAP METAL RECOVERY",
      figures: [],
      rows: [{ k: "Source", v: "Tyre bead and belt separation" }, { k: "Availability", v: TBC }, { k: "Specification", v: TBC }],
      perf: ["Recycled content"],
      applications: ["Steel recycling"],
      note: "This stream appears in the project brief but not in the published product listings on either source site.",
    },
  ];

  const APPS = [
    { slug: "plastics", name: "Plastics", desc: "Black masterbatch and carbon materials engineered for consistent dispersion, opacity, UV protection and polymer compatibility across extrusion and moulding lines.", challenge: "Uneven dispersion shows up as specks, streaks and inconsistent colour, and drives up scrap on high-output lines. Loading has to hit opacity targets without disturbing melt behaviour.", products: ["K-C5400", "LLDPE Masterbatch", "LDPE Masterbatch", "UV Stabilizer Masterbatch"], uses: ["Film", "Injection", "Blow moulding", "Roto moulding", "Sheet"], props: ["Dispersion", "Opacity", "Polymer compatibility", "Thermal stability"], process: "Extrusion · injection · blow · roto moulding", cta: "Explore Plastics Applications" },
    { slug: "rubber", name: "Rubber", desc: "Carbon black and recovered carbon black as reinforcing and semi-reinforcing fillers, improving tensile strength, abrasion resistance and overall durability in rubber compounds.", challenge: "Compounds must hold mechanical performance while filler cost and carbon footprint come down. Blending recovered grades with virgin black has to happen without losing consistency.", products: ["N330", "N550", "N660", "Recovered Carbon Black", "Crumb Rubber"], uses: ["Tubes", "Conveyor belts", "Rubber fenders", "Oil seals", "Gaskets", "Rubber profiles", "Moulded & extruded goods"], props: ["Tensile strength", "Abrasion resistance", "UV resistance", "Durability"], process: "Mixing · extrusion · compression and injection moulding", cta: "Explore Rubber Applications" },
    { slug: "automotive", name: "Automotive", desc: "Materials for rubber components and automotive plastics where colour consistency, thermal stability and UV performance are specified.", challenge: "Tier supply means audited consistency batch to batch, with documentation to match. Parts see heat, light and long service life.", products: ["K-C5400", "N330", "Recovered Carbon Black"], uses: ["Sealing systems", "Under-bonnet parts", "Interior components"], props: ["Thermal stability", "UV resistance", "Colour consistency"], process: "Injection moulding · extrusion · rubber moulding", cta: "Explore Automotive Applications" },
    { slug: "pipes", name: "Pipes & Infrastructure", desc: "Black masterbatch and UV-stabilised formulations for durable polymer applications with long outdoor service life.", challenge: "Buried and exposed pipe is specified for decades of service. Carbon black content and dispersion are what carry UV protection over that life.", products: ["LLDPE Masterbatch", "UV Stabilizer Masterbatch", "N330"], uses: ["Pressure pipe", "Conduit", "Ducting"], props: ["UV stability", "Dispersion", "Long-term durability"], process: "Pipe extrusion", cta: "Explore Pipe Applications" },
    { slug: "films", name: "Films", desc: "High-jetness, well-dispersed black concentrates for thin-gauge film where gel count and unmelts matter.", challenge: "At low gauge, a single unmelt becomes a hole. Concentrates need clean filtration behaviour and predictable let-down.", products: ["LDPE Masterbatch", "LLDPE Masterbatch", "Virgin LLDPE Masterbatch"], uses: ["Blown film", "Cast film", "Liners", "Lamination"], props: ["High jetness", "Dispersion", "Low gel count"], process: "Blown and cast film extrusion", cta: "Explore Film Applications" },
    { slug: "agriculture", name: "Agriculture", desc: "Film, pipe and other agricultural polymer applications requiring UV resistance through long exposure cycles.", challenge: "Films and irrigation lines sit in direct sun for full seasons. Stabiliser package and loading determine whether they last one season or several.", products: ["UV Stabilizer Masterbatch", "LLDPE Masterbatch"], uses: ["Mulch film", "Greenhouse film", "Drip irrigation"], props: ["UV stability", "Weathering resistance"], process: "Film extrusion · pipe extrusion", cta: "Explore Agriculture Applications" },
    { slug: "tyres", name: "Tyres", desc: "Carbon black and recovered carbon black for tyre compounds, with crumb rubber and pyrolysis oil closing the loop back to tyre manufacturing.", challenge: "Recycled content targets are rising while performance requirements stay fixed. The group's own fleet collects the scrap tyres that feed the recovery route.", products: ["N330", "Recovered Carbon Black", "Crumb Rubber", "Tyre Pyrolysis Oil"], uses: ["Tyres", "Retreading", "Compound blending"], props: ["Reinforcement", "Abrasion resistance", "Recycled content"], process: "Mixing · building · curing", cta: "Explore Tyre Applications" },
    { slug: "coatings", name: "Paints & Coatings", desc: "Carbon-based pigments and recovered carbon black for coatings and industrial formulations.", challenge: "Jetness and tint strength have to be repeatable across batches, with dispersion stable through the let-down.", products: ["Black Carbon Powder", "Recovered Carbon Black", "Industrial Carbon Black"], uses: ["Industrial coatings", "Primers", "Inks"], props: ["Jetness", "Tint strength", "Dispersion"], process: "Milling · dispersion · let-down", cta: "Explore Coatings Applications" },
    { slug: "industrial", name: "Industrial Applications", desc: "Pyrolysis oil as an industrial energy and feedstock route, alongside carbon materials for general industrial formulation.", challenge: "Energy-intensive plants want a lower-cost, lower-footprint fuel that still delivers calorific efficiency, with reliable volume.", products: ["Tyre Pyrolysis Oil", "Industrial Carbon Black", "Crumb Rubber"], uses: ["Industrial furnace fuel", "Feedstock for carbon black", "Marine fuel", "Refinery feedstock", "Petrochemical complexes"], props: ["Calorific efficiency", "Supply continuity", "Recycled content"], process: "Furnace firing · refinery feed", cta: "Explore Industrial Applications" },
  ];

  const STEPS = [
    { num: "01", title: "End-of-life tyres", body: "Scrap tyres enter the recovery network through the group's own collection fleet." },
    { num: "02", title: "Collection & sorting", body: "Tyres are graded and separated by construction and condition before processing." },
    { num: "03", title: "Mechanical processing", body: "Shredding and granulation prepare feedstock and produce crumb rubber." },
    { num: "04", title: "Pyrolysis", body: "Thermal decomposition in the absence of oxygen separates the material streams." },
    { num: "05", title: "Recovered materials", body: "Recovered carbon black, pyrolysis oil and other streams are drawn off and refined." },
    { num: "06", title: "Industrial applications", body: "Materials return to rubber, plastics and masterbatch manufacturing." },
  ];

  const STREAMS = [
    { code: "rCB", name: "Recovered Carbon Black", note: "Semi-reinforcing filler for rubber, plastics, paints and coatings. Consistent particle size distribution." },
    { code: "TPO", name: "Tyre Pyrolysis Oil", note: "High-energy liquid fuel and refinery / carbon black feedstock." },
    { code: "CR", name: "Crumb Rubber", note: "Graded rubber granulate for compounding and surfacing applications." },
    { code: "Fe", name: "Recovered Steel", note: "[Stream and specification to be confirmed — not listed in published product range.]" },
    { code: "Gas", name: "Pyrolysis Gas", note: "[Stream to be confirmed — process gas utilisation not published.]" },
  ];

  const FACETS = [
    { key: "material", label: "MATERIAL", options: ["Carbon Black", "Masterbatch", "Additives", "Recovered Carbon Black", "Crumb Rubber", "Pyrolysis Oil"] },
    { key: "polymer", label: "POLYMER / BASE", options: ["LDPE", "LLDPE", "PE", "ABS", "PVC", "Rubber"] },
    { key: "application", label: "APPLICATION", options: ["Film", "Injection Moulding", "Blow Moulding", "Pipes", "Automotive", "Agriculture", "Rubber", "Industrial"] },
    { key: "requirement", label: "PERFORMANCE REQUIREMENT", options: ["High Jetness", "UV Stability", "Dispersion", "Thermal Stability", "Opacity", "Polymer Compatibility", "Recycled Content"] },
  ];

  const FIELD_DEFS = [
    { key: "name", label: "NAME", placeholder: "Full name" },
    { key: "company", label: "COMPANY", placeholder: "Company name" },
    { key: "email", label: "EMAIL", placeholder: "you@company.com" },
    { key: "phone", label: "PHONE", placeholder: "+91" },
    { key: "country", label: "COUNTRY", placeholder: "Country" },
    { key: "industry", label: "INDUSTRY", placeholder: "e.g. Films" },
    { key: "product", label: "PRODUCT OF INTEREST", placeholder: "e.g. K-C5400" },
    { key: "polymer", label: "POLYMER / MATERIAL", placeholder: "e.g. LLDPE" },
    { key: "volume", label: "ANNUAL REQUIREMENT", placeholder: "e.g. 240 t" },
  ];

  const INTENTS = ["Request a Sample", "Technical Information", "Talk to an Expert", "Request a Quote"];

  const IMAGES = {
    "n330": "images/n330.png",
    "n550": "images/n550.png",
    "n660": "images/n660.png",
    "industrial-carbon-black": "images/industrial-carbon-black.png",
    "black-carbon-powder": "images/industrial-carbon-black.png",
    "k-c5400": "images/specialty-masterbatch.png",
    "lldpe-masterbatch": "images/lldpe-black-masterbatch.png",
    "ldpe-masterbatch": "images/ldpe-black-masterbatch.png",
    "virgin-lldpe-masterbatch": "images/virgin-lldpe-masterbatch.png",
    "plastic-black-masterbatch": "images/specialty-masterbatch.png",
    "uv-stabilizer-masterbatch": "images/additive-masterbatch.png",
    "recovered-carbon-black": "images/recovered-carbon-black.png",
    "tyre-pyrolysis-oil": "images/tyre-pyrolysis-oil.png",
    "crumb-rubber": "images/crumb-rubber.png",
    "recovered-steel": "images/recovered-steel.png",
  };

  const APP_IMAGES = {
    plastics: "images/app-films-packaging.png",
    rubber: "images/app-rubber.png",
    automotive: "images/app-automotive.png",
    pipes: "images/app-pipes-infrastructure.png",
    films: "images/app-films-packaging.png",
    agriculture: "images/app-agriculture.png",
    tyres: "images/app-rubber.png",
    coatings: "images/app-industrial-coatings.png",
    industrial: "images/app-industrial-coatings.png",
  };

  const FAMILY_IMAGES = {
    "carbon-black": "images/n330.png",
    "masterbatch": "images/lldpe-black-masterbatch.png",
    "circular-materials": "images/crumb-rubber.png",
  };

  const PROCESS_IMAGES = [
    "images/tech-01-collection.png",
    "images/tech-02-preparation.png",
    "images/tech-03-pyrolysis.png",
    "images/tech-04-recovery.png",
    "images/tech-05-refinement.png",
    "images/tech-06-new-products.png",
  ];

  function filterProducts(f) {
    return PRODUCTS.filter(p =>
      (!f.material.length || f.material.includes(p.material)) &&
      (!f.polymer.length || f.polymer.some(v => p.polymers.includes(v))) &&
      (!f.application.length || f.application.some(v => p.apps.includes(v))) &&
      (!f.requirement.length || f.requirement.some(v => p.reqs.includes(v)))
    );
  }

  function bySlug(slug) { return PRODUCTS.find(p => p.slug === slug); }

  return { TBC, FAMILIES, PRODUCTS, APPS, STEPS, STREAMS, FACETS, FIELD_DEFS, INTENTS, IMAGES, APP_IMAGES, FAMILY_IMAGES, PROCESS_IMAGES, filterProducts, bySlug };
})();
