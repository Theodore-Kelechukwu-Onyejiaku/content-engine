import { searchContext } from "@/app/lib/definitions";
import { saveResultToStorage } from "./utils";

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

export const defaultFetch = {
  search_metadata: {
    id: "6a554f7802ab8cd2ff15266d",
    status: "Success",
    json_endpoint:
      "https://serpapi.com/searches/Lw1e0mbAOQuMVBv8SZwk4A/6a554f7802ab8cd2ff15266d.json",
    pixel_position_endpoint:
      "https://serpapi.com/searches/Lw1e0mbAOQuMVBv8SZwk4A/6a554f7802ab8cd2ff15266d.json_with_pixel_position",
    created_at: "2026-07-13 20:50:00 UTC",
    processed_at: "2026-07-13 20:50:00 UTC",
    google_url:
      "https://www.google.com/search?q=strapi&oq=strapi&sourceid=chrome&ie=UTF-8",
    raw_html_file:
      "https://serpapi.com/searches/Lw1e0mbAOQuMVBv8SZwk4A/6a554f7802ab8cd2ff15266d.html",
    total_time_taken: 2.38,
  },
  search_parameters: {
    engine: "google",
    q: "strapi",
    google_domain: "google.com",
    device: "desktop",
  },
  search_information: {
    query_displayed: "strapi",
    total_results: 0,
    time_taken_displayed: 0.17,
    organic_results_state: "Results for exact spelling",
  },
  ads: [
    {
      position: 1,
      block_position: "middle",
      title: "Strapi: Do More With Sanity",
      link: "https://www.sanity.io/sanity-vs-strapi",
      displayed_link: "https://www.sanity.io › strapi",
      tracking_link:
        "https://www.google.com/aclk?sa=L&ai=DChsSEwi-rfjfw9CVAxXMN0QIHWMJHXAYACICCAIQABoCZHo&co=1&ase=2&gclid=EAIaIQobChMIvq3438PQlQMVzDdECB1jCR1wEAMYASAAEgJydvD_BwE&cid=CAASuwHkaBnSCuJV2A0Bk_QTIAkxCGgzv1mSIeQ_cUtJfFYQwkyOYnyGsJ46tJewRy1i-MuMYaFW3pQAmqNMmvYKU5_tYNec4NiuaGXVpaHWcvii-56O6HXIjthh3F8GhJfndekeB9I7GpZav34ClyHzjyCra7FrAgyCwGGCajIOR9s8CgQG42x-KXq5S7l74ufjz_hWE9XmmPvijEdlE5_SzTSV1mSInthHaXq1hRnBTg-zHoG4B5sdREypI_81&cce=2&category=acrcp_v1_32&sig=AOD64_2xQ2pSJtNwoRgudPykfsMq5izWNQ&q&nis=4&adurl",
      description:
        "Open Source Customization — Sanity enables multiple editors to simultaneously edit content with live updates. Sanity is ideal for...",
      source: "Sanity.io",
      sitelinks: [Array],
    },
  ],
  inline_videos: [
    {
      position: 1,
      title: "Get started with Strapi v5 in 5 minutes",
      link: "https://www.youtube.com/watch?v=xWrDZ_qxEzQ",
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjlN3g8VsIHzwfFDhZYO9e1zH_035lu8zF8GllnL7CL418u2EwiOjdAQ&s",
      channel: "Strapi",
      duration: "5:19",
      platform: "YouTube",
      date: "Nov 24, 2025",
      snippet:
        "Learn how to create a Strapi project, define content types, build components, manage content, and deploy your project.",
    },
    {
      position: 2,
      title:
        "Strapi v5 Crash Course 2025 [ Part 1 Getting Started with Strapi ]",
      link: "https://www.youtube.com/watch?v=OrKLqITuhNA",
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuL8yhRfgPjlDCRCiTj1cL5-CgmY4Ne3UISiT_1Maf6O1fLN9XwZsLWg&s",
      channel: "Coding With Paul",
      duration: "12:22",
      platform: "YouTube",
      date: "Mar 14, 2025",
      short_clip:
        "https://encrypted-vtbn0.gstatic.com/video?q=tbn:ANd9GcTpHNf2A4Lh0AOkntKQkOPL4kfLaAf7N72Bow",
    },
    {
      position: 3,
      title: "Getting Started With Strapi AI",
      link: "https://www.youtube.com/watch?v=M_6ga_XzIkQ",
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQidDuKEPTVOs_WHLrj3-Vdh3aB8wi3ruO05gpXMLSUV6ahZ_QrWM6wxw&s",
      channel: "Strapi",
      duration: "16:09",
      platform: "YouTube",
      date: "Oct 8, 2025",
      short_clip:
        "https://encrypted-vtbn0.gstatic.com/video?q=tbn:ANd9GcTNTWANnTZ-8wbVg4IHxCnKIZxP_2TCqbekJw",
      key_moments: [Array],
    },
  ],
  related_questions: [
    {
      question: "What is Strapi used for?",
      type: "ai_overview",
      page_token:
        "F54uCnicHdBdboIwAADg7DI-yp-waGKWdFAYgTJ-2govC1YUbaFMiYy-7S471U4zswN8L9_3jzj3_Pdp147jcNto2jRNy5OUJ9Esmey0-jb3TGO1EPua8Y3z7BgvR7b1bhN4lRNI8TAQN9NzvcWlygbkIhAHXG9gVUSUmUyFEeNhH9G1lYqMYmzfMxW6--5rRAHSC9NbEZLqdU94bVTXZCdkSY0Z-aTA3P5MPEKIAGXtIxPrWVRe4lWzEzq5gDgT1Z16hln4UCIqznkAVNqJB3izD93YY7xW2Jfq4R2EUZlgI8dWK0slZgx5Dk1yTUjVsq4Ks65ycDemOQFjTloVe7D3zyHIAjQntMpLI4QHhWDj2yYKAG8gfK9NudpTEiJLuJSH1uLI7ltr8T-2_Th242a4ytMfE7V4Bg",
      serpapi_ai_overview_link:
        "https://serpapi.com/search.json?engine=google_ai_overview&page_token=F54uCnicHdBdboIwAADg7DI-yp-waGKWdFAYgTJ-2govC1YUbaFMiYy-7S471U4zswN8L9_3jzj3_Pdp147jcNto2jRNy5OUJ9Esmey0-jb3TGO1EPua8Y3z7BgvR7b1bhN4lRNI8TAQN9NzvcWlygbkIhAHXG9gVUSUmUyFEeNhH9G1lYqMYmzfMxW6--5rRAHSC9NbEZLqdU94bVTXZCdkSY0Z-aTA3P5MPEKIAGXtIxPrWVRe4lWzEzq5gDgT1Z16hln4UCIqznkAVNqJB3izD93YY7xW2Jfq4R2EUZlgI8dWK0slZgx5Dk1yTUjVsq4Ks65ycDemOQFjTloVe7D3zyHIAjQntMpLI4QHhWDj2yYKAG8gfK9NudpTEiJLuJSH1uLI7ltr8T-2_Th242a4ytMfE7V4Bg",
      next_page_token:
        "eyJvbnMiOiIxMDA0MSIsImZjIjoiRXFFQkNtSkJTbWxVTkhSSmJYRkRUMEZwWm5FemVHWXlXbWREVEVabFVteG5PVEkxUXkxR1pqVklUVWQxVFZSR1preEVaSEE0YmxKaGVUQTVMVlphTjNGRlEwTnBYM05aZVVaNVRGTTFNemMyWmtWb01UWnFiWGhxU1VWTVRuaExTbFZKUmxsUFVSSVhaV3M1Vm1GeVprbEdabnBTYTFCSlVHMUpXSE13UVdjYUlrRkVjM0k1WmxOSFJGUldlRGxYYUZadFlUTlZiQzF3Vm5WeFVtWkZSbHA2Y0VFIiwiZmN2IjoiMyIsImVpIjoiZWs5VmFyZklGZnpSa1BJUG1JWHMwQWciLCJxYyI6IkNnWnpkSEpoY0drUUFIMkR2enNfIiwicXVlc3Rpb24iOiJXaGF0IGlzIFN0cmFwaSB1c2VkIGZvcj8iLCJsayI6IkdoZDNhR0YwSUdseklITjBjbUZ3YVNCMWMyVmtJR1p2Y2ciLCJicyI6ImMtTXk1WklJejBnc1VjZ3NWZ2d1S1Vvc3lGUW9MVTVOVVVqTEw3STNrcFFTTDRmS0ZhUEtjUmx6aVh2Q2RhUVZwYVlxNUJjcEZDUm1wdGdiU1VpSklUUWdTM0VaY0lrZ05DVXFKQ1VtWjZmbXBkaExQQWd6RXBVU1JtaUNTM0hwY1FramRPU1hscVFrbHFRQ05keUtNQktSRWtKb2dNa0lNQUlBIiwiaWQiOiJmY19lazlWYXJmSUZmelJrUElQbUlYczBBZ180In0=",
      serpapi_link:
        "https://serpapi.com/search.json?device=desktop&engine=google_related_questions&google_domain=google.com&next_page_token=eyJvbnMiOiIxMDA0MSIsImZjIjoiRXFFQkNtSkJTbWxVTkhSSmJYRkRUMEZwWm5FemVHWXlXbWREVEVabFVteG5PVEkxUXkxR1pqVklUVWQxVFZSR1preEVaSEE0YmxKaGVUQTVMVlphTjNGRlEwTnBYM05aZVVaNVRGTTFNemMyWmtWb01UWnFiWGhxU1VWTVRuaExTbFZKUmxsUFVSSVhaV3M1Vm1GeVprbEdabnBTYTFCSlVHMUpXSE13UVdjYUlrRkVjM0k1WmxOSFJGUldlRGxYYUZadFlUTlZiQzF3Vm5WeFVtWkZSbHA2Y0VFIiwiZmN2IjoiMyIsImVpIjoiZWs5VmFyZklGZnpSa1BJUG1JWHMwQWciLCJxYyI6IkNnWnpkSEpoY0drUUFIMkR2enNfIiwicXVlc3Rpb24iOiJXaGF0IGlzIFN0cmFwaSB1c2VkIGZvcj8iLCJsayI6IkdoZDNhR0YwSUdseklITjBjbUZ3YVNCMWMyVmtJR1p2Y2ciLCJicyI6ImMtTXk1WklJejBnc1VjZ3NWZ2d1S1Vvc3lGUW9MVTVOVVVqTEw3STNrcFFTTDRmS0ZhUEtjUmx6aVh2Q2RhUVZwYVlxNUJjcEZDUm1wdGdiU1VpSklUUWdTM0VaY0lrZ05DVXFKQ1VtWjZmbXBkaExQQWd6RXBVU1JtaUNTM0hwY1FramRPU1hscVFrbHFRQ05keUtNQktSRWtKb2dNa0lNQUlBIiwiaWQiOiJmY19lazlWYXJmSUZmelJrUElQbUlYczBBZ180In0%3D",
    },
    {
      question: "Is Strapi free or paid?",
      type: "ai_overview",
      page_token:
        "Y3GXtnicHdBdboIwAADg7DI-yp-wzMQsQwtKbA2FttKXBYqK0gKDbqBvu8tOtdMs2XeE7_tHXpv69-lYad0NS8MYx3F-aduLPM1Fq4x8uDfCELmURS7qpffsWa9nsQLD6K_b0Y9J19ENNlPg2pS9AMJkKCw6wYB6-Y1obo46t0qP1XhDb5UjACZcBrJ48CAFU0_CwCYhamOKd-mx67FZImSX_v6IdGLyHTQryJ1Ms-bNYbV0OJs2hYUZXFv7wuILRDI7DZEmwAUQTPDEgAkb9JnWWmXmZO-J_IhVyXJV7lDoVpzCBTV1lLIhCWzaHyivhOIRVtwjSscJ9XVCqwcEQRNeIx9v0f3AOM7qSOEUd7yuKLa1m4BSY8AXbBtdi1p3eTg5s7P4Wjmz_7HV-1npZde3lz95nHgg",
      serpapi_ai_overview_link:
        "https://serpapi.com/search.json?engine=google_ai_overview&page_token=Y3GXtnicHdBdboIwAADg7DI-yp-wzMQsQwtKbA2FttKXBYqK0gKDbqBvu8tOtdMs2XeE7_tHXpv69-lYad0NS8MYx3F-aduLPM1Fq4x8uDfCELmURS7qpffsWa9nsQLD6K_b0Y9J19ENNlPg2pS9AMJkKCw6wYB6-Y1obo46t0qP1XhDb5UjACZcBrJ48CAFU0_CwCYhamOKd-mx67FZImSX_v6IdGLyHTQryJ1Ms-bNYbV0OJs2hYUZXFv7wuILRDI7DZEmwAUQTPDEgAkb9JnWWmXmZO-J_IhVyXJV7lDoVpzCBTV1lLIhCWzaHyivhOIRVtwjSscJ9XVCqwcEQRNeIx9v0f3AOM7qSOEUd7yuKLa1m4BSY8AXbBtdi1p3eTg5s7P4Wjmz_7HV-1npZde3lz95nHgg",
      next_page_token:
        "eyJvbnMiOiIxMDA0MSIsImZjIjoiRXFFQkNtSkJTbWxVTkhSSmJYRkRUMEZwWm5FemVHWXlXbWREVEVabFVteG5PVEkxUXkxR1pqVklUVWQxVFZSR1preEVaSEE0YmxKaGVUQTVMVlphTjNGRlEwTnBYM05aZVVaNVRGTTFNemMyWmtWb01UWnFiWGhxU1VWTVRuaExTbFZKUmxsUFVSSVhaV3M1Vm1GeVprbEdabnBTYTFCSlVHMUpXSE13UVdjYUlrRkVjM0k1WmxOSFJGUldlRGxYYUZadFlUTlZiQzF3Vm5WeFVtWkZSbHA2Y0VFIiwiZmN2IjoiMyIsImVpIjoiZWs5VmFyZklGZnpSa1BJUG1JWHMwQWciLCJxYyI6IkNnWnpkSEpoY0drUUFIMkR2enNfIiwicXVlc3Rpb24iOiJJcyBTdHJhcGkgZnJlZSBvciBwYWlkPyIsImxrIjoiR2hacGN5QnpkSEpoY0drZ1puSmxaU0J2Y2lCd1lXbGsiLCJicyI6ImMtTXk1WklJejBnc1VjZ3NWZ2d1S1Vvc3lGUW9MVTVOVVVqTEw3STNrcFFTTDRmS0ZhUEtjUmx6aVh2Q2RhUVZwYVlxNUJjcEZDUm1wdGdiU1VpSklUUWdTM0VaY0lrZ05DVXFKQ1VtWjZmbXBkaExQQWd6RXBVU1JtaUNTM0hwY1FramRPU1hscVFrbHFRQ05keUtNQktSRWtKb2dNa0lNQUlBIiwiaWQiOiJmY19lazlWYXJmSUZmelJrUElQbUlYczBBZ180In0=",
      serpapi_link:
        "https://serpapi.com/search.json?device=desktop&engine=google_related_questions&google_domain=google.com&next_page_token=eyJvbnMiOiIxMDA0MSIsImZjIjoiRXFFQkNtSkJTbWxVTkhSSmJYRkRUMEZwWm5FemVHWXlXbWREVEVabFVteG5PVEkxUXkxR1pqVklUVWQxVFZSR1preEVaSEE0YmxKaGVUQTVMVlphTjNGRlEwTnBYM05aZVVaNVRGTTFNemMyWmtWb01UWnFiWGhxU1VWTVRuaExTbFZKUmxsUFVSSVhaV3M1Vm1GeVprbEdabnBTYTFCSlVHMUpXSE13UVdjYUlrRkVjM0k1WmxOSFJGUldlRGxYYUZadFlUTlZiQzF3Vm5WeFVtWkZSbHA2Y0VFIiwiZmN2IjoiMyIsImVpIjoiZWs5VmFyZklGZnpSa1BJUG1JWHMwQWciLCJxYyI6IkNnWnpkSEpoY0drUUFIMkR2enNfIiwicXVlc3Rpb24iOiJJcyBTdHJhcGkgZnJlZSBvciBwYWlkPyIsImxrIjoiR2hacGN5QnpkSEpoY0drZ1puSmxaU0J2Y2lCd1lXbGsiLCJicyI6ImMtTXk1WklJejBnc1VjZ3NWZ2d1S1Vvc3lGUW9MVTVOVVVqTEw3STNrcFFTTDRmS0ZhUEtjUmx6aVh2Q2RhUVZwYVlxNUJjcEZDUm1wdGdiU1VpSklUUWdTM0VaY0lrZ05DVXFKQ1VtWjZmbXBkaExQQWd6RXBVU1JtaUNTM0hwY1FramRPU1hscVFrbHFRQ05keUtNQktSRWtKb2dNa0lNQUlBIiwiaWQiOiJmY19lazlWYXJmSUZmelJrUElQbUlYczBBZ180In0%3D",
    },
    {
      question: "Is Strapi a backend?",
      type: "featured_snippet",
      snippet:
        'As a headless CMS, the Strapi software as a whole can be considered as the "back end" of your website or application. But the Strapi software itself includes 2 different parts: The back-end part of Strapi is an HTTP server that Strapi runs. Like any HTTP server, the Strapi back end receives requests and send responses.',
      title: "Back-end customization | Strapi 5 Documentation",
      link: "https://docs.strapi.io/cms/backend-customization#:~:text=As%20a%20headless%20CMS%2C%20the,receives%20requests%20and%20send%20responses.",
      displayed_link: "https://docs.strapi.io › cms › backend-customization",
      source_logo:
        "https://serpapi.com/images/i/iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8_9hAAAAqElEQVR4AaWTxRECQRBFJzVcr7hHgJMFcsIJBCKB-yTBqZlfVJ_2r2_VW-_fbkqzuqkU5OGwjq9DQsA_FjawVWNJyMNALYWANSzsYpbB0zHMGNdO0wuLwjDPr6ewAyL4zgWUwy6hAD5sln8uJ5HPG1CB8BQmA0QCIBIzBRW4XZMJKBABSAc1AeFdYOlsloiEzwIgg6SogN7zQQoZZTXklPNi0y9T2nX-AVLqqgy4JBNVAAAAAElFTkSuQmCC.png",
      next_page_token:
        "eyJvbnMiOiIxMDA0MSIsImZjIjoiRXFFQkNtSkJTbWxVTkhSSmJYRkRUMEZwWm5FemVHWXlXbWREVEVabFVteG5PVEkxUXkxR1pqVklUVWQxVFZSR1preEVaSEE0YmxKaGVUQTVMVlphTjNGRlEwTnBYM05aZVVaNVRGTTFNemMyWmtWb01UWnFiWGhxU1VWTVRuaExTbFZKUmxsUFVSSVhaV3M1Vm1GeVprbEdabnBTYTFCSlVHMUpXSE13UVdjYUlrRkVjM0k1WmxOSFJGUldlRGxYYUZadFlUTlZiQzF3Vm5WeFVtWkZSbHA2Y0VFIiwiZmN2IjoiMyIsImVpIjoiZWs5VmFyZklGZnpSa1BJUG1JWHMwQWciLCJxYyI6IkNnWnpkSEpoY0drUUFIMkR2enNfIiwicXVlc3Rpb24iOiJJcyBTdHJhcGkgYSBiYWNrZW5kPyIsImxrIjoiR2hOcGN5QnpkSEpoY0drZ1lTQmlZV05yWlc1ayIsImJzIjoiYy1NeTVaSUl6MGdzVWNnc1ZnZ3VLVW9zeUZRb0xVNU5VVWpMTDdJM2twUVNMNGZLRmFQS2NSbHppWHZDZGFRVnBhWXE1QmNwRkNSbXB0Z2JTVWlKSVRRZ1MzRVpjSWtnTkNVcUpDVW1aNmZtcGRoTFBBZ3pFcFVTUm1pQ1MzSHBjUWtqZE9TWGxxUWtscVFDTmR5S01CS1JFa0pvZ01rSU1BSUEiLCJpZCI6ImZjX2VrOVZhcmZJRmZ6UmtQSVBtSVhzMEFnXzQifQ==",
      serpapi_link:
        "https://serpapi.com/search.json?device=desktop&engine=google_related_questions&google_domain=google.com&next_page_token=eyJvbnMiOiIxMDA0MSIsImZjIjoiRXFFQkNtSkJTbWxVTkhSSmJYRkRUMEZwWm5FemVHWXlXbWREVEVabFVteG5PVEkxUXkxR1pqVklUVWQxVFZSR1preEVaSEE0YmxKaGVUQTVMVlphTjNGRlEwTnBYM05aZVVaNVRGTTFNemMyWmtWb01UWnFiWGhxU1VWTVRuaExTbFZKUmxsUFVSSVhaV3M1Vm1GeVprbEdabnBTYTFCSlVHMUpXSE13UVdjYUlrRkVjM0k1WmxOSFJGUldlRGxYYUZadFlUTlZiQzF3Vm5WeFVtWkZSbHA2Y0VFIiwiZmN2IjoiMyIsImVpIjoiZWs5VmFyZklGZnpSa1BJUG1JWHMwQWciLCJxYyI6IkNnWnpkSEpoY0drUUFIMkR2enNfIiwicXVlc3Rpb24iOiJJcyBTdHJhcGkgYSBiYWNrZW5kPyIsImxrIjoiR2hOcGN5QnpkSEpoY0drZ1lTQmlZV05yWlc1ayIsImJzIjoiYy1NeTVaSUl6MGdzVWNnc1ZnZ3VLVW9zeUZRb0xVNU5VVWpMTDdJM2twUVNMNGZLRmFQS2NSbHppWHZDZGFRVnBhWXE1QmNwRkNSbXB0Z2JTVWlKSVRRZ1MzRVpjSWtnTkNVcUpDVW1aNmZtcGRoTFBBZ3pFcFVTUm1pQ1MzSHBjUWtqZE9TWGxxUWtscVFDTmR5S01CS1JFa0pvZ01rSU1BSUEiLCJpZCI6ImZjX2VrOVZhcmZJRmZ6UmtQSVBtSVhzMEFnXzQifQ%3D%3D",
    },
    {
      question: "Is Strapi outdated?",
      type: "featured_snippet",
      snippet:
        "End of support & security Official support for Strapi v4 will stop in October 2025. From that date, only critical updates and security fixes will be provided, until April 2026. Beyond that, the version will no longer receive any maintenance. An unmaintained version quickly leads to issues with security and stability.",
      title:
        "Strapi 5 Migration: How to Plan Ahead and Ensure a Smooth Transition",
      date: "Sep 4, 2025",
      link: "https://www.kaliop.com/en/insights/strapi-5-migration#:~:text=End%20of%20support%20%26%20security,issues%20with%20security%20and%20stability.",
      displayed_link: "https://www.kaliop.com › insights › strapi-5-migration",
      source_logo:
        "https://serpapi.com/images/i/iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8_9hAAABXElEQVR4AY2QAUQDURjHH1GEkO3avQuEEGJAUQK0uRvQCKBAIZSsbYAEVBUFECAYiET1vmkAgaDcQNu9l9tNDRJJd3fdscu8nt39-MPz_X_v86Eo8nlvQCtb51rJInzUorUXKdCKrYNc2fL4-IKWtsmUvmW1bC37g65A8J3ZMedQgPQCY8nGdYrPwnFz1i9_in5XS-11FCJTcqFQ8HqD9XtXWTVttfj_9-AeqJcEvcOYwcdf2ai6ya2Gk8h0vPTKm82VH7Ib3hDiSTEohALpRLeDchAp23EXt9tOV2BlC6_jSMhTZRAzqOPnmiMd6bZ0qDthJk_rZq7U2vfLM6gfMoMMpuDy9wjeZArzKA7-8CUn6N6FPKJKZSBSIBkwoRjwJZLItLoWd4td4RaUvI-wm9FogXk1jBk0xRI4Q3FIGbdLQgGDH4nBdCyJfzgQ34LUYm4BU5gCEaZJ0uHcLxBxakVbatq1AAAAAElFTkSuQmCC.png",
      next_page_token:
        "eyJvbnMiOiIxMDA0MSIsImZjIjoiRXFFQkNtSkJTbWxVTkhSSmJYRkRUMEZwWm5FemVHWXlXbWREVEVabFVteG5PVEkxUXkxR1pqVklUVWQxVFZSR1preEVaSEE0YmxKaGVUQTVMVlphTjNGRlEwTnBYM05aZVVaNVRGTTFNemMyWmtWb01UWnFiWGhxU1VWTVRuaExTbFZKUmxsUFVSSVhaV3M1Vm1GeVprbEdabnBTYTFCSlVHMUpXSE13UVdjYUlrRkVjM0k1WmxOSFJGUldlRGxYYUZadFlUTlZiQzF3Vm5WeFVtWkZSbHA2Y0VFIiwiZmN2IjoiMyIsImVpIjoiZWs5VmFyZklGZnpSa1BJUG1JWHMwQWciLCJxYyI6IkNnWnpkSEpoY0drUUFIMkR2enNfIiwicXVlc3Rpb24iOiJJcyBTdHJhcGkgb3V0ZGF0ZWQ/IiwibGsiOiJHaEpwY3lCemRISmhjR2tnYjNWMFpHRjBaV1EiLCJicyI6ImMtTXk1WklJejBnc1VjZ3NWZ2d1S1Vvc3lGUW9MVTVOVVVqTEw3STNrcFFTTDRmS0ZhUEtjUmx6aVh2Q2RhUVZwYVlxNUJjcEZDUm1wdGdiU1VpSklUUWdTM0VaY0lrZ05DVXFKQ1VtWjZmbXBkaExQQWd6RXBVU1JtaUNTM0hwY1FramRPU1hscVFrbHFRQ05keUtNQktSRWtKb2dNa0lNQUlBIiwiaWQiOiJmY19lazlWYXJmSUZmelJrUElQbUlYczBBZ180In0=",
      serpapi_link:
        "https://serpapi.com/search.json?device=desktop&engine=google_related_questions&google_domain=google.com&next_page_token=eyJvbnMiOiIxMDA0MSIsImZjIjoiRXFFQkNtSkJTbWxVTkhSSmJYRkRUMEZwWm5FemVHWXlXbWREVEVabFVteG5PVEkxUXkxR1pqVklUVWQxVFZSR1preEVaSEE0YmxKaGVUQTVMVlphTjNGRlEwTnBYM05aZVVaNVRGTTFNemMyWmtWb01UWnFiWGhxU1VWTVRuaExTbFZKUmxsUFVSSVhaV3M1Vm1GeVprbEdabnBTYTFCSlVHMUpXSE13UVdjYUlrRkVjM0k1WmxOSFJGUldlRGxYYUZadFlUTlZiQzF3Vm5WeFVtWkZSbHA2Y0VFIiwiZmN2IjoiMyIsImVpIjoiZWs5VmFyZklGZnpSa1BJUG1JWHMwQWciLCJxYyI6IkNnWnpkSEpoY0drUUFIMkR2enNfIiwicXVlc3Rpb24iOiJJcyBTdHJhcGkgb3V0ZGF0ZWQ%2FIiwibGsiOiJHaEpwY3lCemRISmhjR2tnYjNWMFpHRjBaV1EiLCJicyI6ImMtTXk1WklJejBnc1VjZ3NWZ2d1S1Vvc3lGUW9MVTVOVVVqTEw3STNrcFFTTDRmS0ZhUEtjUmx6aVh2Q2RhUVZwYVlxNUJjcEZDUm1wdGdiU1VpSklUUWdTM0VaY0lrZ05DVXFKQ1VtWjZmbXBkaExQQWd6RXBVU1JtaUNTM0hwY1FramRPU1hscVFrbHFRQ05keUtNQktSRWtKb2dNa0lNQUlBIiwiaWQiOiJmY19lazlWYXJmSUZmelJrUElQbUlYczBBZ180In0%3D",
    },
  ],
  organic_results: [
    {
      position: 1,
      title: "Strapi - Open-Source TypeScript Headless CMS",
      link: "https://strapi.io/",
      redirect_link:
        "https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://strapi.io/&ved=2ahUKEwi37fLfw9CVAxX8KEQIHZgCG4oQFnoECAwQAQ",
      displayed_link: "https://strapi.io",
      favicon:
        "https://serpapi.com/images/i/iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACiUlEQVR4AaVXQW4TQRAcPgEPytgMZ5DyBiIsRcrBEkASHgBIAG8APmAJXuIDfoIlH_fianrTE2V2S5XNKiNVFI_X3dXVPTvd6XadnNizFwtbOzaOrWPv6BxHBxw2C9lQ4rfdja1s27CN9XJpT1O7lie28C8PbAjGhu_-L-3nGSgLHHqf4dzZ9M7JaYYVaQSaHDmrz2d67vC8V6K4JNqAMjgfpQfbX6fIi8ojRztfeibeKLLpCWy1AuCcE1hqHQxhm2q1G0MrMlULRTll7J0AunkEWA1ylGvOBbGGdJfinEtHioQAJqLHmMyxJwCSUeDi3Ozj5TSur8xOXykCaAkgjZkp9qszs93OYsFGizacyFQ6A4kdM4E37vzHtyBAbhFodxEEIiVC3TIgkHUKVuG8EoCphbECV8PAmAgpoJ0HQAqQV5kCnd7Em-S8UUA4JV4gAgpNCjA4KqcvGZ8_mf36CYfd4Lfj7x-tQKGXFeiSSxx9KEL7GfbhLaviRGKBCcjXd1N3aXBb8XFsjQSBr-H4e0Ngugb0MU8Tb6oWUoE2eEgFIGuA2BXxPnj_DioFtK4vRzbJOaegbuqrefU6VGjxxQvz385sN8LF-f3Hr5ACAuqajajgp4PTsjpr6-q-KxpWLyPFFpP14QRqQUaBhvMHA3fXcRYkJFAJgCLngpM9xTH5n24cVZmRElegcQ4ro8tmIp0dtWR0_qld5xSw7EIB-h77FBPLdPTauO6MStZNSYnjvuW2_JG9vzrC4vlNr8B62BNgftR5HvFGmfXtUHqgbkg6Ekc0T80NYjR7UofT4huFo9DR5kd10XU4jdUOqTGeZ9s69g4az4vsIek2hStTx3Psq82-3gbj-X9LeqPtxkiTtwAAAABJRU5ErkJggg.png",
      snippet:
        "Design content types, components, and dynamic zones in a no-code builder. Strapi turns your model into REST and GraphQL APIs instantly, fully typed.",
      snippet_highlighted_words: [Array],
      sitelinks: [Object],
      about_this_result: [Object],
      about_page_link:
        "https://www.google.com/search?q=About+https://strapi.io/&tbm=ilp",
      about_page_serpapi_link:
        "https://serpapi.com/search.json?engine=google_about_this_result&google_domain=google.com&q=About+https%3A%2F%2Fstrapi.io%2F",
      source: "Strapi",
    },
    {
      position: 2,
      title: "Strapi is the leading open-source headless CMS. It's 100% ...",
      link: "https://github.com/strapi/strapi",
      redirect_link:
        "https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://github.com/strapi/strapi&ved=2ahUKEwi37fLfw9CVAxX8KEQIHZgCG4oQFnoECC0QAQ",
      displayed_link: "https://github.com › strapi › strapi",
      favicon:
        "https://serpapi.com/images/i/iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAb1BMVEX____4-Pi3ubtvcnZNUVU-Q0cpLjLr6-x3en0sMTYkKS59gIORk5aUl5n8_Pzw8PFTV1tbX2Pc3d5DSEzn5-g3PECLjpFKTlKFh4qxs7XCxMUuMze_wcLh4uPV1tZzd3o_Q0jOz9CmqKpjZ2qfoaTxAyfNAAABPUlEQVR4AW3TBYKDMBQE0AltAgzuzur9z7ibH5oKfWjc4UEFl6s2Rl8vgcJZGMX04iTEM5UaPomzHA-KkidVAa_WfKNpffMd32oKCHUlWfb27Q19ZSMVrNHGTMDckMtQLqSegdXGpvi3Sf93W9UudRby2WzsEgL4oMvwoqY1AsrQNfFipbXkCGh1BV6oT1pfRwvfOJlo9ZA5NAonStbmB1pawBuDTAgkX4MzV_eC2H3e0C7lk1aBEzd-7SpigJOZVoXx-J5UxzADil-8-KZYoRaK5y2WZxSdgm0j-dakzkIc2kzT6W3IcFnDTzdt4sKbWMqkpNl229IMsfMmg6UaMsJXmv4qCMXDoI4mO5oADwyFDnGoO3KI0jSHQ6E3eJum5TP4Y-EVyUOGXHZjgWd7ZEwOJzZRjbPQt7mF8P4AzsYZpmkFLF4AAAAASUVORK5CYII.png",
      snippet:
        "Strapi is an open-source, self-hosted headless CMS that lets developers build content APIs fast while giving content creators a friendly editing interface.",
      snippet_highlighted_words: [Array],
      about_this_result: [Object],
      about_page_link:
        "https://www.google.com/search?q=About+https://github.com/strapi/strapi&tbm=ilp",
      about_page_serpapi_link:
        "https://serpapi.com/search.json?engine=google_about_this_result&google_domain=google.com&q=About+https%3A%2F%2Fgithub.com%2Fstrapi%2Fstrapi",
      source: "GitHub",
      read_more_link:
        "https://github.com/strapi/strapi#:~:text=Strapi%20is%20an%20open%2Dsource%2C%20self%2Dhosted,creators%20a%20friendly%20editing%20interface.",
    },
    {
      position: 3,
      title: "Strapi",
      link: "https://jamstack.org/headless-cms/strapi/",
      redirect_link:
        "https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://jamstack.org/headless-cms/strapi/&ved=2ahUKEwi37fLfw9CVAxX8KEQIHZgCG4oQFnoECCoQAQ",
      displayed_link: "https://jamstack.org › headless-cms › strapi",
      favicon:
        "https://serpapi.com/images/i/iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y-mAAAATlBMVEVHcEzwBH_wBH_wBH_wBH_wBH_wBH_wBH_wBH_wBH_wA3_____wAHrvAHX0ZqX4pMf3nML-9fvxHYb6udT95fD3jbrzVp3zRZXwDoLxHofGsf4DAAAACnRSTlMAPKFd1n6x7r4X4uI38wAAANVJREFUKJF90tkOhCAMBVBBFmEK6rjO___oUKGgwXDjg3rSooWuoxiphH5EEfXaVhlSlaiJkOXn8_eN-REWg_FDcRGNfcE5oWhgbxuoG3hbsUbZQtVC8Y7xP_F7IOfwFEh4jpTDTykbpLaQe_ncdg1tOX6QWzNOdLeESokDgq3GPSC7hgAVYlcb555LMx6AS8bddMsTNyw0uNeqaMLLZDxBOAfnZ8J1RxN0KK_JOb_MflqX3YX1rC5HVkd2AOGyt7or_HkoZfeIuW0dN10VJtUwcMnKmz-DHBzk6N8pHgAAAABJRU5ErkJggg.png",
      snippet:
        "Strapi is the leading open-source headless CMS. It's 100% Javascript, fully customizable, support TypeScript and developer-first. It saves API development ...",
      snippet_highlighted_words: [Array],
      about_this_result: [Object],
      about_page_link:
        "https://www.google.com/search?q=About+https://jamstack.org/headless-cms/strapi/&tbm=ilp",
      about_page_serpapi_link:
        "https://serpapi.com/search.json?engine=google_about_this_result&google_domain=google.com&q=About+https%3A%2F%2Fjamstack.org%2Fheadless-cms%2Fstrapi%2F",
      source: "Jamstack",
    },
    {
      position: 4,
      title: "Strapi",
      link: "https://www.linkedin.com/company/strapi",
      redirect_link:
        "https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.linkedin.com/company/strapi&ved=2ahUKEwi37fLfw9CVAxX8KEQIHZgCG4oQFnoECCkQAQ",
      displayed_link: "22.1K+ followers",
      favicon:
        "https://serpapi.com/images/i/iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8_9hAAAAm0lEQVR4AWP4__8_RRhMyLfs3sNQvOk_KRikB24ATNB2yhEQJtoQuAEwzVAAYtPVAMJe4Cjf8l-0bsd_RkIGQAGc_ej9t_-TDt_7_-vPXzD_6Yfv_-2nHSXWAAT49P33_z9__4HZl559JM2Aqm3XwXyXGcfA_H___pFmgFj9DjCfp3IrTIgkA5ADbbAbQA6mKDPp9x7YBTOAIgwAVba5DGceMlQAAAAASUVORK5CYII.png",
      snippet:
        "Strapi is the leading open-source headless CMS. It's 100% JavaScript, fully customizable and developer-first.",
      snippet_highlighted_words: [Array],
      about_this_result: [Object],
      about_page_link:
        "https://www.google.com/search?q=About+https://www.linkedin.com/company/strapi&tbm=ilp",
      about_page_serpapi_link:
        "https://serpapi.com/search.json?engine=google_about_this_result&google_domain=google.com&q=About+https%3A%2F%2Fwww.linkedin.com%2Fcompany%2Fstrapi",
      source: "LinkedIn · Strapi",
      read_more_link:
        "https://www.linkedin.com/company/strapi#:~:text=Strapi%20is%20the%20leading%20open%2Dsource,JavaScript%2C%20fully%20customizable%20and%20developer%2Dfirst.",
    },
    {
      position: 5,
      title: "Strapi Reviews & Ratings 2026 | Gartner Peer Insights",
      link: "https://www.gartner.com/reviews/product/strapi",
      redirect_link:
        "https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.gartner.com/reviews/product/strapi&ved=2ahUKEwi37fLfw9CVAxX8KEQIHZgCG4oQFnoECCgQAQ",
      displayed_link: "https://www.gartner.com › reviews › product › strapi",
      favicon:
        "https://serpapi.com/images/i/iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y-mAAAAk1BMVEX____3-fve4-vJz9zDyNTX3Oa3wNGKlbBUaJIPN3UAGWMACl9CWomGjaistcjr7_Ruf6EgPXYAH2UAJGcAJ2kAKGkAIWYAF2Jpd5vDzNsAHGQAImY0SHs2V4p7j7GRob6yu817j68OLm0eOXPk6fE5UIKosMMwQ3dhbJBLZZJecppRX4ikssl7iKYAAFoAM3UhSYKaZNJxAAABFklEQVR4Aa2SBXIFIQxAWXcjCSvf3eX-pyuddRtr3yjzgCj7DxRV0yWaoYyVadmO63mu4wdh1HdqnLgckAhBpJTlXaf5BRAKN03dhbyQ-kbroiVH5N5qvdmsV2m64NtOPJsTgm1Up93eZC3hARCzNotjx0WxoIWvskm00wJxx6bZOoiHfEaeOcJFKZPZXEvOjUwJLqyUt5T_4gVTcuVyDkRuI0MgSI6lvD8ejwSl7Ca0f1ZPJTFiKw1f0OLeDmrXlexVEBzCGWkmQLA0pyWLC6TFYa2WUW6dhMrygMB9f77fxHsLorQjZQmOfEwgISLgZLEuT_tTFGKxWIgiPWTPwYyOWyu-nZYn-3U2o4ndjFTDMFRp_swPjq0YxxfD23EAAAAASUVORK5CYII.png",
      snippet:
        "Strapi is an open-source content management software designed to enable developers and organizations to create, manage, and distribute digital content across ...",
      snippet_highlighted_words: [Array],
      about_this_result: [Object],
      about_page_link:
        "https://www.google.com/search?q=About+https://www.gartner.com/reviews/product/strapi&tbm=ilp",
      about_page_serpapi_link:
        "https://serpapi.com/search.json?engine=google_about_this_result&google_domain=google.com&q=About+https%3A%2F%2Fwww.gartner.com%2Freviews%2Fproduct%2Fstrapi",
      source: "Gartner",
      read_more_link:
        "https://www.gartner.com/reviews/product/strapi#:~:text=Strapi%20is%20an%20open%2Dsource%20content,digital%20content%20across%20various%20platforms.",
    },
  ],
  related_searches: [
    {
      block_position: 1,
      query: "Strapi pricing",
      link: "https://www.google.com/search?sca_esv=9a7b4fd913cb9306&q=Strapi+pricing&sa=X&ved=2ahUKEwi37fLfw9CVAxX8KEQIHZgCG4oQ1QJ6BAgjEAE",
      serpapi_link:
        "https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&q=Strapi+pricing",
    },
    {
      block_position: 1,
      query: "Strapi login",
      link: "https://www.google.com/search?sca_esv=9a7b4fd913cb9306&q=Strapi+login&sa=X&ved=2ahUKEwi37fLfw9CVAxX8KEQIHZgCG4oQ1QJ6BAguEAE",
      serpapi_link:
        "https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&q=Strapi+login",
    },
    {
      block_position: 1,
      query: "Strapi CMS",
      link: "https://www.google.com/search?sca_esv=9a7b4fd913cb9306&q=Strapi+CMS&sa=X&ved=2ahUKEwi37fLfw9CVAxX8KEQIHZgCG4oQ1QJ6BAgsEAE",
      serpapi_link:
        "https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&q=Strapi+CMS",
    },
    {
      block_position: 1,
      query: "Strapi GitHub",
      link: "https://www.google.com/search?sca_esv=9a7b4fd913cb9306&q=Strapi+GitHub&sa=X&ved=2ahUKEwi37fLfw9CVAxX8KEQIHZgCG4oQ1QJ6BAgrEAE",
      serpapi_link:
        "https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&q=Strapi+GitHub",
    },
    {
      block_position: 1,
      query: "Strapi admin",
      link: "https://www.google.com/search?sca_esv=9a7b4fd913cb9306&q=Strapi+admin&sa=X&ved=2ahUKEwi37fLfw9CVAxX8KEQIHZgCG4oQ1QJ6BAgnEAE",
      serpapi_link:
        "https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&q=Strapi+admin",
    },
    {
      block_position: 1,
      query: "Strapi tutorial",
      link: "https://www.google.com/search?sca_esv=9a7b4fd913cb9306&q=Strapi+tutorial&sa=X&ved=2ahUKEwi37fLfw9CVAxX8KEQIHZgCG4oQ1QJ6BAgmEAE",
      serpapi_link:
        "https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&q=Strapi+tutorial",
    },
    {
      block_position: 1,
      query: "Strapi AI",
      link: "https://www.google.com/search?sca_esv=9a7b4fd913cb9306&q=Strapi+AI&sa=X&ved=2ahUKEwi37fLfw9CVAxX8KEQIHZgCG4oQ1QJ6BAglEAE",
      serpapi_link:
        "https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&q=Strapi+AI",
    },
    {
      block_position: 1,
      query: "Strapi demo",
      link: "https://www.google.com/search?sca_esv=9a7b4fd913cb9306&q=Strapi+demo&sa=X&ved=2ahUKEwi37fLfw9CVAxX8KEQIHZgCG4oQ1QJ6BAgkEAE",
      serpapi_link:
        "https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&q=Strapi+demo",
    },
  ],
  pagination: {
    current: 1,
    next: "https://www.google.com/search?q=strapi&sca_esv=9a7b4fd913cb9306&ei=ek9VarfIFfzRkPIPmIXs0Ag&start=10&sa=N&sstk=AU9db-DxLKjS3BbHZVczgCuk6ZgeyqZGyHiLqYwg2u-f_3Ri2NKYwu0icp2CtAWVvVVcNNTDjSab_A_z84a7DNDeynu3OZVp7gOlRg&ved=2ahUKEwi37fLfw9CVAxX8KEQIHZgCG4oQ8NMDegQIIRAQ",
    other_pages: {
      "2": "https://www.google.com/search?q=strapi&sca_esv=9a7b4fd913cb9306&ei=ek9VarfIFfzRkPIPmIXs0Ag&start=10&sa=N&sstk=AU9db-DxLKjS3BbHZVczgCuk6ZgeyqZGyHiLqYwg2u-f_3Ri2NKYwu0icp2CtAWVvVVcNNTDjSab_A_z84a7DNDeynu3OZVp7gOlRg&ved=2ahUKEwi37fLfw9CVAxX8KEQIHZgCG4oQ8tMDegQIIRAE",
      "3": "https://www.google.com/search?q=strapi&sca_esv=9a7b4fd913cb9306&ei=ek9VarfIFfzRkPIPmIXs0Ag&start=20&sa=N&sstk=AU9db-DxLKjS3BbHZVczgCuk6ZgeyqZGyHiLqYwg2u-f_3Ri2NKYwu0icp2CtAWVvVVcNNTDjSab_A_z84a7DNDeynu3OZVp7gOlRg&ved=2ahUKEwi37fLfw9CVAxX8KEQIHZgCG4oQ8tMDegQIIRAG",
      "4": "https://www.google.com/search?q=strapi&sca_esv=9a7b4fd913cb9306&ei=ek9VarfIFfzRkPIPmIXs0Ag&start=30&sa=N&sstk=AU9db-DxLKjS3BbHZVczgCuk6ZgeyqZGyHiLqYwg2u-f_3Ri2NKYwu0icp2CtAWVvVVcNNTDjSab_A_z84a7DNDeynu3OZVp7gOlRg&ved=2ahUKEwi37fLfw9CVAxX8KEQIHZgCG4oQ8tMDegQIIRAI",
      "5": "https://www.google.com/search?q=strapi&sca_esv=9a7b4fd913cb9306&ei=ek9VarfIFfzRkPIPmIXs0Ag&start=40&sa=N&sstk=AU9db-DxLKjS3BbHZVczgCuk6ZgeyqZGyHiLqYwg2u-f_3Ri2NKYwu0icp2CtAWVvVVcNNTDjSab_A_z84a7DNDeynu3OZVp7gOlRg&ved=2ahUKEwi37fLfw9CVAxX8KEQIHZgCG4oQ8tMDegQIIRAK",
      "6": "https://www.google.com/search?q=strapi&sca_esv=9a7b4fd913cb9306&ei=ek9VarfIFfzRkPIPmIXs0Ag&start=50&sa=N&sstk=AU9db-DxLKjS3BbHZVczgCuk6ZgeyqZGyHiLqYwg2u-f_3Ri2NKYwu0icp2CtAWVvVVcNNTDjSab_A_z84a7DNDeynu3OZVp7gOlRg&ved=2ahUKEwi37fLfw9CVAxX8KEQIHZgCG4oQ8tMDegQIIRAM",
      "7": "https://www.google.com/search?q=strapi&sca_esv=9a7b4fd913cb9306&ei=ek9VarfIFfzRkPIPmIXs0Ag&start=60&sa=N&sstk=AU9db-DxLKjS3BbHZVczgCuk6ZgeyqZGyHiLqYwg2u-f_3Ri2NKYwu0icp2CtAWVvVVcNNTDjSab_A_z84a7DNDeynu3OZVp7gOlRg&ved=2ahUKEwi37fLfw9CVAxX8KEQIHZgCG4oQ8tMDegQIIRAO",
    },
  },
  serpapi_pagination: {
    current: 1,
    next_link:
      "https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&q=strapi&start=10",
    next: "https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&q=strapi&start=10",
    other_pages: {
      "2": "https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&q=strapi&start=10",
      "3": "https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&q=strapi&start=20",
      "4": "https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&q=strapi&start=30",
      "5": "https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&q=strapi&start=40",
      "6": "https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&q=strapi&start=50",
      "7": "https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&q=strapi&start=60",
    },
  },
};

// The "strapi" search above, mapped into the app's searchContext shape so it
// can be used as previously fetched content (e.g. seeded into localStorage).
export const defaultSearchContext: searchContext = {
  query: defaultFetch.search_parameters.q,
  result: {
    articles: defaultFetch.organic_results.map((result) => ({
      title: result.title,
      link: result.link,
      snippet: result.snippet,
      source: result.source,
    })),
    videos: defaultFetch.inline_videos
      .filter((video) => "short_clip" in video)
      .map((video) => ({
        title: video.title,
        link: video.link,
        snippet: video.snippet ?? "",
        thumbnail: video.thumbnail,
        duration: video.duration,
        source: video.channel,
      })),
    youtube: defaultFetch.inline_videos.map((video) => ({
      title: video.title,
      link: video.link,
      snippet: video.snippet ?? "",
      thumbnail: video.thumbnail,
      duration: video.duration,
      source: video.channel,
    })),
    ai: defaultFetch.related_questions.map((question) => ({
      title: question.question,
      link: question.link ?? question.serpapi_link,
      snippet: question.snippet ?? "",
      source: question.displayed_link ?? "Google AI Overview",
    })),
  },
};

console.log(defaultFetch);
