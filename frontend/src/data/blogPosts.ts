export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  headerImage: string;
  excerpt: string;
  content: string;
  author: string;
  tags: string[];
  publishedAt: string;
  readTime: number; // minutes
};

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "10 Viktiga Skattetips för Privatpersoner 2024",
    slug: "10-viktiga-skattetips-privatpersoner-2024",
    headerImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    excerpt: "Upptäck de mest effektiva sätten att optimera din skattesituation som privatperson. Från avdrag till investeringar - här är allt du behöver veta för att minska din skattebörda lagligt.",
    content: `
      <h2>Inledning</h2>
      <p>Som privatperson i Sverige finns det många möjligheter att optimera din skattesituation. Genom att förstå regelverket och planera smart kan du spara tusentals kronor varje år. Här presenterar vi de 10 viktigaste skattetipsen för 2024.</p>

      <h2>1. Utnyttja alla möjliga avdrag</h2>
      <p>Se till att du drar av alla kostnader du har rätt till. Det kan handla om:</p>
      <ul>
        <li>Resor till och från arbetet</li>
        <li>Arbetskläder och verktyg</li>
        <li>Hemarbete och hemkontor</li>
        <li>Fackföreningsavgifter</li>
      </ul>

      <h2>2. Maximera dina pensionssparanden</h2>
      <p>Genom att sätta in maximalt belopp på ditt tjänstepensionssparande kan du få betydande skattefördelar. För 2024 är taket 106 500 kronor för pensionssparande med skatteuppskjutning.</p>

      <h2>3. Investera i ISK (Investeringssparkonto)</h2>
      <p>ISK är ett skatteeffektivt sätt att spara och investera. Du betalar endast schablonkatt baserat på kontots värde, inte på din faktiska avkastning.</p>

      <h2>4. Planera dina kapitalförluster</h2>
      <p>Om du har aktier eller fonder som gått ner i värde, överväg att realisera förlusterna för att kunna dra av dem mot framtida kapitalvinster.</p>

      <h2>5. Utnyttja gåvoreglerna</h2>
      <p>Du kan ge upp till 25 000 kronor per år till varje barn utan att det blir skattepliktigt för mottagaren. Detta är ett effektivt sätt att överföra förmögenhet.</p>

      <h2>6. Tänk på ROT- och RUT-avdragen</h2>
      <p>Dessa avdrag kan ge dig upp till 50% rabatt på vissa tjänster:</p>
      <ul>
        <li>ROT-avdrag: Reparation, om- och tillbyggnad</li>
        <li>RUT-avdrag: Rengöring, underhåll och trädgård</li>
      </ul>

      <h2>7. Optimera ditt sparande i kapitalförsäkring</h2>
      <p>Kapitalförsäkring kan vara skatteeffektiv för långsiktigt sparande, särskilt om du ligger i högsta marginalskattesatsen.</p>

      <h2>8. Planera för pension och sjukpenning</h2>
      <p>Kom ihåg att även pension och sjukpenning är skattepliktiga. Planera för detta i din ekonomi.</p>

      <h2>9. Håll koll på nya regler</h2>
      <p>Skattereglerna ändras kontinuerligt. Håll dig uppdaterad genom att följa Skatteverkets kommunikation och överväg att anlita en skatterådgivare.</p>

      <h2>10. Dokumentera allt</h2>
      <p>Spara alla kvitton och dokument som kan vara relevanta för din deklaration. Digital dokumentation gör det enkelt att hålla ordning.</p>

      <h2>Sammanfattning</h2>
      <p>Genom att följa dessa tips kan du optimera din skattesituation och behålla mer av dina hårt förtjänade pengar. Kom ihåg att skattereglerna är komplexa, så tveka inte att söka professionell hjälp när det behövs.</p>

      <p><strong>Viktigt:</strong> Denna information är allmän rådgivning och ersätter inte personlig skatterådgivning. Kontakta alltid en kvalificerad skatterådgivare för råd som är specifika för din situation.</p>
    `,
    author: "Skattehjälpen Team",
    tags: ["skattetips", "privatskatt", "avdrag", "deklaration", "ekonomi"],
    publishedAt: "2024-01-15",
    readTime: 8,
  },
  {
    id: "2", 
    title: "Så Fungerar ROT- och RUT-avdragen 2024",
    slug: "rot-rut-avdrag-guide-2024",
    headerImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    excerpt: "En komplett guide till ROT- och RUT-avdragen. Lär dig exakt vilka tjänster som berättigar till avdrag, hur mycket du kan spara och hur du ansöker på rätt sätt.",
    content: `
      <h2>Vad är ROT- och RUT-avdrag?</h2>
      <p>ROT- och RUT-avdragen är skattesubventioner som gör det billigare att anlita hantverkare och hushållsnära tjänster. Du får en direktreduktion av din skatt motsvarande 50% av arbetskostnaden.</p>

      <h2>ROT-avdrag - Reparation, Om- och Tillbyggnad</h2>
      <p>ROT-avdrag gäller för arbeten på din bostad och närområde. Maximalt avdrag per person och år är 50 000 kronor.</p>

      <h3>Vad ingår i ROT-avdrag?</h3>
      <ul>
        <li>Målningsarbeten</li>
        <li>Tapetsering</li>
        <li>Golvläggning</li>
        <li>Installation av kök och badrum</li>
        <li>Elarbeten</li>
        <li>VVS-arbeten</li>
        <li>Takarbeten</li>
        <li>Murning och kakelläggning</li>
      </ul>

      <h2>RUT-avdrag - Rengöring, Underhåll och Trädgård</h2>
      <p>RUT-avdrag gäller för hushållsnära tjänster. Maximalt avdrag per person och år är 75 000 kronor.</p>

      <h3>Vad ingår i RUT-avdrag?</h3>
      <ul>
        <li>Städning</li>
        <li>Fönsterputsning</li>
        <li>Trädgårdsarbete</li>
        <li>Snöskottning</li>
        <li>Barnpassning i hemmet</li>
        <li>Matlagning</li>
        <li>Klädvård (strykning, etc.)</li>
        <li>Flyttjänster</li>
      </ul>

      <h2>Så här fungerar avdraget</h2>
      <p>Du betalar endast 50% av arbetskostnaden direkt till företaget. Företaget fakturerar sedan Skatteverket för resterande 50%. Detta kallas för direktavdrag.</p>

      <h3>Exempel på ROT-avdrag:</h3>
      <p>Du anlitar en målare som tar 20 000 kronor för jobbet (inklusive moms). Arbetskostnaden är 16 000 kronor efter avdrag för material.</p>
      <ul>
        <li>Du betalar: 20 000 - (16 000 × 50%) = 12 000 kronor</li>
        <li>Du sparar: 8 000 kronor</li>
      </ul>

      <h2>Viktiga regler att komma ihåg</h2>

      <h3>För ROT-avdrag:</h3>
      <ul>
        <li>Arbetet måste utföras av ett registrerat F-skattesedels-företag</li>
        <li>Du måste äga eller ha bostadsrätt till bostaden</li>
        <li>Bostaden måste vara färdigställd</li>
        <li>Endast arbetskostnaden berättigar till avdrag, inte material</li>
      </ul>

      <h3>För RUT-avdrag:</h3>
      <ul>
        <li>Tjänsten måste utföras i eller i anslutning till din bostad</li>
        <li>Du måste vara över 18 år</li>
        <li>Företaget måste vara registrerat för F-skatt</li>
        <li>Arbetet får inte vara del av näringsverksamhet</li>
      </ul>

      <h2>Så ansöker du</h2>
      <p>Oftast sköter företaget allt åt dig genom direktavdrag. Du behöver då endast:</p>
      <ol>
        <li>Ge företaget ditt personnummer</li>
        <li>Kontrollera att företaget är registrerat</li>
        <li>Behålla kvittot som bekräftelse</li>
      </ol>

      <h2>Vanliga misstag att undvika</h2>
      <ul>
        <li>Glöm inte att kontrollera att företaget har F-skattesedel</li>
        <li>Spara alla kvitton - du kan behöva dem för kontrollen</li>
        <li>Kom ihåg att maxbeloppen gäller per person, makar kan båda utnyttja sina avdrag</li>
        <li>Blanda inte ihop ROT och RUT - olika tjänster ger olika avdrag</li>
      </ul>

      <h2>Sammanfattning</h2>
      <p>ROT- och RUT-avdragen är fantastiska möjligheter att spara pengar på nödvändiga hem- och hushållstjänster. Genom att förstå reglerna och planera smart kan du spara upp till 62 500 kronor per person och år.</p>
    `,
    author: "Skattehjälpen Team", 
    tags: ["rot-avdrag", "rut-avdrag", "hemtjänster", "hantverkare", "avdrag"],
    publishedAt: "2024-01-20",
    readTime: 6,
  },
  {
    id: "3",
    title: "Deklarationstips för Småföretagare 2024",
    slug: "deklarationstips-smaforetagare-2024", 
    headerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    excerpt: "Som småföretagare har du särskilda möjligheter och utmaningar i deklarationen. Här guide ger dig de viktigaste tipsen för att maximera dina avdrag och undvika vanliga misstag.",
    content: `
      <h2>Introduktion</h2>
      <p>Som småföretagare i Sverige har du många möjligheter att optimera din skattesituation, men också större ansvar för korrekt redovisning. Här går vi igenom de viktigaste punkterna för din deklaration 2024.</p>

      <h2>1. Håll ordning på bokföringen året runt</h2>
      <p>Den viktigaste grunden för en smidig deklaration är att ha ordning på bokföringen från början:</p>
      <ul>
        <li>Använd ett bokföringsprogram anpassat för små företag</li>
        <li>Scanna och spara alla kvitton digitalt</li>
        <li>Gör månadsvis avstämningar</li>
        <li>Håll företagets och dina privata utgifter åtskilda</li>
      </ul>

      <h2>2. Vanliga avdrag för småföretagare</h2>

      <h3>Hemkontor</h3>
      <p>Om du arbetar hemifrån kan du dra av kostnader för:</p>
      <ul>
        <li>Andel av hyra/räntekostnader</li>
        <li>El och uppvärmning</li>
        <li>Hemförsäkring</li>
        <li>Rengöring av arbetsrummet</li>
      </ul>

      <h3>Resor och fordon</h3>
      <ul>
        <li>Resor i tjänsten (18.50 kr/mil för egen bil)</li>
        <li>Parkering och bensin</li>
        <li>Kollektivtrafik för affärsresor</li>
        <li>Representation i samband med resor</li>
      </ul>

      <h3>Utrustning och verktyg</h3>
      <ul>
        <li>Datorer och telefoner</li>
        <li>Programvara och licenser</li>
        <li>Kontorsmaterial</li>
        <li>Yrkesspecifika verktyg</li>
      </ul>

      <h2>3. Representation och måltider</h2>
      <p>Som företagare kan du dra av vissa kostnader för representation:</p>
      <ul>
        <li>50% av representationskostnader med kunder</li>
        <li>Egen lunch vid arbete utanför hemorten</li>
        <li>Personalfester (begränsat belopp per anställd)</li>
      </ul>

      <h2>4. Pensionssparande för företagare</h2>
      <p>Som företagare har du flera alternativ för pensionssparande:</p>

      <h3>Egenföretagarens pensionssparande</h3>
      <ul>
        <li>Du kan sätta av upp till 35 000 kr per år</li>
        <li>Avdraget baseras på din företagsinkomst</li>
        <li>Ger omedelbar skattelättnad</li>
      </ul>

      <h3>Kapitalförsäkring</h3>
      <ul>
        <li>Flexibelt sparande utan begränsningar</li>
        <li>Schablonbeskattning</li>
        <li>Kan kombineras med andra pensionssparanden</li>
      </ul>

      <h2>5. Moms och deklaration</h2>
      <p>Om du är momsregistrerad:</p>
      <ul>
        <li>Lämna momsdeklaration månadsvis, kvartalsvis eller årligen</li>
        <li>Kom ihåg att dra av ingående moms på inköp</li>
        <li>Håll koll på momssatserna för olika tjänster</li>
        <li>Dokumentera all export/import korrekt</li>
      </ul>

      <h2>6. Sociala avgifter och egenavgifter</h2>
      <p>Som företagare betalar du egenavgifter istället för sociala avgifter:</p>
      <ul>
        <li>Allmän pensionsavgift: 7%</li>
        <li>Ålderspensionsavgift: 10.21%</li>
        <li>Sjukförsäkringsavgift: 3.55%</li>
        <li>Föräldraförsäkringsavgift: 2.60%</li>
      </ul>

      <h2>7. Vanliga misstag att undvika</h2>

      <h3>Blandning av privat och företag</h3>
      <ul>
        <li>Använd aldrig företagskontot för privata utgifter</li>
        <li>Dokumentera alla uttag från företaget</li>
        <li>Betala marknadsmässig hyra för hemkontor</li>
      </ul>

      <h3>Dålig dokumentation</h3>
      <ul>
        <li>Spara alla kvitton och fakturor</li>
        <li>Skriv syfte på representationskvitton</li>
        <li>Dokumentera affärsresor med syfte och deltagare</li>
      </ul>

      <h2>8. Deadline och påminnelser</h2>
      <ul>
        <li>Deklaration ska lämnas senast 2 maj</li>
        <li>Begär anstånd i tid om du behöver det</li>
        <li>Betala preliminärskatt enligt Skatteverkets krav</li>
        <li>Planera för skattebetalningen - sätt undan pengar månadsvis</li>
      </ul>

      <h2>Sammanfattning</h2>
      <p>Som småföretagare har du många möjligheter att optimera din skattesituation, men det kräver god planering och noggrann dokumentation. Tveka inte att investera i professionell hjälp - det kan spara både tid och pengar i längden.</p>

      <p><strong>Tips:</strong> Överväg att anlita en redovisningskonsult eller bokförare, särskilt första året som företagare. Det kan vara värt investeringen för att undvika kostsamma misstag.</p>
    `,
    author: "Skattehjälpen Team",
    tags: ["småföretag", "deklaration", "bokföring", "avdrag", "företagare"],
    publishedAt: "2024-01-25",
    readTime: 10,
  }
];

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getBlogPosts = (options?: {
  limit?: number;
  offset?: number;
  tag?: string;
}): { posts: BlogPost[]; total: number; hasMore: boolean } => {
  const { limit = 10, offset = 0, tag } = options || {};
  
  let filteredPosts = blogPosts;
  
  if (tag) {
    filteredPosts = blogPosts.filter(post => 
      post.tags.some(postTag => postTag.toLowerCase() === tag.toLowerCase())
    );
  }
  
  const total = filteredPosts.length;
  const posts = filteredPosts.slice(offset, offset + limit);
  const hasMore = offset + limit < total;
  
  return { posts, total, hasMore };
};

export const getBlogTags = (): { tag: string; count: number }[] => {
  const tagCounts: { [key: string]: number } = {};
  
  blogPosts.forEach(post => {
    post.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  
  return Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
};