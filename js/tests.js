// js/tests.js
(function () {
  const byId = (id) => document.getElementById(id);

  const STORAGE_KEY = "upc_testHistory_v2";

  // -----------------------------
  // Scoring options (consistent)
  // -----------------------------
  function scoreOptions() {
    return [
      { t: "Strongly yes, consistently", v: 10 },
      { t: "Mostly yes, with some gaps", v: 7 },
      { t: "Mixed, depends on the scene", v: 4 },
      { t: "Mostly no, the pattern is harmful", v: 1 },
    ];
  }

  // -----------------------------
  // Question banks by media type
  // Each item, cat: gaze, representation, gender, intersectionality
  // -----------------------------

  // FILM, balanced, 28 total
  const QUESTIONS_FILM = [
    // GAZE, 7
    { cat: "gaze", q: "Does the camera frame women as subjects with interiority, not as a visual reward", opts: scoreOptions() },
    { cat: "gaze", q: "Do shots avoid lingering focus on body parts instead of character development", opts: scoreOptions() },
    { cat: "gaze", q: "Is point of view shared, not locked into a single dominant perspective", opts: scoreOptions() },
    { cat: "gaze", q: "Are desire and attraction shown as mutual, not entitlement or conquest", opts: scoreOptions() },
    { cat: "gaze", q: "Are women allowed to look back, resist, interrupt, or redirect power in key scenes", opts: scoreOptions() },
    { cat: "gaze", q: "Does the film avoid turning women’s pain into decoration for a male arc", opts: scoreOptions() },
    { cat: "gaze", q: "Does editing avoid using women as quick visual inserts or punchlines", opts: scoreOptions() },

    // REPRESENTATION, 7
    { cat: "representation", q: "Do women characters have goals that exist beyond supporting a man’s development", opts: scoreOptions() },
    { cat: "representation", q: "Do marginalized characters have agency and meaningful choices", opts: scoreOptions() },
    { cat: "representation", q: "Are stereotypes challenged rather than reinforced", opts: scoreOptions() },
    { cat: "representation", q: "Is there diversity among women, not one woman representing everyone", opts: scoreOptions() },
    { cat: "representation", q: "Do women speak, disagree, and influence conflict resolution", opts: scoreOptions() },
    { cat: "representation", q: "Is LGBTQ plus representation respected and not reduced to jokes or tragedy only", opts: scoreOptions() },
    { cat: "representation", q: "Does the story avoid punishing women for ambition or sexual autonomy", opts: scoreOptions() },

    // GENDER AND POWER, 7
    { cat: "gender", q: "Does the film present masculinity as more than toughness, dominance, and control", opts: scoreOptions() },
    { cat: "gender", q: "Are male characters allowed emotional range without being mocked", opts: scoreOptions() },
    { cat: "gender", q: "Does romance avoid entitlement, ownership, or coercion framed as passion", opts: scoreOptions() },
    { cat: "gender", q: "Are power dynamics visible, not disguised as natural, deserved, or romantic", opts: scoreOptions() },
    { cat: "gender", q: "Do men face consequences for violence or coercion, not rewards", opts: scoreOptions() },
    { cat: "gender", q: "Does the story question the Man Box, one correct way to be a man", opts: scoreOptions() },
    { cat: "gender", q: "Are women’s boundaries respected by the narrative, not framed as obstacles", opts: scoreOptions() },

    // INTERSECTIONALITY, 7
    { cat: "intersectionality", q: "Does the film show gender intersecting with race, class, sexuality, and ability", opts: scoreOptions() },
    { cat: "intersectionality", q: "Are institutions visible as power systems, policing, school, work, media", opts: scoreOptions() },
    { cat: "intersectionality", q: "Are women of color written with depth, not as stereotypes or background diversity", opts: scoreOptions() },
    { cat: "intersectionality", q: "Are queer and trans experiences treated with dignity, not spectacle", opts: scoreOptions() },
    { cat: "intersectionality", q: "Does the film avoid white savior framing or rescue narratives", opts: scoreOptions() },
    { cat: "intersectionality", q: "Is class, poverty, or labor shown with complexity, not moral judgment", opts: scoreOptions() },
    { cat: "intersectionality", q: "Does the story invite reflection on who is treated as the default human", opts: scoreOptions() },
  ];

  // TV, episodic, 24 total
  const QUESTIONS_TV = [
    // GAZE, 6
    { cat: "gaze", q: "Across episodes, does the show avoid consistent objectifying framing of women", opts: scoreOptions() },
    { cat: "gaze", q: "Do key storylines include women’s interiority, not only reaction shots", opts: scoreOptions() },
    { cat: "gaze", q: "Is perspective distributed across characters over time, not only one lead gaze", opts: scoreOptions() },
    { cat: "gaze", q: "Are women allowed to be funny, angry, messy, strategic, and still respected", opts: scoreOptions() },
    { cat: "gaze", q: "Does the show avoid using sexual violence as shock value or plot fuel", opts: scoreOptions() },
    { cat: "gaze", q: "Do directing and editing avoid turning women into aesthetic props", opts: scoreOptions() },

    // REPRESENTATION, 6
    { cat: "representation", q: "Do women have multi episode arcs with goals and consequences", opts: scoreOptions() },
    { cat: "representation", q: "Do women talk to each other about topics beyond men, across the season", opts: scoreOptions() },
    { cat: "representation", q: "Are marginalized characters not only sidekicks, but central to outcomes", opts: scoreOptions() },
    { cat: "representation", q: "Does diversity include more than casting, it includes voice and agency", opts: scoreOptions() },
    { cat: "representation", q: "Does the show avoid tokenism, one character carrying all representation", opts: scoreOptions() },
    { cat: "representation", q: "Do characters with disability exist beyond inspiration or tragedy tropes", opts: scoreOptions() },

    // GENDER AND POWER, 6
    { cat: "gender", q: "Does the show challenge the Man Box across multiple male characters", opts: scoreOptions() },
    { cat: "gender", q: "Are men allowed vulnerability without being punished by the narrative", opts: scoreOptions() },
    { cat: "gender", q: "Does leadership avoid equating control with masculinity", opts: scoreOptions() },
    { cat: "gender", q: "Are care work and emotional labor shown and valued, not invisible", opts: scoreOptions() },
    { cat: "gender", q: "Does the show avoid rewarding jealousy, stalking, or coercion as romance", opts: scoreOptions() },
    { cat: "gender", q: "Does the show make consent clear and respected", opts: scoreOptions() },

    // INTERSECTIONALITY, 6
    { cat: "intersectionality", q: "Does the show show how race and class shape safety, credibility, and power", opts: scoreOptions() },
    { cat: "intersectionality", q: "Are institutions shown as structures, not just a few bad individuals", opts: scoreOptions() },
    { cat: "intersectionality", q: "Are women of color portrayed with contradiction, growth, and complexity", opts: scoreOptions() },
    { cat: "intersectionality", q: "Are queer characters allowed joy, community, and future, not only pain", opts: scoreOptions() },
    { cat: "intersectionality", q: "Does the show avoid exoticizing culture as aesthetic wallpaper", opts: scoreOptions() },
    { cat: "intersectionality", q: "Does the season avoid flattening all women into one universal experience", opts: scoreOptions() },
  ];

  // VIDEO GAMES, player gaze, design, systems, 28 total
  const QUESTIONS_GAME = [
    // GAZE, 7
    { cat: "gaze", q: "Does character design avoid sexualization as default, armor and outfits feel functional and consistent", opts: scoreOptions() },
    { cat: "gaze", q: "Does the camera and animation avoid framing women as collectibles or rewards", opts: scoreOptions() },
    { cat: "gaze", q: "Does the UI, menus, and marketing avoid selling women as the main spectacle", opts: scoreOptions() },
    { cat: "gaze", q: "Do voice lines and emotes avoid reducing women to flirtation or service", opts: scoreOptions() },
    { cat: "gaze", q: "Does the game avoid voyeur mechanics, forced gaze, or humiliation framing", opts: scoreOptions() },
    { cat: "gaze", q: "Are women playable with equal mechanical depth, not simplified roles only", opts: scoreOptions() },
    { cat: "gaze", q: "Does the game allow women to look back and redirect the player’s expectations", opts: scoreOptions() },

    // REPRESENTATION, 7
    { cat: "representation", q: "Do women have meaningful narrative agency, choices that alter outcomes", opts: scoreOptions() },
    { cat: "representation", q: "Are women present across roles, leaders, villains, experts, comedic, flawed", opts: scoreOptions() },
    { cat: "representation", q: "Are women of color present with depth, not only background NPC diversity", opts: scoreOptions() },
    { cat: "representation", q: "Are LGBTQ plus characters written with stakes beyond stereotypes", opts: scoreOptions() },
    { cat: "representation", q: "Are disability and mental health portrayed with care, not as horror shorthand", opts: scoreOptions() },
    { cat: "representation", q: "Does the game avoid punishing women for competence or ambition", opts: scoreOptions() },
    { cat: "representation", q: "Are non playable women treated as full characters, not quest objects", opts: scoreOptions() },

    // GENDER AND POWER, 7
    { cat: "gender", q: "Do male characters show emotional range without ridicule or immediate punishment", opts: scoreOptions() },
    { cat: "gender", q: "Does the game challenge the Man Box, dominance is not the only path to respect", opts: scoreOptions() },
    { cat: "gender", q: "Does the game avoid rewarding harassment, conquest, or control as masculinity", opts: scoreOptions() },
    { cat: "gender", q: "Are female characters’ boundaries respected by narrative and gameplay", opts: scoreOptions() },
    { cat: "gender", q: "Does cooperation, care, or community matter, not only violence and conquest", opts: scoreOptions() },
    { cat: "gender", q: "Is consent treated clearly in romance systems, dialogue, and story beats", opts: scoreOptions() },
    { cat: "gender", q: "Does the community design discourage toxic masculinity, chat tools, moderation, reporting", opts: scoreOptions() },

    // INTERSECTIONALITY, 7
    { cat: "intersectionality", q: "Does the game acknowledge how identity intersects with power, race, class, ability", opts: scoreOptions() },
    { cat: "intersectionality", q: "Are cultures represented with specificity and respect, not exotic props", opts: scoreOptions() },
    { cat: "intersectionality", q: "Does the game avoid colonial fantasy, resource extraction as heroism", opts: scoreOptions() },
    { cat: "intersectionality", q: "Are institutions and systems shown, guilds, law, economy, media, not just individuals", opts: scoreOptions() },
    { cat: "intersectionality", q: "Are queer and trans characters treated with dignity and narrative centrality", opts: scoreOptions() },
    { cat: "intersectionality", q: "Does the game avoid flattening all women into one experience or one body type", opts: scoreOptions() },
    { cat: "intersectionality", q: "Does the story invite reflection on who is treated as the default player or hero", opts: scoreOptions() },
  ];

  // SOCIAL MEDIA, algorithmic gaze, creator economy, 24 total
  const QUESTIONS_SOCIAL = [
    // GAZE, 6
    { cat: "gaze", q: "Does the content avoid framing women as thumbnails, body first, voice later", opts: scoreOptions() },
    { cat: "gaze", q: "Does editing avoid sexualized cuts that replace meaningful context", opts: scoreOptions() },
    { cat: "gaze", q: "Does the creator resist engagement bait that objectifies or humiliates women", opts: scoreOptions() },
    { cat: "gaze", q: "Does the content challenge normal looking norms and highlight power in viewing", opts: scoreOptions() },
    { cat: "gaze", q: "Are women allowed to set boundaries and be believed within the narrative", opts: scoreOptions() },
    { cat: "gaze", q: "Does the platform context amplify objectification, and is that addressed critically", opts: scoreOptions() },

    // REPRESENTATION, 6
    { cat: "representation", q: "Are women represented across roles, expertise, humor, leadership, not one type", opts: scoreOptions() },
    { cat: "representation", q: "Are women of color present with depth, not only trend participation", opts: scoreOptions() },
    { cat: "representation", q: "Are LGBTQ plus creators treated as full people, not props for discourse", opts: scoreOptions() },
    { cat: "representation", q: "Does the content avoid stereotypes and call out harmful comments when needed", opts: scoreOptions() },
    { cat: "representation", q: "Are men and women held to similar standards, not double standards", opts: scoreOptions() },
    { cat: "representation", q: "Does the content avoid punishing women for confidence, anger, or ambition", opts: scoreOptions() },

    // GENDER AND POWER, 6
    { cat: "gender", q: "Does the content challenge the Man Box norms, toughness, dominance, emotional restriction", opts: scoreOptions() },
    { cat: "gender", q: "Does it avoid romanticizing control, jealousy, stalking, or coercion", opts: scoreOptions() },
    { cat: "gender", q: "Are men allowed vulnerability, apology, change, without humiliation framing", opts: scoreOptions() },
    { cat: "gender", q: "Does it show consent and boundaries as normal, not as buzzkill", opts: scoreOptions() },
    { cat: "gender", q: "Does it call out harassment, dogpiles, and misogynistic trend cycles", opts: scoreOptions() },
    { cat: "gender", q: "Does it resist turning activism into aesthetics only, without material analysis", opts: scoreOptions() },

    // INTERSECTIONALITY, 6
    { cat: "intersectionality", q: "Does it discuss gender together with race, class, disability, sexuality, not as add ons", opts: scoreOptions() },
    { cat: "intersectionality", q: "Are institutions addressed, policy, labor, policing, healthcare, not only personal drama", opts: scoreOptions() },
    { cat: "intersectionality", q: "Does it avoid the white savior pattern and centering whiteness as default", opts: scoreOptions() },
    { cat: "intersectionality", q: "Does it avoid exoticizing cultures and instead centers lived experience", opts: scoreOptions() },
    { cat: "intersectionality", q: "Does it avoid flattening women into one universal experience", opts: scoreOptions() },
    { cat: "intersectionality", q: "Does it highlight who is protected, who is disbelieved, who is targeted online", opts: scoreOptions() },
  ];

  // MUSIC, lyrics and music video, 20 total
  const QUESTIONS_MUSIC = [
    // GAZE, 5
    { cat: "gaze", q: "If there is a music video, does framing avoid objectifying cuts and body as spectacle", opts: scoreOptions() },
    { cat: "gaze", q: "Does the performance framing treat women as subjects, not decorations for the artist", opts: scoreOptions() },
    { cat: "gaze", q: "Does the visual style avoid treating women as trophies, rewards, or accessories", opts: scoreOptions() },
    { cat: "gaze", q: "Does the song challenge normal looking norms and who gets to be seen as desirable", opts: scoreOptions() },
    { cat: "gaze", q: "Does the aesthetic avoid glamorizing women’s pain as art without accountability", opts: scoreOptions() },

    // REPRESENTATION, 5
    { cat: "representation", q: "Do lyrics give women interiority, voice, and complexity, not only roles", opts: scoreOptions() },
    { cat: "representation", q: "Are women shown across roles, creators, producers, narrators, not only muses", opts: scoreOptions() },
    { cat: "representation", q: "Does it avoid stereotypes about gender, race, class, and sexuality", opts: scoreOptions() },
    { cat: "representation", q: "Are queer identities represented with respect, not as shock value", opts: scoreOptions() },
    { cat: "representation", q: "Does it avoid punishing women for desire, ambition, or autonomy", opts: scoreOptions() },

    // GENDER AND POWER, 5
    { cat: "gender", q: "Does it avoid romance narratives built on control, jealousy, or entitlement", opts: scoreOptions() },
    { cat: "gender", q: "Does it challenge Man Box norms, dominance is not framed as the only masculinity", opts: scoreOptions() },
    { cat: "gender", q: "Does it normalize consent and boundaries as attractive and respected", opts: scoreOptions() },
    { cat: "gender", q: "Are men allowed emotional range, tenderness, apology, growth", opts: scoreOptions() },
    { cat: "gender", q: "Does it avoid glorifying violence as status", opts: scoreOptions() },

    // INTERSECTIONALITY, 5
    { cat: "intersectionality", q: "Does it acknowledge identity intersections, race, class, disability, sexuality", opts: scoreOptions() },
    { cat: "intersectionality", q: "Does it avoid cultural appropriation and instead gives credit and context", opts: scoreOptions() },
    { cat: "intersectionality", q: "Are institutions and structural conditions visible, labor, poverty, policing", opts: scoreOptions() },
    { cat: "intersectionality", q: "Does it avoid flattening women into one universal experience", opts: scoreOptions() },
    { cat: "intersectionality", q: "Does it invite reflection on who is treated as default, whose voice is centered", opts: scoreOptions() },
  ];

  const QUESTION_BANK = {
    film: QUESTIONS_FILM,
    tv: QUESTIONS_TV,
    game: QUESTIONS_GAME,
    social: QUESTIONS_SOCIAL,
    music: QUESTIONS_MUSIC,
  };

  // -----------------------------
  // Helpers
  // -----------------------------
  function escapeHtml(s) {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function catLabel(cat) {
    if (cat === "gaze") return "GAZE AND PERSPECTIVE";
    if (cat === "representation") return "REPRESENTATION";
    if (cat === "gender") return "GENDER DYNAMICS AND MAN BOX";
    return "INTERSECTIONALITY AND POWER";
  }

  function loadHistory() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  }

  function saveHistoryItem(item) {
    const hist = loadHistory();
    hist.push(item);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(hist.slice(-12)));
  }

  // -----------------------------
  // Comprehensive test state
  // -----------------------------
  let ACTIVE_QUESTIONS = [];

  let startBtn, testContent, testNav, prevBtn, nextBtn, currentQEl, totalQEl, progressBar;
  let mediaTitleEl, mediaTypeEl;
  let resultsSection, mediaNameEl, overallScoreEl;
  let gazeScoreEl, repScoreEl, genderScoreEl, intScoreEl;
  let gazeBar, repBar, genderBar, intBar;
  let strengthsEl, weaknessesEl, recsEl;
  let saveBtn, historyWrap, historyList;

  let currentIndex = 0;
  let answers = [];

  function renderQuestion(i) {
    const item = ACTIVE_QUESTIONS[i];

    let optionsHtml = "";
    item.opts.forEach((opt, idx) => {
      const selected = answers[i] === idx ? "selected" : "";
      optionsHtml += `
        <div class="option ${selected}" data-idx="${idx}">
          <div class="option-selector"></div>
          <div class="option-label">${escapeHtml(opt.t)}</div>
        </div>
      `;
    });

    testContent.innerHTML = `
      <div class="test-question fade-in">
        <div class="question-category">${escapeHtml(catLabel(item.cat))}</div>
        <div class="question-text">${escapeHtml(item.q)}</div>
        <div class="question-options">${optionsHtml}</div>
      </div>
    `;

    testContent.querySelectorAll(".option").forEach((node) => {
      node.addEventListener("click", () => {
        const idx = Number(node.getAttribute("data-idx"));
        answers[i] = idx;
        renderQuestion(i);
        nextBtn.disabled = false;
      });
    });

    currentQEl.textContent = String(i + 1);
    progressBar.style.width = `${Math.round(((i + 1) / ACTIVE_QUESTIONS.length) * 100)}%`;

    prevBtn.disabled = i === 0;
    nextBtn.textContent = i === ACTIVE_QUESTIONS.length - 1 ? "Finish" : "Next";
    nextBtn.disabled = answers[i] === null;
  }

  function computeScores() {
    const totals = { gaze: 0, representation: 0, gender: 0, intersectionality: 0 };
    const counts = { gaze: 0, representation: 0, gender: 0, intersectionality: 0 };

    ACTIVE_QUESTIONS.forEach((q, i) => {
      const aIdx = answers[i];
      const val = aIdx === null ? 0 : q.opts[aIdx].v;
      totals[q.cat] += val;
      counts[q.cat] += 1;
    });

    const pct = {};
    Object.keys(totals).forEach((cat) => {
      const max = counts[cat] * 10;
      pct[cat] = max ? Math.round((totals[cat] / max) * 100) : 0;
    });

    const overall = Math.round((pct.gaze + pct.representation + pct.gender + pct.intersectionality) / 4);
    return { pct, overall };
  }

  function generateAnalysis(pct) {
    strengthsEl.innerHTML = "<h4>Strengths</h4>";
    weaknessesEl.innerHTML = "<h4>Areas to Improve</h4>";
    recsEl.innerHTML = "";

    const strengthLines = [];
    const weaknessLines = [];
    const recLines = [];

    // gaze
    if (pct.gaze >= 70) {
      strengthLines.push("The work treats people as subjects, perspective is not only extraction or spectacle.");
    } else {
      weaknessLines.push("Perspective and framing may lean toward objectification, a narrow viewpoint, or reward looking over listening.");
      recLines.push("Add interiority, reduce body first framing, shift who gets to look and who gets to speak, give women control of scene power.");
    }

    // representation
    if (pct.representation >= 70) {
      strengthLines.push("Representation shows variety, women and marginalized characters have voice, goals, and consequence.");
    } else {
      weaknessLines.push("Representation may rely on limited roles, tokenism, or characters existing mainly to support a male arc.");
      recLines.push("Write goals, contradictions, skills, mistakes, and impact for women and marginalized characters, not only presence.");
    }

    // gender
    if (pct.gender >= 70) {
      strengthLines.push("Gender roles are flexible, masculinity is not only dominance, vulnerability is allowed and respected.");
    } else {
      weaknessLines.push("Man Box signals appear, toughness and control are rewarded, care and vulnerability are minimized.");
      recLines.push("Show alternatives to dominance, normalize care work, avoid glamorizing coercion, make consent and boundaries central.");
    }

    // intersectionality
    if (pct.intersectionality >= 70) {
      strengthLines.push("The work acknowledges overlapping identities and structures, it resists default whiteness and default masculinity.");
    } else {
      weaknessLines.push("Intersectional complexity may be missing, power structures may be treated as personal drama only.");
      recLines.push("Add context and structure, show institutions, class pressure, racism, heterosexism, ableism, clarify who is centered and who is missing.");
    }

    strengthLines.forEach((t) => {
      strengthsEl.innerHTML += `<p><i class="fas fa-check-circle" style="color: var(--success)"></i> ${escapeHtml(t)}</p>`;
    });
    weaknessLines.forEach((t) => {
      weaknessesEl.innerHTML += `<p><i class="fas fa-exclamation-circle" style="color: var(--danger)"></i> ${escapeHtml(t)}</p>`;
    });
    recLines.forEach((t) => {
      recsEl.innerHTML += `<p><i class="fas fa-lightbulb" style="color: var(--warning)"></i> ${escapeHtml(t)}</p>`;
    });
  }

  function startTest() {
    const title = mediaTitleEl.value.trim();
    const type = mediaTypeEl.value;

    if (!title || !type) {
      alert("Please enter a media title and select a media type.");
      return;
    }

    ACTIVE_QUESTIONS = QUESTION_BANK[type] || QUESTION_BANK.film;

    mediaNameEl.textContent = title;
    currentIndex = 0;
    answers = new Array(ACTIVE_QUESTIONS.length).fill(null);

    const startScreen = byId("testStartScreen") || document.querySelector(".test-start-screen");
    if (startScreen) startScreen.style.display = "none";

    resultsSection.style.display = "none";
    testContent.style.display = "block";
    testNav.style.display = "flex";

    totalQEl.textContent = String(ACTIVE_QUESTIONS.length);
    renderQuestion(currentIndex);
  }

  function nextQuestion() {
    if (currentIndex < ACTIVE_QUESTIONS.length - 1) {
      currentIndex++;
      renderQuestion(currentIndex);
      return;
    }

    const { pct, overall } = computeScores();

    overallScoreEl.textContent = `${overall}%`;
    gazeScoreEl.textContent = `${pct.gaze}%`;
    repScoreEl.textContent = `${pct.representation}%`;
    genderScoreEl.textContent = `${pct.gender}%`;
    intScoreEl.textContent = `${pct.intersectionality}%`;

    gazeBar.style.width = `${pct.gaze}%`;
    repBar.style.width = `${pct.representation}%`;
    genderBar.style.width = `${pct.gender}%`;
    intBar.style.width = `${pct.intersectionality}%`;

    generateAnalysis(pct);

    testContent.style.display = "none";
    testNav.style.display = "none";
    resultsSection.style.display = "block";
    resultsSection.scrollIntoView({ behavior: "smooth" });
  }

  function prevQuestion() {
    if (currentIndex > 0) {
      currentIndex--;
      renderQuestion(currentIndex);
    }
  }

  function renderHistory() {
    const hist = loadHistory();
    if (!historyWrap || !historyList) return;

    if (!hist.length) {
      historyWrap.style.display = "none";
      return;
    }

    historyWrap.style.display = "block";
    historyList.innerHTML = "";

    hist
      .slice()
      .reverse()
      .forEach((it) => {
        historyList.innerHTML += `
          <div class="history-item">
            <div class="history-title">${escapeHtml(it.title)}</div>
            <div class="history-date">${escapeHtml(it.date)}</div>
            <div class="history-score">${it.overall}%</div>
          </div>
        `;
      });
  }

  function saveResults() {
    const title = mediaNameEl.textContent || "Untitled";
    const { pct, overall } = computeScores();

    saveHistoryItem({
      title,
      date: new Date().toLocaleDateString(),
      overall,
      pct,
      type: mediaTypeEl.value || "film",
    });

    renderHistory();
    alert("Saved to your analysis history.");
  }

  // -----------------------------
  // Bechdel Suite
  // Core uses selects b1 b2 b3 and title input bechdelTitle
  // Plus uses checkboxes bpAgency bpPlotImpact bpWocDepth bpLgbtqDepth bpNoStereotypes and range bpDepth
  // -----------------------------
  function badgeHtml(kind, label) {
    const cls = kind === "pass" ? "badge-pass" : kind === "warn" ? "badge-warn" : "badge-fail";
    return `<span class="result-badge ${cls}">${escapeHtml(label)}</span>`;
  }

  function getSelectVal(id) {
    const el = byId(id);
    return el ? String(el.value || "") : "";
  }

  function runBechdelCore() {
    const out = byId("bechdelCoreOutput");
    if (!out) return;

    const title = (byId("bechdelTitle")?.value || "").trim() || "Untitled media";

    const b1 = getSelectVal("b1");
    const b2 = getSelectVal("b2");
    const b3 = getSelectVal("b3");

    if (!b1 || !b2 || !b3) {
      out.style.display = "block";
      out.innerHTML = `
        ${badgeHtml("warn", "INCOMPLETE")}
        <div class="result-score">Not scored yet</div>
        <div class="result-block">
          <h4>What to do</h4>
          <p>Select Yes, No, or Unsure for all three questions to get a clear result.</p>
        </div>
      `;
      out.scrollIntoView({ behavior: "smooth", block: "nearest" });
      return;
    }

    const vals = { yes: 34, unsure: 17, no: 0 };
    let score = (vals[b1] || 0) + (vals[b2] || 0) + (vals[b3] || 0);

    const yesCount = [b1, b2, b3].filter((v) => v === "yes").length;
    const noCount = [b1, b2, b3].filter((v) => v === "no").length;
    const unsureCount = [b1, b2, b3].filter((v) => v === "unsure").length;

    const corePass = yesCount === 3;
    const coreFail = noCount >= 1;

    if (corePass) score += 5;
    score = Math.max(0, Math.min(100, score));

    let kind = "warn";
    let label = "CORE MIXED";
    let line = "Bechdel Core, MIXED. Some conditions are uncertain or incomplete in practice.";
    if (corePass) {
      kind = "pass";
      label = "CORE PASS";
      line = "Bechdel Core, PASS. Two named women talk to each other about something besides a man.";
    } else if (coreFail) {
      kind = "fail";
      label = "CORE FAIL";
      line = "Bechdel Core, FAIL. The story limits women’s conversation space or centers men as default topic.";
    } else if (unsureCount === 3) {
      kind = "warn";
      label = "CORE UNCLEAR";
      line = "Bechdel Core, UNCLEAR. You marked unsure for all items, review the scenes and answer again.";
    }

    const meaning = corePass
      ? "Passing is a minimum threshold, it does not guarantee feminist representation, it signals basic visibility."
      : "Failing often signals how narrative time is allocated and whose relationships are treated as meaningful, it can connect to Man Box storytelling where male bonding dominates and women are sidelined.";

    const praxis = corePass
      ? "Praxis prompt, even if it passes, ask who gets to look, who gets to be looked at, and who gets punished for resisting."
      : "Praxis prompt, ask what the story rewards, does it reward dominance, conquest, emotional restriction, and treat women’s interiority as optional.";

    out.style.display = "block";
    out.innerHTML = `
      ${badgeHtml(kind, label)}
      <div class="result-score">${score}%</div>
      <div class="result-block">
        <h4>${escapeHtml(title)}</h4>
        <p><strong>${escapeHtml(line)}</strong></p>
        <p>${escapeHtml(meaning)}</p>
        <h4>Praxis prompt</h4>
        <p>${escapeHtml(praxis)}</p>
        <a class="btn btn-outline btn-block" href="#feminist-test">Go to Comprehensive Analysis</a>
      </div>
    `;
    out.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function runBechdelPlus() {
    const out = byId("bechdelPlusOutput");
    if (!out) return;

    const title = (byId("bechdelTitle")?.value || "").trim() || "Your media";
    const depth = Number(byId("bpDepth")?.value || 3);

    const checks = {
      agency: !!byId("bpAgency")?.checked,
      impact: !!byId("bpPlotImpact")?.checked,
      woc: !!byId("bpWocDepth")?.checked,
      lgbtq: !!byId("bpLgbtqDepth")?.checked,
      noStereo: !!byId("bpNoStereotypes")?.checked,
    };

    const checkedCount = Object.values(checks).filter(Boolean).length;

    const checklistScore = Math.round((checkedCount / 5) * 50);
    const depthScore = Math.round(((depth - 1) / 4) * 50);
    let total = checklistScore + depthScore;
    total = Math.max(0, Math.min(100, total));

    let kind = "fail";
    let label = "PLUS WEAK";
    if (total >= 75) {
      kind = "pass";
      label = "PLUS STRONG";
    } else if (total >= 50) {
      kind = "warn";
      label = "PLUS MIXED";
    }

    const whatItMeans =
      total >= 75
        ? "Representation shows agency and interiority, women affect outcomes, identity is not only decoration."
        : total >= 50
        ? "Some depth is present, but gaps remain, watch for tokenism, stereotype shortcuts, limited consequences."
        : "Representation may be thin, women may exist without power, interiority, or plot consequences, intersectional complexity may be missing.";

    const recs = [];
    if (!checks.agency) recs.push("Give women goals that are not reactions to men, show decisions, strategy, mistakes, learning.");
    if (!checks.impact) recs.push("Let women’s choices change the outcome, not just the mood of a scene.");
    if (!checks.woc) recs.push("Add women of color with interiority, conflict, joy, and centrality, not only background diversity.");
    if (!checks.lgbtq) recs.push("Write LGBTQ plus characters as full people with stakes, not jokes, props, or tragedy only.");
    if (!checks.noStereo) recs.push("Replace stereotypes with specificity, contradiction, growth, and consequences.");
    if (depth <= 2) recs.push("Increase interiority, add scenes of reflection, relationships, and consequences not built on male approval.");

    const recHtml = recs.length
      ? recs.map((t) => `<p>${escapeHtml(t)}</p>`).join("")
      : `<p>Keep doing what works, then validate it with the Comprehensive Analysis and the Movie Gaze Lab examples.</p>`;

    out.style.display = "block";
    out.innerHTML = `
      ${badgeHtml(kind, label)}
      <div class="result-score">${total}%</div>
      <div class="result-block">
        <h4>${escapeHtml(title)}</h4>
        <p>${escapeHtml(whatItMeans)}</p>
        <h4>Recommendations</h4>
        ${recHtml}
        <h4>Bridge to gaze and the Man Box</h4>
        <p>Ask who gets to look, who is framed as object, who is rewarded for control, who is punished for vulnerability, that is where gaze and the Man Box connect.</p>
        <a class="btn btn-outline btn-block" href="#feminist-test">Go to Comprehensive Analysis</a>
      </div>
    `;
    out.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  // -----------------------------
  // DOM ready wiring
  // -----------------------------
  document.addEventListener("DOMContentLoaded", () => {
    // Comprehensive ids
    startBtn = byId("startTest");
    testContent = byId("testContent");
    testNav = byId("testNav");
    prevBtn = byId("prevQuestion");
    nextBtn = byId("nextQuestion");
    currentQEl = byId("currentQuestion");
    totalQEl = byId("totalQuestions");
    progressBar = byId("testProgress");

    mediaTitleEl = byId("mediaTitle");
    mediaTypeEl = byId("mediaType");

    resultsSection = byId("resultsSection");
    mediaNameEl = byId("mediaName");
    overallScoreEl = byId("overallScore");

    gazeScoreEl = byId("gazeScore");
    repScoreEl = byId("representationScore");
    genderScoreEl = byId("genderScore");
    intScoreEl = byId("intersectionalityScore");

    gazeBar = byId("gazeBar");
    repBar = byId("representationBar");
    genderBar = byId("genderBar");
    intBar = byId("intBar") || byId("intersectionalityBar") || byId("intScoreBar"); // safety

    // Your ids used intersectionalityBar in older versions
    if (!intBar) intBar = byId("intersectionalityBar");

    strengthsEl = byId("strengthsList");
    weaknessesEl = byId("weaknessesList");
    recsEl = byId("recommendationsList");

    saveBtn = byId("saveResults");
    historyWrap = byId("testHistory");
    historyList = byId("historyList");

    if (startBtn && testContent && testNav && nextBtn && prevBtn) {
      startBtn.addEventListener("click", startTest);
      nextBtn.addEventListener("click", nextQuestion);
      prevBtn.addEventListener("click", prevQuestion);
      if (saveBtn) saveBtn.addEventListener("click", saveResults);
      renderHistory();
    }

    // Bechdel Core and Plus wiring
    const coreBtn = byId("runBechdelCoreBtn");
    const plusBtn = byId("runBechdelPlusBtn");

    if (coreBtn) coreBtn.addEventListener("click", runBechdelCore);
    if (plusBtn) plusBtn.addEventListener("click", runBechdelPlus);

    // Depth label
    const depthRange = byId("bpDepth");
    const depthValue = byId("bpDepthValue");
    if (depthRange && depthValue) {
      depthValue.textContent = String(depthRange.value || 3);
      depthRange.addEventListener("input", () => {
        depthValue.textContent = String(depthRange.value);
      });
    }
  });
})();
