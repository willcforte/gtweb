<template>
    <div class="px-5 mb-8">
        <header>
            <h2 class="grid place-items-center"><a href="/" class="href robotomono"><img src="~/assets/img/wcf_rast.svg" alt="wcf" class="inlinesvg">/GTWeb</a></h2>
            <nav class="grid place-items-center m-6">
                <ul class="float-left flex">
                    <li class="float-left px-2 m-0"><NuxtLink to="/"><h4>home</h4></NuxtLink></li>
                    <h4 class=""> | </h4>
                    <li class="float-left px-2 m-0"><NuxtLink to="/about"><h4>about</h4></NuxtLink></li>
                    <h4 class=""> | </h4>
                    <li class="float-left px-2 m-0"><NuxtLink to="/articles"><h4>articles</h4></NuxtLink></li>
                    <h4 class=""> | </h4>
                    <li class="float-left px-2 m-0"><NuxtLink to="/gallery"><h4>gallery</h4></NuxtLink></li>
                    <h4 class=""> | </h4>
                    <li class="float-left px-2 m-0"><NuxtLink to="/robotics"><h4>robotics & CAD</h4></NuxtLink></li>
                    <h4 class=""> | </h4>
                    <li class="float-left px-2 m-0"><NuxtLink to="/calculus"><h4>calculus</h4></NuxtLink></li>
                </ul>
            </nav>
        </header>
        <content>
            <slot />
        </content>
    </div>
    <footer class="p-5">
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
            Made by William C. Forte © 2023
        </div>
        <div class="mt-1 flex justify-center text-white italic whitespace-pre">
            Contact me @ <a href="mailto:willcforte@gmail.com" class="link">willcforte@gmail.com</a>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
    @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');
</style>