<template>
    <div>
        ARTICLE FORMAT
        <NuxtLink to="/articles">BACK TO ARTICLES</NuxtLink>
    </div>

    <div>
        <slot />
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
    .router-link-exact-active {
        color: #3fb23f;
    }
</style>