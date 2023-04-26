<template>
    <div class="px-5">
        <header>
            <h2 class="grid place-items-center"><a href="/" class="href robotomono">wcf/GTWeb</a></h2>
            <nav class="grid place-items-center m-6">
                <ul class="float-left flex">
                    <li class="float-left px-2 m-0"><NuxtLink to="/"><h4>home</h4></NuxtLink></li>
                    <h4 class=""> | </h4>
                    <li class="float-left px-2 m-0"><NuxtLink to="/about"><h4>about</h4></NuxtLink></li>
                    <h4 class=""> | </h4>
                    <li class="float-left px-2 m-0"><NuxtLink to="/articles"><h4>articles</h4></NuxtLink></li>
                    <h4 class=""> | </h4>
                    <li class="float-left px-2 m-0"><NuxtLink to="/robotics"><h4>robotics & CAD</h4></NuxtLink></li>
                    <h4 class=""> | </h4>
                    <li class="float-left px-2 m-0"><NuxtLink to="/calculus"><h4>calculus</h4></NuxtLink></li>
                </ul>
            </nav>
        </header>
        <slot />
    </div>
</template>

<style lang="scss" scoped>
    //a
</style>