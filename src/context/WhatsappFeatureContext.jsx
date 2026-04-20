import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from './AuthContext';

const WhatsappFeatureContext = createContext(null);

const STORAGE_KEY = 'solace-whatsapp-feature-state-v1';
const DAY_MS = 24 * 60 * 60 * 1000;

function slugify(value = '') {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48) || `writer-${Date.now()}`;
}

function normalizePhoneNumber(value = '') {
  const digits = String(value).replace(/[^\d+]/g, '');
  if (!digits) return '';

  if (digits.startsWith('+')) {
    return `+${digits.slice(1).replace(/\D/g, '')}`;
  }

  const cleanDigits = digits.replace(/\D/g, '');
  if (cleanDigits.length === 10) return `+91${cleanDigits}`;
  if (cleanDigits.length > 10) return `+${cleanDigits}`;
  return cleanDigits;
}

function maskPhoneNumber(value = '') {
  const normalized = normalizePhoneNumber(value);
  if (!normalized || normalized.length < 6) return normalized;
  return `${normalized.slice(0, 4)}****${normalized.slice(-2)}`;
}

function sanitizePoemText(value = '') {
  return String(value)
    .replace(/\r/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function hashString(value = '') {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }
  return `hash-${Math.abs(hash)}`;
}

function inferPoemType(content = '') {
  const lines = content.split('\n').filter(Boolean);
  if (lines.length <= 2) return 'Sher';
  if (lines.length <= 8) return 'Ghazal';
  return 'Nazm';
}

function inferTitle(content = '') {
  const firstLine = content.split('\n').find((line) => line.trim());
  if (!firstLine) return 'Untitled Submission';
  return firstLine.trim().slice(0, 56);
}

function createSubmissionId(prefix = 'sub') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function validatePoemContent(content = '') {
  const sanitized = sanitizePoemText(content);
  const issues = [];

  if (sanitized.length < 16) issues.push('Poem is too short to review.');
  if (sanitized.length > 4000) issues.push('Poem exceeds the current WhatsApp ingestion limit.');
  if (!/[A-Za-z\u0600-\u06FF\u0900-\u097F]/.test(sanitized)) issues.push('Poem must contain readable text.');
  if (/(https?:\/\/|www\.)/i.test(sanitized)) issues.push('Links are not allowed in WhatsApp poetry submissions.');
  if (/([!?.])\1{5,}/.test(sanitized)) issues.push('Submission looks malformed or spam-like.');

  return {
    sanitized,
    isValid: issues.length === 0,
    issues,
  };
}

function buildSeedSubmission({
  id,
  authorId,
  phoneNumber,
  content,
  createdAt,
  status,
  publishedAt = null,
  reviewNotes = '',
}) {
  const normalizedContent = sanitizePoemText(content);
  return {
    id,
    authorId,
    source: 'whatsapp',
    phoneNumber,
    title: inferTitle(normalizedContent),
    poemType: inferPoemType(normalizedContent),
    rawContent: content,
    normalizedContent,
    contentHash: hashString(normalizedContent.toLowerCase()),
    status,
    moderationMode: 'manual_review',
    reviewNotes,
    createdAt,
    updatedAt: createdAt,
    matchedAt: createdAt,
    publishedAt,
    rejectedAt: status === 'rejected' ? createdAt : null,
    visibility: status === 'published' ? 'public' : 'private',
    submittedBy: 'whatsapp_bot',
  };
}

function getSeedState() {
  const now = Date.now();

  return {
    featureConfig: {
      moderationMode: 'manual_review',
      autoPublishKnownAuthors: false,
      maxDailySubmissionsPerPhone: 5,
    },
    authors: [
      {
        id: 'author-aaliya-sahir',
        userId: null,
        slug: 'aaliya-sahir',
        displayName: 'Aaliya Sahir',
        bio: 'Writes city poems that sit between old Urdu cadence and modern Delhi speech.',
        hometown: 'Delhi',
        createdAt: now - 16 * DAY_MS,
        updatedAt: now - 2 * DAY_MS,
      },
      {
        id: 'author-rahim-falak',
        userId: null,
        slug: 'rahim-falak',
        displayName: 'Rahim Falak',
        bio: 'Short-form poet with a preference for compact shers and late-night voice notes turned into text.',
        hometown: 'Lucknow',
        createdAt: now - 12 * DAY_MS,
        updatedAt: now - DAY_MS,
      },
    ],
    phoneLinks: [
      {
        id: 'phone-link-aaliya',
        authorId: 'author-aaliya-sahir',
        phoneNumber: '+919810000111',
        verifiedAt: now - 16 * DAY_MS,
        createdAt: now - 16 * DAY_MS,
        source: 'account_link',
        status: 'active',
      },
      {
        id: 'phone-link-rahim',
        authorId: 'author-rahim-falak',
        phoneNumber: '+919810000222',
        verifiedAt: now - 12 * DAY_MS,
        createdAt: now - 12 * DAY_MS,
        source: 'account_link',
        status: 'active',
      },
    ],
    submissions: [
      buildSeedSubmission({
        id: 'sub-seed-1',
        authorId: 'author-aaliya-sahir',
        phoneNumber: '+919810000111',
        content: `Raat ke dhaage se bandh kar rakhi hai maine\nSubah ki ek patli si roshni ab tak`,
        createdAt: now - 8 * DAY_MS,
        status: 'published',
        publishedAt: now - 7 * DAY_MS,
      }),
      buildSeedSubmission({
        id: 'sub-seed-2',
        authorId: 'author-aaliya-sahir',
        phoneNumber: '+919810000111',
        content: `Tum ne jo naam liya tha hawa ke saamne\nAaj tak us mod par khushbu tikti rehti hai`,
        createdAt: now - 3 * DAY_MS,
        status: 'pending_review',
      }),
      buildSeedSubmission({
        id: 'sub-seed-3',
        authorId: 'author-rahim-falak',
        phoneNumber: '+919810000222',
        content: `Dil ko bhi aadat thi safar ki shayad\nGhar mein raha aur raaste likhta raha`,
        createdAt: now - 6 * DAY_MS,
        status: 'published',
        publishedAt: now - 5 * DAY_MS,
      }),
      buildSeedSubmission({
        id: 'sub-seed-4',
        authorId: 'author-rahim-falak',
        phoneNumber: '+919810000222',
        content: `Sale sale sale!!! visit www.fake-link.test now`,
        createdAt: now - 2 * DAY_MS,
        status: 'rejected',
        reviewNotes: 'Rejected by spam guard because the message contained a promotional link.',
      }),
    ],
    unmatchedSubmissions: [
      {
        id: 'unmatched-seed-1',
        source: 'whatsapp',
        phoneNumber: '+919810000333',
        rawContent: `Aangan mein rakh diya hai maine ik adhoora sher\nJo samjhe woh mere naam ke baghair samjhe`,
        normalizedContent: sanitizePoemText(`Aangan mein rakh diya hai maine ik adhoora sher\nJo samjhe woh mere naam ke baghair samjhe`),
        contentHash: hashString(
          sanitizePoemText(`Aangan mein rakh diya hai maine ik adhoora sher\nJo samjhe woh mere naam ke baghair samjhe`).toLowerCase()
        ),
        title: 'Aangan mein rakh diya hai maine ik adhoora sher',
        poemType: 'Sher',
        createdAt: now - 18 * 60 * 60 * 1000,
        updatedAt: now - 18 * 60 * 60 * 1000,
        status: 'awaiting_link',
        reviewNotes: 'Sender has not linked a website account yet.',
      },
    ],
    moderationLogs: [
      {
        id: 'log-seed-1',
        submissionId: 'sub-seed-1',
        action: 'published',
        moderatorName: 'System seed',
        notes: 'Seeded as already visible on the public profile.',
        createdAt: now - 7 * DAY_MS,
      },
      {
        id: 'log-seed-2',
        submissionId: 'sub-seed-4',
        action: 'rejected',
        moderatorName: 'System seed',
        notes: 'Spam example for moderation dashboard.',
        createdAt: now - 2 * DAY_MS,
      },
    ],
  };
}

function loadState() {
  if (typeof window === 'undefined') return getSeedState();

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return getSeedState();
    const parsed = JSON.parse(saved);

    if (
      parsed?.featureConfig &&
      Array.isArray(parsed?.authors) &&
      Array.isArray(parsed?.phoneLinks) &&
      Array.isArray(parsed?.submissions) &&
      Array.isArray(parsed?.unmatchedSubmissions) &&
      Array.isArray(parsed?.moderationLogs)
    ) {
      return parsed;
    }
  } catch (error) {
    console.error('Error loading WhatsApp feature state:', error);
  }

  return getSeedState();
}

function buildDerivedAuthors(authors, phoneLinks, submissions) {
  return authors.map((author) => {
    const authorLinks = phoneLinks.filter((link) => link.authorId === author.id && link.status === 'active');
    const authorSubmissions = submissions.filter((submission) => submission.authorId === author.id);
    const publishedWorks = authorSubmissions.filter((submission) => submission.status === 'published');
    const pendingWorks = authorSubmissions.filter((submission) => submission.status === 'pending_review');

    return {
      ...author,
      linkedPhones: authorLinks,
      linkedPhoneNumber: authorLinks[0]?.phoneNumber || '',
      publishedWorks,
      pendingWorks,
      submissionCount: authorSubmissions.length,
      publishedCount: publishedWorks.length,
      pendingCount: pendingWorks.length,
    };
  });
}

export function WhatsappFeatureProvider({ children }) {
  const { user } = useAuth();
  const [featureState, setFeatureState] = useState(loadState);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(featureState));
    } catch (error) {
      console.error('Error saving WhatsApp feature state:', error);
    }
  }, [featureState]);

  const ensureAuthorForUser = useCallback((currentUser, nextState) => {
    if (!currentUser) return nextState;

    const existing = nextState.authors.find((author) => author.userId === currentUser.id);
    if (existing) return nextState;

    const baseSlug = slugify(currentUser.name);
    const existingSlugs = new Set(nextState.authors.map((author) => author.slug));
    let finalSlug = baseSlug;
    let suffix = 2;

    while (existingSlugs.has(finalSlug)) {
      finalSlug = `${baseSlug}-${suffix}`;
      suffix += 1;
    }

    return {
      ...nextState,
      authors: [
        ...nextState.authors,
        {
          id: `author-${currentUser.id}`,
          userId: currentUser.id,
          slug: finalSlug,
          displayName: currentUser.name,
          bio: 'Joined through the WhatsApp poetry submission flow.',
          hometown: 'Not added yet',
          createdAt: currentUser.createdAt || Date.now(),
          updatedAt: Date.now(),
        },
      ],
    };
  }, []);

  useEffect(() => {
    if (!user) return;

    setFeatureState((prevState) => {
      let nextState = ensureAuthorForUser(user, prevState);

      if (user.contactType === 'phone') {
        const normalizedPhone = normalizePhoneNumber(user.contact);
        const author = nextState.authors.find((entry) => entry.userId === user.id);

        if (
          normalizedPhone &&
          author &&
          !nextState.phoneLinks.some((link) => link.phoneNumber === normalizedPhone && link.status === 'active')
        ) {
          nextState = {
            ...nextState,
            phoneLinks: [
              ...nextState.phoneLinks,
              {
                id: `phone-link-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
                authorId: author.id,
                phoneNumber: normalizedPhone,
                verifiedAt: Date.now(),
                createdAt: Date.now(),
                source: 'auth_phone_auto_link',
                status: 'active',
              },
            ],
          };
        }
      }

      return nextState;
    });
  }, [ensureAuthorForUser, user]);

  const setModerationMode = useCallback((mode) => {
    setFeatureState((prevState) => ({
      ...prevState,
      featureConfig: {
        ...prevState.featureConfig,
        moderationMode: mode,
        autoPublishKnownAuthors: mode === 'auto_publish_known_authors',
      },
    }));
  }, []);

  const linkWhatsappNumber = useCallback((currentUser, rawPhoneNumber) => {
    const phoneNumber = normalizePhoneNumber(rawPhoneNumber);
    if (!currentUser) return { ok: false, error: 'You must be signed in before linking a WhatsApp number.' };
    if (!phoneNumber || phoneNumber.length < 12) return { ok: false, error: 'Enter a valid WhatsApp number in E.164 format.' };

    let result = { ok: false, migratedCount: 0, phoneNumber };

    setFeatureState((prevState) => {
      let nextState = ensureAuthorForUser(currentUser, prevState);
      const author = nextState.authors.find((entry) => entry.userId === currentUser.id);
      const phoneAlreadyLinked = nextState.phoneLinks.find((link) => link.phoneNumber === phoneNumber && link.status === 'active');

      if (phoneAlreadyLinked && phoneAlreadyLinked.authorId !== author.id) {
        result = { ok: false, error: 'This WhatsApp number is already linked to another author.' };
        return prevState;
      }

      if (!phoneAlreadyLinked) {
        nextState = {
          ...nextState,
          phoneLinks: [
            ...nextState.phoneLinks,
            {
              id: `phone-link-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
              authorId: author.id,
              phoneNumber,
              verifiedAt: Date.now(),
              createdAt: Date.now(),
              source: 'account_link',
              status: 'active',
            },
          ],
        };
      }

      const matchedUnmatched = nextState.unmatchedSubmissions.filter((submission) => submission.phoneNumber === phoneNumber);
      const now = Date.now();

      const migratedSubmissions = matchedUnmatched.map((submission) => {
        const status = nextState.featureConfig.autoPublishKnownAuthors ? 'published' : 'pending_review';
        return {
          id: createSubmissionId('sub'),
          authorId: author.id,
          source: 'whatsapp',
          phoneNumber,
          title: submission.title,
          poemType: submission.poemType,
          rawContent: submission.rawContent,
          normalizedContent: submission.normalizedContent,
          contentHash: submission.contentHash,
          status,
          moderationMode: nextState.featureConfig.moderationMode,
          reviewNotes: 'Linked from the unmatched submissions queue.',
          createdAt: submission.createdAt,
          updatedAt: now,
          matchedAt: now,
          publishedAt: status === 'published' ? now : null,
          rejectedAt: null,
          visibility: status === 'published' ? 'public' : 'private',
          linkedFromUnmatchedId: submission.id,
          submittedBy: 'whatsapp_bot',
        };
      });

      const logs = migratedSubmissions.map((submission) => ({
        id: `log-${submission.id}`,
        submissionId: submission.id,
        action: submission.status === 'published' ? 'published' : 'queued_for_review',
        moderatorName: 'System',
        notes: 'Submission moved from unmatched queue after phone verification.',
        createdAt: now,
      }));

      nextState = {
        ...nextState,
        submissions: [...migratedSubmissions, ...nextState.submissions],
        unmatchedSubmissions: nextState.unmatchedSubmissions.filter((submission) => submission.phoneNumber !== phoneNumber),
        moderationLogs: [...logs, ...nextState.moderationLogs],
      };

      result = { ok: true, phoneNumber, migratedCount: migratedSubmissions.length };
      return nextState;
    });

    return result;
  }, [ensureAuthorForUser]);

  const submitWhatsappPoem = useCallback(({ phoneNumber: rawPhoneNumber, messageText }) => {
    const phoneNumber = normalizePhoneNumber(rawPhoneNumber);
    const validation = validatePoemContent(messageText);

    if (!phoneNumber || phoneNumber.length < 12) return { ok: false, error: 'WhatsApp sender number is missing or invalid.' };
    if (!validation.isValid) return { ok: false, error: validation.issues[0] };

    let result = { ok: false, phoneNumber };

    setFeatureState((prevState) => {
      const now = Date.now();
      const recentCount =
        prevState.submissions.filter((submission) => submission.phoneNumber === phoneNumber && now - submission.createdAt < DAY_MS).length +
        prevState.unmatchedSubmissions.filter((submission) => submission.phoneNumber === phoneNumber && now - submission.createdAt < DAY_MS).length;

      if (recentCount >= prevState.featureConfig.maxDailySubmissionsPerPhone) {
        result = { ok: false, error: 'Daily submission limit reached for this number.' };
        return prevState;
      }

      const normalizedContent = validation.sanitized;
      const contentHash = hashString(normalizedContent.toLowerCase());
      const existingMatch = [...prevState.submissions, ...prevState.unmatchedSubmissions].find(
        (submission) => submission.phoneNumber === phoneNumber && submission.contentHash === contentHash
      );

      if (existingMatch) {
        result = { ok: false, error: 'Duplicate poem detected for this WhatsApp number.' };
        return prevState;
      }

      const linkedPhone = prevState.phoneLinks.find((link) => link.phoneNumber === phoneNumber && link.status === 'active');
      const baseRecord = {
        source: 'whatsapp',
        phoneNumber,
        title: inferTitle(normalizedContent),
        poemType: inferPoemType(normalizedContent),
        rawContent: messageText,
        normalizedContent,
        contentHash,
        createdAt: now,
        updatedAt: now,
      };

      if (!linkedPhone) {
        const unmatchedRecord = {
          id: createSubmissionId('unmatched'),
          ...baseRecord,
          status: 'awaiting_link',
          reviewNotes: 'Stored until the sender links their website account.',
        };

        result = { ok: true, type: 'unmatched', recordId: unmatchedRecord.id, phoneNumber, status: unmatchedRecord.status };

        return {
          ...prevState,
          unmatchedSubmissions: [unmatchedRecord, ...prevState.unmatchedSubmissions],
        };
      }

      const nextStatus = prevState.featureConfig.autoPublishKnownAuthors ? 'published' : 'pending_review';
      const submissionId = createSubmissionId('sub');
      const submission = {
        id: submissionId,
        authorId: linkedPhone.authorId,
        ...baseRecord,
        status: nextStatus,
        moderationMode: prevState.featureConfig.moderationMode,
        reviewNotes: nextStatus === 'published'
          ? 'Auto-published because the moderation mode allows trusted linked authors.'
          : 'Queued for moderation review.',
        matchedAt: now,
        publishedAt: nextStatus === 'published' ? now : null,
        rejectedAt: null,
        visibility: nextStatus === 'published' ? 'public' : 'private',
        submittedBy: 'whatsapp_bot',
      };

      const log = {
        id: `log-${submissionId}`,
        submissionId,
        action: nextStatus === 'published' ? 'published' : 'queued_for_review',
        moderatorName: nextStatus === 'published' ? 'System auto-publish' : 'System',
        notes: submission.reviewNotes,
        createdAt: now,
      };

      result = { ok: true, type: 'matched', recordId: submission.id, phoneNumber, status: submission.status };

      return {
        ...prevState,
        submissions: [submission, ...prevState.submissions],
        moderationLogs: [log, ...prevState.moderationLogs],
      };
    });

    return result;
  }, []);

  const moderateSubmission = useCallback(({ submissionId, action, moderatorName, notes = '' }) => {
    const nextStatusMap = {
      publish: 'published',
      reject: 'rejected',
      hold: 'pending_review',
    };
    const nextStatus = nextStatusMap[action];
    if (!submissionId) return { ok: false, error: 'Submission id is required.' };
    if (!nextStatus) return { ok: false, error: 'Unsupported moderation action.' };

    let updated = false;

    setFeatureState((prevState) => {
      const now = Date.now();
      const nextSubmissions = prevState.submissions.map((submission) => {
        if (submission.id !== submissionId) return submission;
        updated = true;
        return {
          ...submission,
          status: nextStatus,
          updatedAt: now,
          publishedAt: nextStatus === 'published' ? now : submission.publishedAt,
          rejectedAt: nextStatus === 'rejected' ? now : null,
          visibility: nextStatus === 'published' ? 'public' : 'private',
          reviewNotes: notes || submission.reviewNotes,
        };
      });

      if (!updated) return prevState;

      return {
        ...prevState,
        submissions: nextSubmissions,
        moderationLogs: [
          {
            id: `log-${submissionId}-${now}`,
            submissionId,
            action: nextStatus,
            moderatorName: moderatorName || 'Moderator',
            notes: notes || `Submission marked as ${nextStatus}.`,
            createdAt: now,
          },
          ...prevState.moderationLogs,
        ],
      };
    });

    return updated ? { ok: true } : { ok: false, error: 'Submission not found.' };
  }, []);

  const derivedAuthors = useMemo(
    () => buildDerivedAuthors(featureState.authors, featureState.phoneLinks, featureState.submissions),
    [featureState.authors, featureState.phoneLinks, featureState.submissions]
  );

  const currentAuthor = useMemo(() => {
    if (!user) return null;
    return derivedAuthors.find((author) => author.userId === user.id) || null;
  }, [derivedAuthors, user]);

  const value = useMemo(() => ({
    featureConfig: featureState.featureConfig,
    authors: derivedAuthors,
    submissions: [...featureState.submissions].sort((a, b) => b.createdAt - a.createdAt),
    unmatchedSubmissions: [...featureState.unmatchedSubmissions].sort((a, b) => b.createdAt - a.createdAt),
    moderationLogs: [...featureState.moderationLogs].sort((a, b) => b.createdAt - a.createdAt),
    currentAuthor,
    ensureAuthorForUser,
    linkWhatsappNumber,
    submitWhatsappPoem,
    moderateSubmission,
    setModerationMode,
    getAuthorBySlug: (slug) => derivedAuthors.find((author) => author.slug === slug) || null,
    getPublishedSubmissionsByAuthorId: (authorId) => featureState.submissions.filter(
      (submission) => submission.authorId === authorId && submission.status === 'published'
    ),
    getSubmissionsByAuthorId: (authorId) => featureState.submissions.filter((submission) => submission.authorId === authorId),
    normalizePhoneNumber,
    maskPhoneNumber,
  }), [
    currentAuthor,
    derivedAuthors,
    ensureAuthorForUser,
    featureState.featureConfig,
    featureState.moderationLogs,
    featureState.submissions,
    featureState.unmatchedSubmissions,
    linkWhatsappNumber,
    moderateSubmission,
    setModerationMode,
    submitWhatsappPoem,
  ]);

  return (
    <WhatsappFeatureContext.Provider value={value}>
      {children}
    </WhatsappFeatureContext.Provider>
  );
}

export function useWhatsappFeature() {
  const context = useContext(WhatsappFeatureContext);
  if (!context) {
    throw new Error('useWhatsappFeature must be used within a WhatsappFeatureProvider');
  }
  return context;
}
