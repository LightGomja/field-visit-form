// =============================================
// Initialize Grist widget
grist.ready({ requiredAccess: 'full' });

async function fetchAll(table) {
  const records = await grist.docApi.fetchTable(table);
  // fetchTable returns {colName: [val, val, ...], id: [1, 2, ...]}
  // Convert to array of {id, fields} objects
  const ids = records.id;
  const cols = Object.keys(records).filter(k => k !== 'id');
  return ids.map((id, i) => {
    const fields = {};
    cols.forEach(col => fields[col] = records[col][i]);
    return { id, fields };
  });
}

async function addRecord(table, fields) {
  const result = await grist.docApi.applyUserActions([
    ['AddRecord', table, null, fields]
  ]);
  return result.retValues[0]; // returns the new row id
}

// =============================================
// TRANSLATIONS
// =============================================
const T = {
  en: {
    appTitle: 'Field Ministry Tracker',
    appSubtitle: 'Church Visit & Partnership',
    fieldVisitTab: 'Field Visit',
    partnershipTab: 'Partnership',
    visitInfo: 'Visit Information',
    churchLocation: 'Church & Location',
    contactDetails: 'Contact Person Details',
    visitResults: 'Visit Results',
    partnershipInfo: 'Partnership Information',
    churchInfo: 'Church Information',
    groupsSection: 'Groups',
    fieldExecLabel: 'Field Executive Name',
    dateLabel: 'Date',
    visitTypeLabel: 'Visit Type',
    churchNameLabel: 'Church Name',
    districtLabel: 'District',
    vdcLabel: 'VDC / Municipality',
    villageLabel: 'Village / Area',
    provinceLabel: 'Province',
    demographicLabel: 'Demographic',
    contactPersonLabel: 'Contact Person',
    phoneLabel: 'Phone Number',
    roleLabel: 'Role',
    ageLabel: 'Age',
    genderLabel: 'Gender',
    numPeopleLabel: 'Number of People Met',
    timeSpentLabel: 'Time Spent',
    followupLabel: 'Follow-up Needed',
    nextActionLabel: 'Next Planned Action',
    ministryLabel: 'Ministries Promoted',
    responseLabel: 'People Response',
    testimonyLabel: 'Short Testimony / Story',
    prayerLabel: 'Prayer Requests',
    commentsLabel: 'Comments / Remarks',
    photoLabel: 'Photo / Audio Upload',
    travelPurposeLabel: 'Travel Purpose',
    submitVisit: 'Submit Field Visit',
    submitPartnership: 'Submit Partnership',
    savedSuccess: 'Saved Successfully!',
    partnershipSaved: 'Partnership Saved!',
    newVisit: 'New Visit',
    newPartnership: 'New Partnership',
    goPartnership: 'Partnership Form',
    goFieldVisit: 'Field Visit Form',
    addGroup: '+ Add Group',
    addMember: '+ Add Member',
    addContact: '+ Add Contact',
    removeContact: 'Remove',
    contactNum: n => `Contact Person #${n}`,
    groupLeader: 'Leader',
    memberName: 'Name',
    memberAge: 'Age',
    memberGender: 'Gender',
    groupType: 'Group Type',
    bookName: 'Book Name',
    dayOfMeeting: 'Day of Meeting',
    ministry: 'Ministry',
    groupLeaderName: 'Group Leader Name',
    groupLeaderPhone: 'Leader Phone',
    searchExec: 'Search staff name...',
    searchChurch: 'Search or type church name...',
    searchContact: 'Search or type name...',
    autoFilled: 'Auto-filled...',
    phonePh: '98XXXXXXXX',
    agePh: 'e.g. 30',
    travelPurposePh: 'Reason for visit...',
    ministryPh: 'Which ministries were shared...',
    testimonyPh: 'Share a brief testimony...',
    prayerPh: 'Prayer needs from this visit...',
    commentsPh: 'Any additional observations...',
    timeSpentPh: 'e.g. 2 hours',
    photoHint: 'Requires internet connection',
    provinceEg: 'e.g. Bagmati',
    districtEg: 'e.g. Kathmandu',
    villageEg: 'e.g. Balaju',
    offlineMsg: 'No internet — data saved locally',
    syncingMsg: 'Syncing saved records...',
    syncedMsg: records => `Synced ${records} record(s) successfully`,
    visitBadge: n => `This is visit #${n} to this church`,
    groupBadge: n => `${n} group(s) already exist for this church`,
    newChurch: 'New church — will be created',
    usingExisting: name => `Using existing record: ${name}`,
    yes: 'Yes', no: 'No', maybe: 'Maybe',
    firstVisit: 'First Visit', followUp: 'Follow-up', partnershipVisit: 'Partnership Visit',
    pastor: 'Pastor', deacon: 'Deacon', member: 'Member', homeGroupLeader: 'Home Group Leader',
    male: 'Male', female: 'Female', other: 'Other',
    urbanArea: 'Urban Area', ruralArea: 'Rural Area', semiRuralArea: 'Semi Rural Area',
    neutral: 'Neutral', veryInterested: 'Very Interested', interested: 'Interested', notInterested: 'Not Interested',
    noAction: 'No Action', returnVisit: 'Return Visit', sendMaterials: 'Send Materials',
    prayerFollowup: 'Prayer Follow-up', inviteEvent: 'Invite to Event',
    homeGroup: 'Home Group', scriptureBook: 'Scripture Engagement Book',
    monday: 'Monday', tuesday: 'Tuesday', wednesday: 'Wednesday', thursday: 'Thursday',
    friday: 'Friday', saturday: 'Saturday', sunday: 'Sunday',
    errorRequired: 'Please fill all required fields',
    saving: 'Saving...',
  },
  ne: {
    appTitle: 'फिल्ड मिनिस्ट्री ट्र्याकर',
    appSubtitle: 'चर्च भ्रमण र साझेदारी',
    fieldVisitTab: 'फिल्ड भ्रमण',
    partnershipTab: 'साझेदारी',
    visitInfo: 'भ्रमण जानकारी',
    churchLocation: 'चर्च र स्थान',
    contactDetails: 'सम्पर्क व्यक्तिको विवरण',
    visitResults: 'भ्रमण परिणाम',
    partnershipInfo: 'साझेदारी जानकारी',
    churchInfo: 'चर्च जानकारी',
    groupsSection: 'समूहहरू',
    fieldExecLabel: 'फिल्ड कार्यकारी नाम',
    dateLabel: 'मिति',
    visitTypeLabel: 'भ्रमण प्रकार',
    churchNameLabel: 'चर्चको नाम',
    districtLabel: 'जिल्ला',
    vdcLabel: 'गाविस / नगरपालिका',
    villageLabel: 'गाउँ / क्षेत्र',
    provinceLabel: 'प्रदेश',
    demographicLabel: 'जनसांख्यिकी',
    contactPersonLabel: 'सम्पर्क व्यक्ति',
    phoneLabel: 'फोन नम्बर',
    roleLabel: 'भूमिका',
    ageLabel: 'उमेर',
    genderLabel: 'लिंग',
    numPeopleLabel: 'भेटिएका मान्छेको संख्या',
    timeSpentLabel: 'बिताएको समय',
    followupLabel: 'फलोअप चाहिन्छ',
    nextActionLabel: 'अर्को योजना',
    ministryLabel: 'प्रवर्धित मिनिस्ट्री',
    responseLabel: 'मान्छेको प्रतिक्रिया',
    testimonyLabel: 'छोटो साक्षी / कथा',
    prayerLabel: 'प्रार्थना अनुरोध',
    commentsLabel: 'टिप्पणी / टिप्पणीहरू',
    photoLabel: 'फोटो / अडियो अपलोड',
    travelPurposeLabel: 'यात्राको उद्देश्य',
    submitVisit: 'फिल्ड भ्रमण पेश गर्नुहोस्',
    submitPartnership: 'साझेदारी पेश गर्नुहोस्',
    savedSuccess: 'सफलतापूर्वक सुरक्षित!',
    partnershipSaved: 'साझेदारी सुरक्षित!',
    newVisit: 'नयाँ भ्रमण',
    newPartnership: 'नयाँ साझेदारी',
    goPartnership: 'साझेदारी फारम',
    goFieldVisit: 'फिल्ड भ्रमण फारम',
    addGroup: '+ समूह थप्नुहोस्',
    addMember: '+ सदस्य थप्नुहोस्',
    addContact: '+ सम्पर्क थप्नुहोस्',
    removeContact: 'हटाउनुहोस्',
    contactNum: n => `सम्पर्क व्यक्ति #${n}`,
    groupLeader: 'नेता',
    memberName: 'नाम',
    memberAge: 'उमेर',
    memberGender: 'लिंग',
    groupType: 'समूह प्रकार',
    bookName: 'पुस्तकको नाम',
    dayOfMeeting: 'भेट्ने दिन',
    ministry: 'मिनिस्ट्री',
    groupLeaderName: 'समूह नेता नाम',
    groupLeaderPhone: 'नेताको फोन',
    searchExec: 'कर्मचारीको नाम खोज्नुहोस्...',
    searchChurch: 'चर्चको नाम खोज्नुहोस्...',
    searchContact: 'नाम खोज्नुहोस्...',
    autoFilled: 'स्वतः भरिन्छ...',
    phonePh: '98XXXXXXXX',
    agePh: 'जस्तै ३०',
    travelPurposePh: 'भ्रमणको कारण...',
    ministryPh: 'कुन मिनिस्ट्री साझा गरियो...',
    testimonyPh: 'छोटो साक्षी लेख्नुहोस्...',
    prayerPh: 'यस भ्रमणका प्रार्थना आवश्यकताहरू...',
    commentsPh: 'थप टिप्पणीहरू...',
    timeSpentPh: 'जस्तै २ घण्टा',
    photoHint: 'इन्टरनेट आवश्यक छ',
    provinceEg: 'जस्तै बागमती',
    districtEg: 'जस्तै काठमाडौं',
    villageEg: 'जस्तै बालाजु',
    offlineMsg: 'इन्टरनेट छैन — डेटा स्थानीय रूपमा सुरक्षित',
    syncingMsg: 'सुरक्षित रेकर्डहरू सिङ्क हुँदैछ...',
    syncedMsg: records => `${records} रेकर्ड सफलतापूर्वक सिङ्क भयो`,
    visitBadge: n => `यो यस चर्चमा ${n} औं भ्रमण हो`,
    groupBadge: n => `यस चर्चमा पहिले नै ${n} समूह छ`,
    newChurch: 'नयाँ चर्च — सिर्जना गरिनेछ',
    usingExisting: name => `अवस्थित रेकर्ड प्रयोग: ${name}`,
    yes: 'हो', no: 'होइन', maybe: 'सायद',
    firstVisit: 'पहिलो भ्रमण', followUp: 'फलोअप', partnershipVisit: 'साझेदारी भ्रमण',
    pastor: 'पास्टर', deacon: 'डिकन', member: 'सदस्य', homeGroupLeader: 'होम ग्रुप नेता',
    male: 'पुरुष', female: 'महिला', other: 'अन्य',
    urbanArea: 'सहरी क्षेत्र', ruralArea: 'ग्रामीण क्षेत्र', semiRuralArea: 'अर्ध ग्रामीण क्षेत्र',
    neutral: 'तटस्थ', veryInterested: 'धेरै रुचि', interested: 'रुचि', notInterested: 'रुचि छैन',
    noAction: 'कुनै कार्य छैन', returnVisit: 'फिर्ता भ्रमण', sendMaterials: 'सामग्री पठाउनुहोस्',
    prayerFollowup: 'प्रार्थना फलोअप', inviteEvent: 'कार्यक्रममा आमन्त्रण',
    homeGroup: 'होम ग्रुप', scriptureBook: 'शास्त्र संलग्नता पुस्तक',
    monday: 'सोमबार', tuesday: 'मंगलबार', wednesday: 'बुधबार', thursday: 'बिहिबार',
    friday: 'शुक्रबार', saturday: 'शनिबार', sunday: 'आइतबार',
    errorRequired: 'कृपया सबै आवश्यक फिल्डहरू भर्नुहोस्',
    saving: 'सुरक्षित हुँदैछ...',
  }
};

let lang = localStorage.getItem('fmtLang') || 'en';
let groupCount = 0;
let contactCount = 0;
let execCache = [], churchCache = [], contactCache = [];

// =============================================
// LANGUAGE
// =============================================
function t(key, ...args) {
  const val = T[lang][key];
  if (typeof val === 'function') return val(...args);
  return val || key;
}

function toggleLang() {
  lang = lang === 'en' ? 'ne' : 'en';
  localStorage.setItem('fmtLang', lang);
  document.getElementById('langLabel').textContent = lang === 'en' ? 'NE' : 'EN';
  applyTranslations();
}

function applyTranslations() {
  document.querySelectorAll('[data-t]').forEach(el => {
    const key = el.getAttribute('data-t');
    if (T[lang][key] && typeof T[lang][key] === 'string') el.textContent = T[lang][key];
  });
  document.querySelectorAll('[data-t-ph]').forEach(el => {
    const key = el.getAttribute('data-t-ph');
    if (T[lang][key]) el.placeholder = T[lang][key];
  });
}

// =============================================
// GRIST API HELPERS
// =============================================
async function findOrCreate(table, fields, matchFn) {
  const all = await fetchAll(table);
  const found = all.find(r => matchFn(r.fields));
  if (found) return { id: found.id, existing: true, name: found.fields.name || found.fields.churchname || found.fields.fullname };
  const id = await addRecord(table, fields);
  return { id, existing: false };
}

// =============================================
// CACHE LOADING
// =============================================
async function loadCaches() {
  try {
    execCache = await fetchAll('FieldExecutives');
    churchCache = await fetchAll('Churches');
    contactCache = await fetchAll('Contacts');
  } catch (e) {
    console.log('Offline — using empty cache');
  }
}

// =============================================
// SEARCH FUNCTIONS
// =============================================
function searchExecs(inputId, resultsId, hiddenId) {
  const q = document.getElementById(inputId).value.toLowerCase();
  const results = document.getElementById(resultsId);
  document.getElementById(hiddenId).value = '';
  if (q.length < 1) { results.classList.remove('open'); return; }
  const matches = execCache.filter(r => r.fields.name && r.fields.name.toLowerCase().includes(q));
  renderResults(results, matches, r => ({
    main: r.fields.name,
    sub: r.fields.ministryarea || ''
  }), (r) => {
    document.getElementById(inputId).value = r.fields.name;
    document.getElementById(hiddenId).value = r.id;
    results.classList.remove('open');
  });
}

function searchChurches(inputId, resultsId, hiddenId, prefix) {
  const q = document.getElementById(inputId).value.toLowerCase();
  const results = document.getElementById(resultsId);
  document.getElementById(hiddenId).value = '';
  clearChurchAutofill(prefix);
  if (q.length < 1) { results.classList.remove('open'); return; }
  const matches = churchCache.filter(r => r.fields.churchname && r.fields.churchname.toLowerCase().includes(q));
  const items = [...matches];
  renderResults(results, items, r => ({
    main: r.fields.churchname,
    sub: [r.fields.district, r.fields.village_area].filter(Boolean).join(', ')
  }), async (r) => {
    document.getElementById(inputId).value = r.fields.churchname;
    document.getElementById(hiddenId).value = r.id;
    results.classList.remove('open');
    autofillChurch(r.fields, prefix);
    await updateVisitBadge(r.id, prefix);
  }, q);
}

function searchContacts(inputId, resultsId, hiddenId, phoneId) {
  const q = document.getElementById(inputId).value.toLowerCase();
  const results = document.getElementById(resultsId);
  document.getElementById(hiddenId).value = '';
  if (q.length < 1) { results.classList.remove('open'); return; }
  const matches = contactCache.filter(r => r.fields.fullname && r.fields.fullname.toLowerCase().includes(q));
  renderResults(results, matches, r => ({
    main: r.fields.fullname,
    sub: r.fields.phonenumber || ''
  }), (r) => {
    document.getElementById(inputId).value = r.fields.fullname;
    document.getElementById(hiddenId).value = r.id;
    if (phoneId && document.getElementById(phoneId)) {
      document.getElementById(phoneId).value = r.fields.phonenumber || '';
    }
    results.classList.remove('open');
  });
}

function renderResults(container, items, labelFn, onSelect, query = '') {
  container.innerHTML = '';
  if (items.length === 0 && query) {
    const div = document.createElement('div');
    div.className = 'search-item new-item';
    div.textContent = t('newChurch');
    container.appendChild(div);
  }
  items.slice(0, 6).forEach(r => {
    const div = document.createElement('div');
    div.className = 'search-item';
    const lbl = labelFn(r);
    div.innerHTML = `<div>${lbl.main}</div>${lbl.sub ? `<div class="sub">${lbl.sub}</div>` : ''}`;
    div.onclick = () => onSelect(r);
    container.appendChild(div);
  });
  container.classList.toggle('open', container.children.length > 0);
}

function autofillChurch(fields, prefix) {
  const map = {
    fv: { district: 'fv-district', vdc: 'fv-vdc', village: 'fv-village', province: 'fv-province' },
    cp: { district: 'cp-district', vdc: null, village: 'cp-village', province: 'cp-province' }
  };
  const m = map[prefix];
  if (m.district) setVal(m.district, fields.district || '');
  if (m.vdc) setVal(m.vdc, fields.vdc_mn || '');
  if (m.village) setVal(m.village, fields.village_area || '');
  if (m.province) setVal(m.province, fields.province || '');
}

function clearChurchAutofill(prefix) {
  if (prefix === 'fv') {
    ['fv-district', 'fv-vdc', 'fv-village', 'fv-province'].forEach(id => setVal(id, ''));
    document.getElementById('fv-visit-badge').classList.remove('show');
  } else {
    document.getElementById('cp-visit-badge').classList.remove('show');
  }
}

function setVal(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val;
}

function handleVisitTypeChange() {
  const visitType = document.getElementById('fv-visittype').value;
  const isFirstVisit = visitType === 'First Visit';
  const locationFields = ['fv-district', 'fv-vdc', 'fv-village', 'fv-province'];

  locationFields.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    if (isFirstVisit) {
      el.removeAttribute('readonly');
      el.removeAttribute('data-t-ph');
      el.placeholder = '';
    } else {
      el.setAttribute('readonly', 'readonly');
      el.setAttribute('data-t-ph', 'autoFilled');
      el.placeholder = t('autoFilled');
    }
  });
}

async function updateVisitBadge(churchId, prefix) {
  try {
    const visits = await fetchAll('FieldVisits');
    const count = visits.filter(r => r.fields.church === churchId).length;
    if (prefix === 'fv') {
      document.getElementById('fv-visit-count').textContent = t('visitBadge', count + 1);
      document.getElementById('fv-visit-badge').classList.add('show');
    } else {
      const groups = await fetchAll('Groups');
      const gCount = groups.filter(r => r.fields.church === churchId).length;
      document.getElementById('cp-group-count').textContent = t('groupBadge', gCount);
      document.getElementById('cp-visit-badge').classList.add('show');
    }
  } catch (e) { }
}

// =============================================
// CONTACTS (Field Visit — multiple)
// =============================================
function addContact() {
  contactCount++;
  const cc = contactCount;
  const container = document.getElementById('fv-contacts-container');
  const div = document.createElement('div');
  div.className = 'group-card';
  div.id = `contact-card-${cc}`;
  div.innerHTML = `
    <div class="group-card-header">
      <span>${t('contactNum', cc)}</span>
      ${cc > 1 ? `<button class="remove-btn" onclick="removeContact(${cc})">×</button>` : ''}
    </div>
    <div class="group-card-body">
      <div class="field">
        <label>${t('contactPersonLabel')} ${cc === 1 ? '<span class="req">*</span>' : ''}</label>
        <div class="search-wrapper">
          <input type="text" id="fv-contact-${cc}" placeholder="${t('searchContact')}" oninput="searchContacts('fv-contact-${cc}','fv-contact-results-${cc}','fv-contact-id-${cc}','fv-phone-${cc}')" autocomplete="off"/>
          <input type="hidden" id="fv-contact-id-${cc}"/>
          <div class="search-results" id="fv-contact-results-${cc}"></div>
        </div>
      </div>
      <div class="two-col">
        <div class="field">
          <label>${t('phoneLabel')}</label>
          <input type="tel" id="fv-phone-${cc}" placeholder="${t('phonePh')}"/>
        </div>
        <div class="field">
          <label>${t('roleLabel')}</label>
          <select id="fv-role-${cc}">
            <option value="Pastor">${t('pastor')}</option>
            <option value="Deacon">${t('deacon')}</option>
            <option value="Member">${t('member')}</option>
          </select>
        </div>
      </div>
      <div class="two-col">
        <div class="field">
          <label>${t('ageLabel')}</label>
          <input type="number" id="fv-age-${cc}" min="1" max="150" placeholder="${t('agePh')}"/>
        </div>
        <div class="field">
          <label>${t('genderLabel')}</label>
          <select id="fv-gender-${cc}">
            <option value="Male">${t('male')}</option>
            <option value="Female">${t('female')}</option>
            <option value="Other">${t('other')}</option>
          </select>
        </div>
      </div>
    </div>
  `;
  container.appendChild(div);
}

function removeContact(cc) {
  const el = document.getElementById(`contact-card-${cc}`);
  if (el) el.remove();
}

// =============================================
// GROUPS (Partnership Form)
// =============================================
function addGroup() {
  groupCount++;
  const gc = groupCount;
  const container = document.getElementById('cp-groups-container');
  const div = document.createElement('div');
  div.className = 'group-card';
  div.id = `group-${gc}`;
  div.innerHTML = `
    <div class="group-card-header">
      <span>${t('groupsSection')} #${gc}</span>
      <button class="remove-btn" onclick="removeGroup(${gc})">×</button>
    </div>
    <div class="group-card-body">
      <div class="field">
        <label>${t('groupType')}</label>
        <select id="g${gc}-type">
          <option value="Home Group">${t('homeGroup')}</option>
          <option value="Scripture Engagement Book">${t('scriptureBook')}</option>
        </select>
      </div>
      <div class="two-col">
        <div class="field">
          <label>${t('groupLeaderName')}</label>
          <input type="text" id="g${gc}-leader" placeholder="${t('searchContact')}"/>
        </div>
        <div class="field">
          <label>${t('groupLeaderPhone')}</label>
          <input type="tel" id="g${gc}-leader-phone" placeholder="${t('phonePh')}"/>
        </div>
      </div>
      <div class="field">
        <label>${t('bookName')}</label>
        <input type="text" id="g${gc}-book" placeholder="Book being studied..."/>
      </div>
      <div class="two-col">
        <div class="field">
          <label>${t('dayOfMeeting')}</label>
          <select id="g${gc}-day">
            <option value="Sunday">${t('sunday')}</option>
            <option value="Monday">${t('monday')}</option>
            <option value="Tuesday">${t('tuesday')}</option>
            <option value="Wednesday">${t('wednesday')}</option>
            <option value="Thursday">${t('thursday')}</option>
            <option value="Friday">${t('friday')}</option>
            <option value="Saturday">${t('saturday')}</option>
          </select>
        </div>
        <div class="field">
          <label>${t('ministry')}</label>
          <input type="text" id="g${gc}-ministry" placeholder="Ministry focus..."/>
        </div>
      </div>
      <div style="margin-top:8px;">
        <div style="font-size:12px;font-weight:600;color:#374151;margin-bottom:6px;">👥 ${t('addMember').replace('+ ', 'Members')}</div>
        <div style="display:grid;grid-template-columns:1fr 50px 70px 36px;gap:4px;margin-bottom:4px;">
          <div class="member-label">${t('memberName')}</div>
          <div class="member-label">${t('memberAge')}</div>
          <div class="member-label">${t('memberGender')}</div>
          <div class="member-label">${t('groupLeader')}</div>
        </div>
        <div id="g${gc}-members"></div>
        <button class="add-member-btn" onclick="addMember(${gc})">${t('addMember')}</button>
      </div>
    </div>
  `;
  container.appendChild(div);
  addMember(gc);
}

function removeGroup(gc) {
  const el = document.getElementById(`group-${gc}`);
  if (el) el.remove();
}

let memberCount = 0;
function addMember(gc) {
  memberCount++;
  const mc = memberCount;
  const container = document.getElementById(`g${gc}-members`);
  const row = document.createElement('div');
  row.className = 'member-row';
  row.id = `member-${gc}-${mc}`;
  row.innerHTML = `
    <div>
      <input type="text" id="m${gc}-${mc}-name" placeholder="${t('memberName')}"/>
    </div>
    <div>
      <input type="number" id="m${gc}-${mc}-age" placeholder="25" min="1" max="120"/>
    </div>
    <div>
      <select id="m${gc}-${mc}-gender">
        <option value="Male">${t('male')}</option>
        <option value="Female">${t('female')}</option>
        <option value="Other">${t('other')}</option>
      </select>
    </div>
    <div class="leader-toggle">
      <span>${t('groupLeader')}</span>
      <input type="checkbox" id="m${gc}-${mc}-leader"/>
    </div>
  `;
  container.appendChild(row);
}

// =============================================
// OFFLINE SUPPORT
// =============================================
function isOnline() { return navigator.onLine; }

function saveOffline(type, data) {
  const queue = JSON.parse(localStorage.getItem('fmtOfflineQueue') || '[]');
  queue.push({ type, data, timestamp: Date.now() });
  localStorage.setItem('fmtOfflineQueue', JSON.stringify(queue));
}

function getOfflineQueue() {
  return JSON.parse(localStorage.getItem('fmtOfflineQueue') || '[]');
}

function clearOfflineQueue() {
  localStorage.setItem('fmtOfflineQueue', '[]');
}

function showBanner(type, text) {
  const banner = document.getElementById('statusBanner');
  banner.className = `status-banner ${type}`;
  document.getElementById('statusText').textContent = text;
  if (type === 'synced') setTimeout(() => { banner.className = 'status-banner'; }, 4000);
}

window.addEventListener('online', async () => {
  const queue = getOfflineQueue();
  if (queue.length === 0) return;
  showBanner('syncing', t('syncingMsg'));
  await loadCaches();
  let synced = 0;
  for (const item of queue) {
    try {
      if (item.type === 'fieldvisit') await processFieldVisit(item.data);
      if (item.type === 'partnership') await processPartnership(item.data);
      synced++;
    } catch (e) { console.error('Sync error:', e); }
  }
  clearOfflineQueue();
  showBanner('synced', t('syncedMsg', synced));
});

window.addEventListener('offline', () => {
  showBanner('offline', t('offlineMsg'));
});

// =============================================
// FIELD VISIT SUBMIT
// =============================================
async function submitFieldVisit() {
  const exec = document.getElementById('fv-exec').value.trim();
  const church = document.getElementById('fv-church').value.trim();
  const date = document.getElementById('fv-date').value;

  // Collect all contact cards
  const contacts = [];
  document.querySelectorAll('[id^="contact-card-"]').forEach(card => {
    const cc = card.id.replace('contact-card-', '');
    const name = document.getElementById(`fv-contact-${cc}`)?.value.trim();
    if (name) {
      contacts.push({
        name,
        id: document.getElementById(`fv-contact-id-${cc}`)?.value || '',
        phone: document.getElementById(`fv-phone-${cc}`)?.value || '',
        role: document.getElementById(`fv-role-${cc}`)?.value || 'Member',
        age: document.getElementById(`fv-age-${cc}`)?.value || '',
        gender: document.getElementById(`fv-gender-${cc}`)?.value || 'Male',
      });
    }
  });

  if (!exec || !church || contacts.length === 0 || !date) {
    alert(t('errorRequired'));
    return;
  }

  const btn = document.getElementById('fv-submit-btn');
  btn.disabled = true;
  btn.innerHTML = `<span class="spinner"></span>${t('saving')}`;

  const formData = {
    execName: exec,
    execId: document.getElementById('fv-exec-id').value,
    churchName: church,
    churchId: document.getElementById('fv-church-id').value,
    contacts,
    date,
    visittype: document.getElementById('fv-visittype').value,
    travelpurpose: document.getElementById('fv-travelpurpose').value,
    district: document.getElementById('fv-district').value,
    vdc: document.getElementById('fv-vdc').value,
    village: document.getElementById('fv-village').value,
    province: document.getElementById('fv-province').value,
    demographic: document.getElementById('fv-demographic').value,
    numpeople: document.getElementById('fv-numpeople').value,
    timespent: document.getElementById('fv-timespent').value,
    followup: document.getElementById('fv-followup').value,
    nextaction: document.getElementById('fv-nextaction').value,
    ministry: document.getElementById('fv-ministry').value,
    response: document.getElementById('fv-response').value,
    testimony: document.getElementById('fv-testimony').value,
    prayer: document.getElementById('fv-prayer').value,
    comments: document.getElementById('fv-comments').value,
  };

  if (!isOnline()) {
    saveOffline('fieldvisit', formData);
    showBanner('offline', t('offlineMsg'));
    showFVSuccess(church, '?');
    btn.disabled = false;
    btn.innerHTML = `<span data-t="submitVisit">${t('submitVisit')}</span>`;
    return;
  }

  try {
    const visitNum = await processFieldVisit(formData);
    showFVSuccess(church, visitNum);
  } catch (e) {
    alert('Error saving: ' + e.message);
  }

  btn.disabled = false;
  btn.innerHTML = `<span data-t="submitVisit">${t('submitVisit')}</span>`;
}

async function processFieldVisit(d) {
  // Find or create field executive
  let execId = d.execId;
  if (!execId) {
    const r = await findOrCreate('FieldExecutives',
      { name: d.execName, phonenumber: '', ministryarea: '' },
      f => f.name === d.execName
    );
    execId = r.id;
  }

  // Find or create church
  let churchId = d.churchId;
  if (!churchId) {
    const r = await findOrCreate('Churches',
      { churchname: d.churchName, district: d.district, vdc_mn: d.vdc, village_area: d.village, province: d.province, demographic: d.demographic },
      f => f.churchname === d.churchName && f.district === d.district
    );
    churchId = r.id;
  }

  // Find or create all contacts; use the first contact as the primary visit contact
  const contacts = d.contacts || [];
  let primaryContactId = null;
  for (const c of contacts) {
    let cId = c.id;
    if (!cId) {
      const r = await findOrCreate('Contacts',
        { fullname: c.name, phonenumber: c.phone, role: c.role, agegroup: c.age ? c.age.toString() : '', gender: c.gender, church: churchId },
        f => f.fullname === c.name && f.phonenumber === c.phone
      );
      cId = r.id;
    }
    if (!primaryContactId) primaryContactId = cId;
  }

  // Count existing visits to this church
  const visits = await fetchAll('FieldVisits');
  const visitNum = visits.filter(r => r.fields.church === churchId).length + 1;

  // Always create new visit
  await addRecord('FieldVisits', {
    date: d.date,
    fieldexecutive: execId,
    church: churchId,
    contact: primaryContactId,
    visittype: d.visittype,
    travelpurpose: d.travelpurpose,
    numberofpeople: parseInt(d.numpeople) || 0,
    timespent: d.timespent,
    followupneeded: d.followup,
    nextplannedaction: d.nextaction,
    ministrypromoted: d.ministry,
    peopleresponse: d.response,
    shorttestimony: d.testimony,
    prayerrequest: d.prayer,
    comments: d.comments,
    visitnumber: visitNum
  });

  await loadCaches();
  return visitNum;
}

function showFVSuccess(churchName, visitNum) {
  document.getElementById('fv-form').style.display = 'none';
  document.getElementById('fv-submit-area').style.display = 'none';
  const msg = visitNum === '?' ? t('offlineMsg') : t('visitBadge', visitNum);
  document.getElementById('fv-success-msg').textContent = `${churchName} — ${msg}`;
  document.getElementById('fv-success').classList.add('show');
}

function resetFieldVisit() {
  document.getElementById('fv-form').style.display = '';
  document.getElementById('fv-submit-area').style.display = '';
  document.getElementById('fv-success').classList.remove('show');
  document.getElementById('fv-exec').value = '';
  document.getElementById('fv-exec-id').value = '';
  document.getElementById('fv-church').value = '';
  document.getElementById('fv-church-id').value = '';
  document.getElementById('fv-district').value = '';
  document.getElementById('fv-vdc').value = '';
  document.getElementById('fv-village').value = '';
  document.getElementById('fv-province').value = '';
  document.getElementById('fv-numpeople').value = '';
  document.getElementById('fv-timespent').value = '';
  document.getElementById('fv-ministry').value = '';
  document.getElementById('fv-testimony').value = '';
  document.getElementById('fv-prayer').value = '';
  document.getElementById('fv-comments').value = '';
  document.getElementById('fv-travelpurpose').value = '';
  document.getElementById('fv-visittype').value = 'First Visit';
  document.getElementById('fv-visit-badge').classList.remove('show');
  // Reset contacts: clear container and add one fresh card
  document.getElementById('fv-contacts-container').innerHTML = '';
  contactCount = 0;
  addContact();
  setToday('fv-date');
  handleVisitTypeChange();
}

// =============================================
// PARTNERSHIP SUBMIT
// =============================================
async function submitPartnership() {
  const exec = document.getElementById('cp-exec').value.trim();
  const church = document.getElementById('cp-church').value.trim();
  const date = document.getElementById('cp-date').value;

  if (!exec || !church || !date) {
    alert(t('errorRequired'));
    return;
  }

  const btn = document.getElementById('cp-submit-btn');
  btn.disabled = true;
  btn.innerHTML = `<span class="spinner"></span>${t('saving')}`;

  const groups = [];
  document.querySelectorAll('[id^="group-"]').forEach(gc => {
    const gcId = gc.id.replace('group-', '');
    const members = [];
    gc.querySelectorAll('[id^="member-"]').forEach(mr => {
      const parts = mr.id.split('-');
      const g = parts[1], m = parts[2];
      const name = document.getElementById(`m${g}-${m}-name`)?.value.trim();
      if (name) {
        members.push({
          name,
          age: document.getElementById(`m${g}-${m}-age`)?.value || '',
          gender: document.getElementById(`m${g}-${m}-gender`)?.value || 'Male',
          isleader: document.getElementById(`m${g}-${m}-leader`)?.checked || false
        });
      }
    });
    groups.push({
      type: document.getElementById(`g${gcId}-type`)?.value,
      leaderName: document.getElementById(`g${gcId}-leader`)?.value.trim(),
      leaderPhone: document.getElementById(`g${gcId}-leader-phone`)?.value.trim(),
      bookname: document.getElementById(`g${gcId}-book`)?.value.trim(),
      day: document.getElementById(`g${gcId}-day`)?.value,
      ministry: document.getElementById(`g${gcId}-ministry`)?.value.trim(),
      members
    });
  });

  const formData = {
    execName: exec,
    execId: document.getElementById('cp-exec-id').value,
    churchName: church,
    churchId: document.getElementById('cp-church-id').value,
    province: document.getElementById('cp-province').value,
    district: document.getElementById('cp-district').value,
    village: document.getElementById('cp-village').value,
    date,
    groups
  };

  if (!isOnline()) {
    saveOffline('partnership', formData);
    showBanner('offline', t('offlineMsg'));
    showCPSuccess(church, groups.length);
    btn.disabled = false;
    btn.innerHTML = `<span data-t="submitPartnership">${t('submitPartnership')}</span>`;
    return;
  }

  try {
    await processPartnership(formData);
    showCPSuccess(church, groups.length);
  } catch (e) {
    alert('Error saving: ' + e.message);
  }

  btn.disabled = false;
  btn.innerHTML = `<span data-t="submitPartnership">${t('submitPartnership')}</span>`;
}

async function processPartnership(d) {
  let execId = d.execId;
  if (!execId) {
    const r = await findOrCreate('FieldExecutives',
      { name: d.execName, phonenumber: '', ministryarea: '' },
      f => f.name === d.execName
    );
    execId = r.id;
  }

  let churchId = d.churchId;
  if (!churchId) {
    const r = await findOrCreate('Churches',
      { churchname: d.churchName, province: d.province, district: d.district, village_area: d.village, ispartner: true, partnershipstatus: 'Active' },
      f => f.churchname === d.churchName && f.district === d.district
    );
    churchId = r.id;
  }

  for (const g of d.groups) {
    // Find or create leader contact
    let leaderId = null;
    if (g.leaderName) {
      const lr = await findOrCreate('Contacts',
        { fullname: g.leaderName, phonenumber: g.leaderPhone || '', role: 'Home Group Leader', church: churchId },
        f => f.fullname === g.leaderName && f.phonenumber === (g.leaderPhone || '')
      );
      leaderId = lr.id;
    }

    // Find or create group
    const gr = await findOrCreate('Groups',
      { church: churchId, grouptype: g.type, groupleader: leaderId, bookname: g.bookname, dayofmeeting: g.day, ministry: g.ministry, isactive: true },
      f => f.church === churchId && f.grouptype === g.type
    );
    const groupId = gr.id;

    // Add members
    for (const m of g.members) {
      const mr = await findOrCreate('Contacts',
        { fullname: m.name, phonenumber: '', agegroup: m.age ? `Age ${m.age}` : '', gender: m.gender, church: churchId },
        f => f.fullname === m.name && f.church === churchId
      );
      await findOrCreate('GroupMembers',
        { group: groupId, member: mr.id, isgroupleader: m.isleader },
        f => f.group === groupId && f.member === mr.id
      );
    }
  }
  await loadCaches();
}

function showCPSuccess(churchName, groupCount) {
  document.getElementById('cp-form').style.display = 'none';
  document.getElementById('cp-submit-area').style.display = 'none';
  document.getElementById('cp-success-msg').textContent = `${churchName} — ${groupCount} group(s) saved`;
  document.getElementById('cp-success').classList.add('show');
}

function resetPartnership() {
  document.getElementById('cp-form').style.display = '';
  document.getElementById('cp-submit-area').style.display = '';
  document.getElementById('cp-success').classList.remove('show');
  document.getElementById('cp-exec').value = '';
  document.getElementById('cp-exec-id').value = '';
  document.getElementById('cp-church').value = '';
  document.getElementById('cp-church-id').value = '';
  document.getElementById('cp-province').value = '';
  document.getElementById('cp-district').value = '';
  document.getElementById('cp-village').value = '';
  document.getElementById('cp-groups-container').innerHTML = '';
  document.getElementById('cp-visit-badge').classList.remove('show');
  groupCount = 0;
  memberCount = 0;
  setToday('cp-date');
}

// =============================================
// TAB SWITCHING
// =============================================
function switchTab(n) {
  document.getElementById('tab1').classList.toggle('active', n === 1);
  document.getElementById('tab2').classList.toggle('active', n === 2);
  document.getElementById('page1').classList.toggle('active', n === 1);
  document.getElementById('page2').classList.toggle('active', n === 2);
}

// =============================================
// INIT
// =============================================
function setToday(id) {
  const today = new Date().toISOString().split('T')[0];
  document.getElementById(id).value = today;
  document.getElementById(id).max = today;
}

document.addEventListener('click', e => {
  if (!e.target.closest('.search-wrapper')) {
    document.querySelectorAll('.search-results').forEach(r => r.classList.remove('open'));
  }
});

async function init() {
  setToday('fv-date');
  setToday('cp-date');
  applyTranslations();
  if (lang === 'ne') document.getElementById('langLabel').textContent = 'EN';
  if (!isOnline()) showBanner('offline', t('offlineMsg'));
  handleVisitTypeChange();
  // Add the first default contact card
  addContact();
  await loadCaches();
}

init();