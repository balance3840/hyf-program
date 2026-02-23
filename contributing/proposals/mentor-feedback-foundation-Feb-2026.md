# Mentor Feedback Summary - Foundation Course - Feb 2026

## How this report was created

Source data is from the [Mentor Session Feedback 2.0](https://docs.google.com/forms/d/1E_LWi52wHnKjE5h4ixFAKGiEDYPra6ew0M2hJzizOpM/edit) survey.

The summary was created with the help of AI. It's been reviewed for accuracy by a human. The priorities in "High Level Summary" were proposed by AI, and evaluated and further summarised by a human.

## High Level Takeaways

### Needs improvement

These modules suffered with a lot of suggestions for improvements. Note that some feedback is only based from e.g. 1 mentor, so we will need to dive deeper to get a fair evaluation.

1. **Intro to Backend** — The session is placed before trainees have the JS knowledge it requires, resulting in too many "you'll learn this later" moments that undermine the learning experience.

2. **Intro to Frontend** — Similar to Backend, there are significant gaps in prerequisites — trainees are expected to move towards React without sufficient vanilla JS, CSS, and DOM foundations. The materials are also outdated and need rewriting to better cover core front-end concepts.

3. **Git** — As a foundational module that every later session depends on, the issues here are high-impact: trainees lacking CLI experience was a major blocker, and the forking workflow wasn't clearly taught, leading to ongoing problems with PRs submitted to the wrong repos. Six mentors reported issues across structure, delivery, and materials, suggesting the module needs attention on multiple fronts.

### Worked well

These modules went well overall, with no major improvements needed (although some small tweaks will always be welcome).

1. **Team Processes Intro** — The use of non-technical activities (Lost at Sea, Lego exercises) kept all trainees engaged and made teamwork concepts tangible without technical barriers. Good session timing and structure meant only minor tweaks are needed (smaller groups, a deeper Trello exercise).

2. **Databases** — The simplified module gave enough time for core concepts, and the alternating talk-exercise-talk-exercise structure kept trainees engaged throughout. Only minor tooling and resource visibility issues were reported.

3. **Intro to JavaScript** — The revised curriculum was praised for having a better pace and manageable workload, and trainees came well-prepared from doing their prep work diligently. Strong lead mentors and an effective wrap-up quiz rounded out a module that, despite a long list of refinements, is fundamentally working well.

---

## Full Summary

### Action Themes

Each possible action referred to below is categorised into one of three themes:

1. **Structure** — What to teach, when, and in what order
2. **Session Delivery** — How to run sessions
3. **Materials** — Written artifacts (prep, session plans, exercises, assignments)

### HTML & CSS

**Respondents:** 3 Leads, 4 Assistants

**What went well:**
- Prep work (order form task) gave trainees a solid baseline, reducing in-class troubleshooting
- VS Code setup was smooth and quick
- Ice-breaker activities were well received
- Having two leads and assistants covered gaps effectively
- Adding accessibility to the session was a good idea

**What didn't go well:**
- Time management was the main issue — too much lecture time left too little for exercises
- Covering all session plan topics rather than focusing on what trainees actually struggled with
- Presentations were too theory-heavy and lacked concrete examples
- Assignment workflow is confusing: trainees learn VS Code but submit via CodePen (no Git yet)

**Possible actions:**

*Structure:*
- Consider showing basic GitHub file upload in week 1 as an alternative to CodePen

*Session Delivery:*
- Ask trainees what they're struggling with at the start, then only teach those topics — skip basics they already understand
- Allocate more time for hands-on exercises by cutting lecture time
- Make presentations more example-focused with follow-along coding
- Try "spot the errors" exercises with broken HTML documents for engagement
- Allow time for trainees to present their exercise solutions

*Materials:*
- Clarify assignment instructions (what to submit, in what format)
- Create a short guide clarifying lead mentor vs. assistant mentor roles and expectations

### Git

**Respondents:** 3 Leads, 3 Assistants

**What went well:**
- Having multiple assistants was essential — trainees had many issues and questions in parallel
- Interactive, hands-on exercises (2-5) worked well
- Most trainees successfully installed and configured Git from prep materials
- Well-organised session overall

**What didn't go well:**
- Many trainees had no CLI experience, which became a major blocker
- Exercise 1 caused confusion by giving too much freedom (start fresh vs. use existing work)
- Some trainees missed the SSH key setup in prep materials and couldn't push
- Slide diagrams were confusing without explanations — hard for mentors to interpret and teach from
- Forking workflow was not clearly taught, leading to PRs against the template repo instead of personal forks
- Deviating from session plan order (even just reordering) caused problems

**Possible actions:**

*Structure:*
- Add a dedicated section on forking, cloning, and submitting assignments via PRs to the correct repo
- Structure teaching as: Git concepts -> GitHub concepts -> remote operations (push/pull/origin)

*Session Delivery:*
- Replace or supplement confusing slide diagrams with live-coding demonstrations
- Start with small follow-along exercises (init, commit) before abstract explanations

*Materials:*
- Add CLI basics to the preparation materials (or start the session with a CLI primer)
- Standardise Exercise 1 so all trainees start from the same point
- Emphasise Windows/Mac/Linux terminal differences in materials
- Highlight SSH key setup more prominently in prep materials

### Intro to Using AI

**Respondents:** 1 Lead, 1 Co-lead, 2 Assistants

**What went well:**
- Most trainees were already comfortable using AI tools
- Good general discussion and practical exercises
- Session was a useful addition to the curriculum

**What didn't go well:**
- Exercises were too simple — trainees found the AI-generated code easy to understand
- Session plan was vague and open-ended, not giving mentors enough structure
- The topic is very broad; session lacked a focused scope
- Mentors couldn't directly help with exercises since outputs varied by AI tool

**Possible actions:**

*Structure:*
- Make exercises more ambitious (e.g. multi-file projects, landing pages with interactions) to show AI limitations and overcomplications
- Focus the session more on prompt engineering, since that's the core skill trainees will use

*Session Delivery:*
- Include an exercise that demonstrates AI "going off the rails" with overly complex solutions

*Materials:*
- Add more structure and specific talking points to the lesson plan so mentors can run interactive sessions
- Prepare a list of free AI tool alternatives for when trainees run out of Copilot tokens

### Intro to JavaScript

**Respondents:** 2 Leads, 7 Assistants

**What went well:**
- Revised curriculum has a better pace and smaller workload — less pressure to rush
- Trainees did preparation diligently and came familiar with concepts
- Good lead mentors with clear explanations and a good talk-to-practice ratio
- Week 4 quiz was a fun and effective way to wrap up the module
- Copilot is useful for trainees to handle repetitive questions

**What didn't go well:**
- Some exercises/assignments didn't align with what had been taught yet
- Trainees still submitting assignments to the wrong repos
- Some sessions lacked structure when leads deviated from the curriculum
- Assignment review burden increases with many assignments per session
- `var` is over-emphasised in prep/session content — it's essentially legacy
- AI tools reduce the need for assistant help; assistants sometimes felt underutilised
- Trainees are reluctant to ask questions

**Possible actions:**

*Structure:*
- Audit exercises and assignments to ensure they align with what has been taught at that point
- Reduce the number of assignments per session to make reviewing more manageable
- Reduce emphasis on `var` — mention it briefly as legacy, focus on `let`/`const`
- Add instance methods (string.split, object.keys, etc.) and MDN usage to the curriculum

*Session Delivery:*
- Consider having trainees present/explain their solutions to the group
- Add a peer code review assignment to help trainees understand GitHub workflows
- Suggest a wrap-up quiz as part of the final session plan
- Ensure leads follow the session plan closely; extras should supplement, not replace the plan

*Materials:*
- Add small exercises to prep materials so trainees practice (not just read) before sessions
- Include hints with exercises (e.g. "you can use Array.includes") without giving full solutions

### Databases

**Respondents:** 1 Lead

**What went well:**
- New simplified module worked well for teaching — enough time for core concepts
- Talk-exercise-talk-exercise structure kept trainees engaged
- Most trainees could follow along; stronger ones explored additional resources

**What didn't go well:**
- DBeaver can't be installed on some Macs due to protection settings
- Additional reading resources weren't visible enough in the materials

**Possible actions:**

*Materials:*
- Make additional resources/readmes more visible and prominently linked
- Prepare a DBeaver interface cheatsheet with screenshots for mentors who can't install it
- Consider a VS Code extension as a documented fallback option

### Intro to Backend

**Respondents:** 1 Lead, 1 Assistant

**What went well:**
- Good atmosphere with curious, collaborative trainees
- Trainees learned how a server works and understood web architecture (client/server)

**What didn't go well:**
- Session placement is problematic: trainees only know basic JS but are expected to use Node, npm, async/await, promises, callbacks, arrow functions, and fetch
- Too many "you'll learn this later" moments, undermining the learning experience

**Possible actions:**

*Structure:*
- Reconsider the placement of this session — it may need to come after more JS content
- If the session stays where it is, reduce the scope to concepts that don't require advanced JS knowledge
- Ensure prerequisite JS topics (arrow functions, callbacks, promises) are covered before this module

### Intro to Frontend

**Respondents:** 1 Lead

**What went well:**
- Trainees were interested and engaged despite issues with the materials

**What didn't go well:**
- Materials need updating and more context around front-end basics
- Concern that the course jumps straight to React without enough vanilla JS, CSS, and DOM foundations
- Gaps in CSS, advanced JS, npm/Node.js knowledge before React

**Possible actions:**

*Structure:*
- Add exercises or time focused on CSS and DOM manipulation before moving to React
- Review the overall curriculum path to ensure sufficient JS/CSS foundations before React

*Materials:*
- Update session materials with more context around core front-end concepts

### Team Processes Intro

**Respondents:** 2 Leads, 1 Assistant

**What went well:**
- "Lost at Sea" game was fun and effectively demonstrated teamwork and consensus-building
- Lego exercises made theory tangible and kept everyone involved
- Non-tech examples let trainees focus on teamwork skills rather than technical details
- Good timing: the content fit well into the session structure

**What didn't go well:**
- Trello exercise was too superficial — trainees saw the tool but didn't really work with it
- Some trainees in larger groups were less engaged / left out

**Possible actions:**

*Session Delivery:*
- Redesign the Trello exercise: create shared boards per team and run a small 3-sprint project so trainees actually use the tool
- Use smaller groups to ensure everyone participates actively
- Explore partnerships with companies for events and job support (Aarhus & CPH)
