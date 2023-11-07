<template>

    <h1 class="mb-0">Robotics & CAD Engineering Log</h1>

    <h4>This is a project log for my Robotics & CAD independent study program during the 2023-2024 school year!</h4>

    <div class="flex flex-col-2 centerelement">

        <div class="mr-6">
            <h3><span class="link centerelement"><a href="/robotics/quadruped">Featured Article: DIY Quadruped Prototype</a></span></h3>
            <h4>This robot is the focus of my senior year independent study in robotics:</h4>
            <h5>
                <ul class="list-disc">
                    <li>Fully 3D printed construction</li>
                    <li>12 servos</li>
                    <li>MuJoCo simulation</li>
                </ul>
            </h5>
        </div>

        <a href="/robotics/quadruped">
            <img src="@/assets/img/quadruped_v1.png" alt="Quadruped Beta Prototype" class="img" style="width: 25em;">
        </a>
    </div>

    <h4>You can view the engineering logs for my robot below, complete with successes, failures, and servos billowing smoke.</h4>

    <br>

    <h2>Recent Engineering Logs</h2>

    <ContentList path="/robotics/logs" v-slot="{ list }">
        <div class="m-5" v-for="log in list.slice().reverse()" :key="log.date">
            <h3 class="link"><a :href="log._path">{{ log.title }}</a></h3>
            <p>{{ log.description }} {{ log.date }}</p>
        </div>
    </ContentList>

    <h3 class="my-4">Things I'd like to study someday (subject to change):</h3>

    <ul class="list-disc">
        <li><h4 class="my-1">Model-predictive control</h4></li>
        <li><h4 class="my-1">UAVs</h4></li>
        <li><h4 class="my-1">Using gyroscope and accelerometer data</h4></li>
        <li><h4 class="my-1">Inverse kinematics</h4></li>
        <li><h4 class="my-1">Deep learning control</h4></li>
        <li><h4 class="my-1">Swarm robotics</h4></li>
    </ul>
</template>

<script setup lang="ts">
    import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types';
    const doneQuery: QueryBuilderParams = { path: '/robotics', where: [{ status: 'done' }] };
</script>

<style lang="scss" scoped>
    @import '../../assets/css/main.scss';
</style>