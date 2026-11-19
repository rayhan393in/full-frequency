# JobMaster BD — implementation & test report

Date: 19 November 2026. **Acceptance status: PARTIAL — not production complete.**

## Latest executed tests

| Suite | Result |
|---|---|
| `npm run build` | PASS — production compilation and TypeScript |
| `node tests/integration.mjs` | PASS — 43 assertions |
| `node tests/capacity.mjs` | PASS — 10,000 inserts + indexed query, 46 ms in this sandbox; rolled back |
| `node tests/browser.mjs` | PASS — desktop registration-to-result workflow and 390px mobile layout |
| PDF font audit with pypdf | PASS — embedded NotoSansBengali-Regular, A4 dimensions |

### Integration coverage

Authentication gate; registration; authenticated profile; student/admin isolation;
user-scoped routine storage; protection against another student's task mutation;
BCS/EEE task isolation; editorial syllabus labels; 10/15-subject catalogs;
persistent and isolated topic completion; rejection of unknown topics;
thirty questions per track; hidden answer keys; foreign attempt read/submit denial;
autosave/resume; negative marking; duplicate-submit idempotency; post-submit lock;
EEE-only content; **server expiry without a browser request**; bookmark practice;
incorrect-answer revision; routine/result PDF downloads; explicit admin provisioning;
CSV preview; duplicate detection; rejection of invalid imports; scheduled exam
creation from verified pool; early-start prevention; in-window start; one scheduled
attempt per student; result/review/leaderboard embargo; actual published leaderboard;
logout session invalidation.

### Browser coverage

New-account form → dashboard → routine → practice → answer saved → page reload →
resume with saved answer → submission → explanation review → switch to EEE →
separate routine state. No JavaScript page errors were observed. Mobile check at
390×844 confirmed no horizontal document overflow. Desktop at 1440×1000.
Screenshots are in `tests/artifacts/`.

### Data quality / test hygiene

- Sixty AI-assisted questions only, 30 BCS and 30 EEE; no fabricated previous-year claims.
- Editorial study outline and notes are explicitly not an official syllabus.
- Test accounts/attempts/scheduled exam removed after tests.
- All 10,000 capacity rows rolled back; they are not learning content.
- Verification flags set by tests were reset; no test-created ranking remains.

## Original acceptance checklist

| Requirement | Status |
|---|---|
| Registration/login | Implemented with local sessions; not Supabase Auth |
| Separate BCS/EEE | PASS |
| Complete official syllabus | NOT COMPLETE — editorial outline available |
| 30+ question exam | PASS — 30 per track |
| Scheduled exam window | PASS |
| Server-authoritative timer | PASS |
| Autosave | PASS |
| Expiry auto-submit | PASS on a live persistent Node process; catches up after restart |
| Duplicate submission protection | PASS |
| Correct results | PASS on tested marking cases |
| Real leaderboard | PASS for individual scheduled exams; period aggregates incomplete |
| Routine generation | Implemented; weakness-prioritized daily sessions, not full adaptive planner |
| Routine/result PDF | PASS, actual downloadable A4 with embedded Bengali font |
| Admin question add/verification | Implemented; verification API tested, add-form end-to-end not tested |
| Admin scheduling | PASS API workflow; schedule-form end-to-end not tested |
| CSV import | Preview/invalid/duplicate tests PASS; successful large import not acceptance-tested |
| Mobile/desktop | Browser checks PASS; physical-device coverage not done |
| Database security | Local ownership tests PASS; Supabase RLS NOT tested/deployed |
| Production build | PASS |
| Production deployment | NOT COMPLETE |

## Remaining gates

Supabase implementation and RLS audit; official syllabus document/version verification;
expert content review; complete theory/question coverage; organization-specific papers;
advanced adaptive scheduling and spaced repetition; remaining seven PDF types;
XLSX import; audit logs and content-edit workflow; configurable marking and question
selection; email verification/password reset/MFA; distributed rate limiting and durable
serverless scheduler; concurrent load testing and independent security review.

See README.md for deployment assumptions and the full limitation list.
