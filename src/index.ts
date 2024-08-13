import { ResponseBuilder } from "@fermyon/spin-sdk";
import { createSSRApp } from "vue";
import { renderToString } from 'vue/server-renderer'
import App from "./App.vue";

export async function handler(req: Request, res: ResponseBuilder) {
    let url = new URL(req.url)
    const pageData = getPageData(url.pathname);
    //@ts-ignore
    const app = createSSRApp(App, pageData);

    let html = await renderToString(app);
    const finalHtml = template
        .replace('<!--vue-ssr-title-->', pageData.title)
        .replace('<!--vue-ssr-outlet-->', html);
    res.set({ "content-type": "text/html" });
    res.send(finalHtml);
}

// Define interfaces for data
interface Item {
    id: number;
    name: string;
    description: string;
}

interface Post {
    id: number;
    title: string;
    content: string;
}

interface PageData {
    title: string;
    pageType: 'home' | 'profile' | 'notFound';
    username?: string;
    bio?: string;
    items?: Item[];
    posts?: Post[];
}

// Helper function to generate a large array of items
function generateItems(count: number): Item[] {
    return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        name: `Item ${i + 1}`,
        description: `Description for item ${i + 1}`
    }));
}

// Helper function to generate a large array of posts
function generatePosts(count: number): Post[] {
    return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        title: `Post Title ${i + 1}`,
        content: `Content of post ${i + 1}.`
    }));
}

// Simulate different JSON objects based on the request URL
function getPageData(url: string): PageData {
    if (url === '/home') {
        return {
            title: 'Home Page',
            pageType: 'home',
            items: generateItems(100) // Generate 100 items
        };
    } else if (url.startsWith('/profile')) {
        return {
            title: 'User Profile',
            pageType: 'profile',
            username: 'john_doe',
            bio: 'A short bio about John Doe.',
            posts: generatePosts(50) // Generate 50 posts
        };
    } else {
        return {
            title: '404 - Not Found',
            pageType: 'notFound'
        };
    }
}

const template = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><!--vue-ssr-title--></title>
  <style>
  body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    h1 {
      color: #333;
      text-align: center;
    }
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      background: #fff;
      margin: 10px 0;
      padding: 10px;
      border: 1px solid #ddd;
    }
    p {
      color: #666;
      text-align: center;
    }
      </style>
</head>
<body>
  <!--vue-ssr-outlet-->
</body>
</html>
`;