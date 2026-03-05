# Session Plan

## Session materials

These are some examples of previously created materials by mentors that you can use yourself, or for inspiration.

- [Git Advanced Slides](./session-materials/Git_advanced.pdf) (slides used during the theory part of the session)
- [Git Workshop Challenges](./session-materials/git-workshop-challenges.zip) (zip containing a git repo with 6 hands-on challenges — must stay zipped because it includes a `.git` folder)
- [Git Commands Cheat Sheet](./session-materials/cheatsheet.md) (lists lots of git commands used in the session)
- [Additional exercises](./session-materials/additional_exercises.md) (extra exercises that could be used)
- [Resources](./session-materials/resources.md) (additional links and resources for content inspiration and additional learning for trainees)

## Session outline

If you're looking for more inspiration for content to teach, check out the [review](./session-materials/review.md) which covers the session outline in more detail.

### Part 1 — Theory

Walk through the slides together with the trainees. The slides cover the following topics:

1. **Branches review and types of branches**
   - Why we use branches (features, bugs, experiments, etc.)
   - The 3 types of branches: local non-tracking, local tracking, remote-tracking
   - How to create, list and switch between branches

2. **Push and pull**
   - Pushing local changes to GitHub
   - Pulling remote changes to your local machine
   - Fetch vs. pull, and keeping branches in sync

3. **Merge conflicts**
   - What causes a merge conflict
   - How to identify and resolve them (use VSCode to select which changes to keep)

4. **Git workflows**
   - Feature-branch workflow
   - Gitflow workflow
   - Trunk based workflow
   - When to use which, and how they relate to the final project

5. **Rollback strategies**
   - `git reset` — soft vs hard
   - `git revert` — undoing a specific commit safely
   - `git cherry-pick` — copying a commit from another branch

6. **Git tags and versioning**
   - What tags are and why we use them
   - Lightweight vs. annotated tags
   - Semantic versioning (major.minor.patch)

7. **Git bisect and stash**
   - `git bisect` — binary search through commits to find a bug
   - `git stash` — saving temporary changes without committing

8. **Best practices**
   - How to write a good commit message
   - How to create a good, easy to understand PR
   - Keeping commits small and focused

### Part 2 — Scenario challenges (~45min)

Present 4 real-world scenarios to the class. For each scenario:

1. Read the scenario out loud
2. Give the trainees a few minutes to discuss with their neighbor — what commands would you use?
3. Reveal and walk through the solution together

### Part 3 — Git Workshop Challenges (~1h30min)

Hand out (or have trainees unzip) the [git-workshop-challenges.zip](./session-materials/git-workshop-challenges.zip). This zip contains a git repository with 6 hands-on challenges that the trainees work through at their own pace.

> [!TIP]
> The zip must stay zipped in this repo because it contains a specific `.git` folder that is part of the challenges. Trainees should unzip it locally to work with it.

The zip includes a README with all the instructions for each challenge, as well as solutions. Let the trainees work through the challenges individually or in pairs, and be available to help when they get stuck.
