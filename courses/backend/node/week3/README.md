# Node (Week 3) – API Security & Authentication

In this session we will focus on securing our existing Snippets API. We will explore different ways of authenticating users and protecting API endpoints, and compare their trade-offs so you can choose the right approach for different scenarios.

## Contents

- [Preparation](./preparation.md)
- [Session Plan](./session-plan.md) (for mentors)
- [Assignment](./assignment.md)

## Session Learning goals

By the end of this session, you will be able to:

- [ ] Explain why storing plaintext passwords is insecure and how hashing (e.g. with bcrypt) improves security.
- [ ] Implement a basic login flow for the Snippets API using securely stored passwords.
- [ ] Protect Snippets API endpoints using JWT-based stateless authentication.
- [ ] Protect Snippets API endpoints using session-based authentication with cookies.
- [ ] Describe when to use database-stored tokens and API keys, and understand their trade-offs.
- [ ] Compare the strengths and weaknesses of credentials-only, DB tokens, JWT, sessions, and API keys for different use cases.
