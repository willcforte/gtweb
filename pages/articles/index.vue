<template>
    <h1 class="mb-4">Blog</h1>

    Here are some work-in-progress engineering projects and trains of thought.  <span class="link"><a href="/feed.rss">RSS Feed</a></span>

    <h4>View my finished projects <span class="link"><a href="/robotics">here</a></span>.</h4>

    <ContentList path="\articles" :query="doneQuery" v-slot="{ list }">
        <div class="mb-3" v-for="article in list.slice().reverse().sort((a, b) => (a.unix < b.unix) ? 1 : -1)" :key="article.unix">
            <h3 class="link mb-0"><a :href="article._path">{{ article.title }}</a></h3>
            <p class="text-sm pt-0">{{ article.date }} • {{ article.type }}</p>
            <!-- <p>{{ article.description }}</p> -->
        </div>
    </ContentList>

    <!-- <h2>To Be Written</h2>

    <ContentList path="\articles_todo" v-slot="{ list }">
        <div class="m-5" v-for="article in list.slice().reverse()" :key="article.date">
            <h3 class="link"><a :href="article._path">{{ article.title }}</a></h3>
            <p>{{ article.description }} {{ article.date }}</p>
        </div>
    </ContentList> -->

</template>

<script setup lang="ts">
    import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types';
    const doneQuery: QueryBuilderParams = { path: '/articles', where: [{ status: 'done' }] }
</script>

<style lang="scss" scoped>

</style>