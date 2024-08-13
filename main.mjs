import express from 'express'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'

const server = express()

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

server.get('*', (req, res) => {
    const pageData = getPageData(req.url);

    const app = createSSRApp({
        template: `
            <div>
                <h1>{{ title }}</h1>
    
                <div v-if="pageType === 'home'">
                    <p>Welcome to the home page!</p>
                    <ul>
                        <li v-for="item in items" :key="item.id">
                            {{ item.name }} - {{ item.description }}
                        </li>
                    </ul>
                </div>
    
                <div v-else-if="pageType === 'profile'">
                    <p>User Profile for {{ username }}</p>
                    <p>Bio: {{ bio }}</p>
                    <h2>Posts:</h2>
                    <ul>
                        <li v-for="post in posts" :key="post.id">
                            {{ post.title }} - {{ post.content }}
                        </li>
                    </ul>
                </div>
    
                <div v-else>
                    <p>404 - Page Not Found</p>
                </div>
            </div>
        `,
        props: {
            title: {
                type: String,
                required: true
            },
            pageType: {
                type: String,
                required: true
            },
            username: {
                type: String,
                default: ''
            },
            bio: {
                type: String,
                default: ''
            },
            posts: {
                type: Array,
                default: () => []
            },
            items: {
                type: Array,
                default: () => []
            }
        }
    }, pageData);

    renderToString(app).then((html) => {
        const finalHtml = template
            .replace('<!--vue-ssr-title-->', pageData.title)
            .replace('<!--vue-ssr-outlet-->', html);
        res.send(html)
    })
})

server.listen(3000, () => {
    console.log('ready')
})

// Helper function to generate a large array of items
function generateItems(count) {
    return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        name: `Item ${i + 1}`,
        description: `Description for item ${i + 1}`
    }));
}

// Helper function to generate a large array of posts
function generatePosts(count) {
    return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        title: `Post Title ${i + 1}`,
        content: `Content of post ${i + 1}.`
    }));
}

// Simulate different JSON objects based on the request URL
function getPageData(url) {
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