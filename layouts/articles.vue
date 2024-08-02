<template>
    <!-- not implemented rn -->
    <!-- <div>
        ARTICLE FORMAT
        <NuxtLink to="/articles">BACK TO ARTICLES</NuxtLink>
    </div>

    <div>
        <NuxtPage />
    </div> -->

    <div class="mt-10">
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