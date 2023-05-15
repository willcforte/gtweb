<template>
    <h2>Articles</h2>

    <ContentList path="\articles" :query="doneQuery" v-slot="{ list }">
        <div class="m-5" v-for="article in list" :key="article._path">
            <h3 class="link"><a :href="article._path">{{ article.title }}</a></h3>
            <p>{{ article.description }} {{ article.date }}</p>
        </div>
    </ContentList>

    <h2>To Be Written</h2>

    <h3>Check out the <NuxtLink to="/gallery" class="linkall">gallery</NuxtLink> for more recent updates!</h3>

    <ContentList path="\articles_todo" v-slot="{ list }">
        <div class="m-5" v-for="article in list" :key="article._path">
            <h3 class="link"><a :href="article._path">{{ article.title }}</a></h3>
            <p>{{ article.description }} {{ article.date }}</p>
        </div>
    </ContentList>
</template>

<script setup lang="ts">
    import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types';
    const doneQuery: QueryBuilderParams = { path: '/articles', where: [{ status: 'done' }] }
</script>

<style lang="scss" scoped>

</style>