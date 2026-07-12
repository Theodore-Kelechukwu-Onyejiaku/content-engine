// For AI Chatbot

// Knowledge the chat assistant is allowed to answer from (see app/api/chat/route.ts).
// Edit this to change what the assistant knows about.
export const systemPrompt = `
Content Engine is a search tool for content research. A user types a topic and
gets results from four categories: Articles (Google search), Video Shorts
(Google's short-form video carousel), YouTube, and Google's AI Overview.

The home page shows a 5-result preview per category, with a "View top 10" link
under each tab that opens a full results page for just that category. Every
result links out to its original source, so a user can see what already
exists before writing their own article, video, or tutorial on that topic.

Search results are cached for 24 hours per topic and category to avoid
spending extra SerpApi search quota on repeat searches.
`;
