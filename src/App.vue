<template>
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
</template>

<script>
export default {
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
};
</script>

<style scoped>
/* Add some styles here if needed */
</style>
