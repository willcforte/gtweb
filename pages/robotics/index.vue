<template>

    <h2 class="mb-0">Robotics & CAD Engineering Log</h2>

    <h4>This is a project log for my Robotics & CAD independent study program during the 2023-2024 school year!</h4>

    <div class="flex flex-col-2 centerelement mt-4 mb-4">
        <div>
            <h3><span class="link"><a href="/robotics/quadruped">Featured Project: DIY Quadruped Prototype</a></span></h3>
            <h4>LCFAQ: Low-Cost Fully-Actuated quadruped (prototype v3)</h4>
            <p>The LCFAQ is a low-cost quadrupedal robot intendd to increase the accessibility of advanced robotics to high school educators and students already participating in FTC Robotics.</p>
            <a href="/robotics/quadruped"><div class="bg-black text-white pl-4 pr-4 py-2 w-fit text-2xl shadow-xl mb-5 m-auto mt-5 self-center" style="color: #E0D2BD">View Project <i  class="fa-sharp fa-solid fa-chevron-right"></i></div></a>
        </div>
        <div class="ml-10">
            <a href="/robotics/quadruped">
                <img src="@/assets/img/quadruped_v1.png" alt="Quadruped Beta Prototype" class="img border-black border-r-8 border-b-8" style="width: 100em;">
            </a>
        </div>
    </div>

    <!-- <div class="flex flex-col-2 centerelement">

        <div class="mr-6">
            <h3><span class="link centerelement"><a href="/robotics/quadruped">Featured Article: DIY Quadruped Prototype</a></span></h3>
            <p>This robot is the focus of my senior year independent study in robotics:</p>
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
    </div> -->

    <p>You can view the engineering logs for my robot below, complete with successes, failures, and servos billowing smoke.</p>

    <h2>Recent Engineering Logs</h2>

    <ContentList path="/robotics" :query="showQuery" v-slot="{ list }">
        <div class="m-5" v-for="log in list.slice().reverse()" :key="log.date">
            <h3 class="link"><a :href="log._path">{{ log.title }}</a></h3>
            <p>{{ log.description }} {{ log.date }}</p>
        </div>
    </ContentList>

    <h3 class="my-4">Things I'd like to study someday (subject to change):</h3>

    <ul class="list-disc">
        <li><p class="my-1">Model-predictive control</p></li>
        <li><p class="my-1">UAVs</p></li>
        <li><p class="my-1">Using gyroscope and accelerometer data</p></li>
        <li><p class="my-1">Inverse kinematics</p></li>
        <li><p class="my-1">Deep learning control</p></li>
        <li><p class="my-1">Swarm robotics</p></li>
    </ul>
</template>

<script setup lang="ts">
    import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types';
    const showQuery: QueryBuilderParams = { path: '/robotics', where: [{ show: true }] };
    // const logQuery: QueryBuilderParams = { path: '/robotics', where: [{description: { $contains: '.' }}] };
</script>

<style lang="scss" scoped>

</style>