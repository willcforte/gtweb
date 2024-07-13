<template>
    <div class="px-5 xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md sm:max-w-screen-sm mb-8 ml-auto mr-auto">
        <header>
            <h1 class="grid place-items-center text-7xl mb-6 mt-8"><a href="/" class="href robotomono"><img src="~/assets/img/wcf_rast_c.svg" alt="wcf" class="inlinesvg">/GTWeb</a></h1>
            <nav class="grid place-items-center">
                <ul class="float-left flex flex-wrap flex-col md:flex-row text-3xl md:text-lg space list-none">
                    <li class="float-left px-1 lg:px-2 m-0"><NuxtLink to="/">home</NuxtLink></li>
                    <h4 class="float-left px-1 lg:px-2 m-0 invisible md:visible"> | </h4>
                    <li class="float-left px-1 lg:px-2 m-0"><NuxtLink to="/about">about</NuxtLink></li>
                    <h4 class="float-left px-1 lg:px-2 m-0 invisible md:visible"> | </h4>
                    <li class="float-left px-1 lg:px-2 m-0"><NuxtLink to="/robotics">engineering</NuxtLink></li>
                    <h4 class="float-left px-1 lg:px-2 m-0 invisible md:visible"> | </h4>
                    <li class="float-left px-1 lg:px-2 m-0"><NuxtLink to="/gallery">gallery</NuxtLink></li>
                    <h4 class="float-left px-1 lg:px-2 m-0 invisible md:visible"> | </h4>
                    <li class="float-left px-1 lg:px-2 m-0"><NuxtLink to="/articles">blog</NuxtLink></li>
                    <h4 class="float-left px-1 lg:px-2 m-0 invisible md:visible"> | </h4>
                    <li class="float-left px-1 lg:px-2 m-0"><NuxtLink to="/research">research</NuxtLink></li>
                    <!-- <h4 class="float-left px-1 lg:px-2 m-0 invisible md:visible"> | </h4>
                    <li class="float-left px-1 lg:px-2 m-0"><NuxtLink to="/self-study">self-study</NuxtLink></li> -->
                    <!-- <h4 class="float-left px-1 lg:px-2 m-0 invisible md:visible"> | </h4>
                    <li class="float-left px-1 lg:px-2 m-0"><NuxtLink to="/calculus">calculus</NuxtLink></li> -->
                </ul>
            </nav>
        </header>
        <content>
            <slot />
        </content>
    </div>
    <footer class="p-5 w-full">
        <div class="mb-2 flex justify-center">
            <span class="spacei footertext">wcf</span><span class="text-4xl footertext robotomono">/GTWeb</span>
        </div>
        <div class="mt-5 flex justify-center">
            <a href="https://www.linkedin.com/in/willcforte/"><i class="fa-brands fa-linkedin w-4 inline-block mx-1 text-white"></i></a>
            <a href="https://github.com/willcforte"><i class="fa-brands fa-github w-4 inline-block mx-1 text-white"></i></a>
            <a href="https://www.instagram.com/willcforte/"><i class="fa-brands fa-instagram w-4 inline-block mx-1 text-white"></i></a>
            <a href="https://www.youtube.com/@willcforte"><i class="fa-brands fa-youtube w-4 inline-block mx-1 text-white"></i></a>
        </div>
        <div class="mt-5 flex justify-center text-white italic">
            Made from scratch by Will C. Forte © 2023
        </div>
        <div class="mt-1 flex justify-center text-white italic whitespace-pre">
            Contact me @ <a href="mailto:willcforte@gmail.com" class="link">willcforte@gmail.com</a>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
    @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');
</style>