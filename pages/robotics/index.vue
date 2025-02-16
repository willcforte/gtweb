<template>

    <h1 class="mb-0 mt-10">Engineering Project Reports</h1>

    <div class="flex flex-col-2 centerelement mt-4 mb-10">
        <div class="mr-10">
            <a href="/robotics/quadruped">
                <img src="@/assets/img/quadruped_v3.jpg" alt="Quadruped Beta Prototype" class="img border-black border-r-8 border-b-8" style="width: 70em;">
            </a>
        </div>
        <div>
            <h3><span class="link"><a href="/robotics/quadruped">Featured Project: DIY Quadruped Prototype</a></span></h3>
            <h4>LCFAQ: Low-Cost Fully-Actuated quadruped (prototype v3)</h4>
            <p>The LCFAQ is a low-cost quadrupedal robot intended to increase the accessibility of advanced robotics to high school educators and students already participating in FTC Robotics.</p>
            <a href="/robotics/quadruped"><div class="bg-black text-white pl-4 pr-4 py-2 w-fit text-2xl shadow-xl mb-5 m-auto mt-5 self-center" style="color: #E0D2BD">View Project <i  class="fa-sharp fa-solid fa-chevron-right"></i></div></a>
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

    <!-- <p>You can view the engineering logs for my robot below, complete with successes, failures, and servos billowing smoke.</p> -->

    <!-- <h2>Recent Engineering Logs</h2> -->

    <!-- <ContentList path="/robotics" :query="showQuery" v-slot="{ list }">
        <div class="m-5" v-for="log in list.slice().reverse()" :key="log.date">
            <h3 class="link"><a :href="log._path">{{ log.title }}</a></h3>
            <p>{{ log.description }} {{ log.date }}</p>
        </div>
    </ContentList> -->

    <ContentList path="/robotics" :query="showQuery" v-slot="{ list }">
        <div class="m-5" v-for="log in list.slice().reverse()" :key="log.date">
            <h3 class="mb-4"><span class="link"><a :href="log._path">{{ log.title }}</a></span></h3>
            <!-- <p>{{ log.description }} {{ log.date }}</p> -->

            <div class="flex flex-col lg:flex-row gap-8 items-center">
                <a :href="log._path">
                    <img :src="log.img_path" :alt="log.img_alt" class="w-full sm:w-3/4 md:w-4/5 lg:w-3/4 xl:w-2/3 max-w-6xl min-w-[28rem] border-black border-r-8 border-b-8">
                </a>
                <div>
                    <p class="text-lg mb-6">
                        {{ log.long_description }} {{ log.date }}
                    </p>
                    <a :href="log._path" class="bg-black text-cream px-4 py-2 text-2xl shadow-xl hover:bg-green-900 ml-0 md:ml-2 whitespace-nowrap">
                    View Project <i class="fa-sharp fa-solid fa-chevron-right"></i>
                    </a>
                </div>
            </div>
        </div>
    </ContentList>


    <br>

    <!-- <h3 class="my-4">Things I'd like to study someday (subject to change):</h3>

    <ul class="list-disc">
        <li><p class="my-1">Model-predictive control</p></li>
        <li><p class="my-1">UAVs</p></li>
        <li><p class="my-1">Using gyroscope and accelerometer data</p></li>
        <li><p class="my-1">Inverse kinematics</p></li>
        <li><p class="my-1">Deep learning control</p></li>
        <li><p class="my-1">Swarm robotics</p></li>
    </ul> -->
</template>

<script setup lang="ts">
    import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types';
    const showQuery: QueryBuilderParams = { path: '/robotics', where: [{ show: true }] };
    // const logQuery: QueryBuilderParams = { path: '/robotics', where: [{description: { $contains: '.' }}] };
</script>

<style lang="scss" scoped>

</style>