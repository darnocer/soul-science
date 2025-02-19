// // api/trigger-airtable-action.js
// import fetch from 'node-fetch'

// export default async function handler(req, res) {
//   // ... previous code

//   const response = await fetch('https://api.github.com/repos/your-username/your-repo/dispatches', {
//     method: 'POST',
//     headers: {
//       Accept: 'application/vnd.github.v3+json',
//       Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
//     },
//     body: JSON.stringify({
//       event_type: 'airtable-sync',
//       client_payload: { recordId },
//     }),
//   })

//   if (!response.ok) {
//     return res.status(500).json({ error: 'Failed to trigger GitHub action' })
//   }

//   // ... rest of the function
// }

// // TODO::

// // Generate SECRET_TOKEN in Vercel and add to .env

// // ADD AS GITHUB ACTION:
// // name: Airtable Sync
// // on:
// //   workflow_dispatch:

// // jobs:
// //   update-content:
// //     runs-on: ubuntu-latest
// //     steps:
// //     - name: Checkout repository
// //       uses: actions/checkout@v2

// //     - name: Sync with Airtable
// //       run: |
// //         # Your commands to sync with Airtable
// //         # For example:
// //         node ./scripts/sync-content.js

// // GitHub Personal Access Token (PAT):

// // Generated From: GitHub.
// // Purpose: This token is used to authenticate and trigger the GitHub action workflow from your Vercel serverless function.
// // Scope Required: Typically, the repo scope is needed to trigger workflows.
// // Where to Add: Add this token as an environment variable (e.g., GITHUB_TOKEN) in your Vercel project settings under the Environment Variables section.
// // Vercel Secret Token:

// // Generated From: You can generate this yourself using a secure method, such as a password manager's random password generator.
// // Purpose: To authenticate requests coming to your Vercel serverless function. This ensures that not just anyone can trigger your deployment process.
// // Where to Add: This token should be added as an environment variable (e.g., SECRET_TOKEN) in your Vercel project settings under the Environment Variables section. You will also use this token in the URL formula for your Airtable button field.
// // Airtable API Key (if needed):

// // Generated From: Airtable (not always necessary unless your serverless function needs to directly interact with Airtable).
// // Purpose: To allow your serverless function to read from or write to your Airtable base.
// // Where to Add: If needed, add this as an environment variable in your Vercel project settings.
