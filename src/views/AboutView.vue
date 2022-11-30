
<template>
  <div class="bg-primary-200">
    <div class=" space-y-8 text-center md:py-40 py-20 px-8">
        <h1 class="text-3xl font-bold tracking-tight sm:text-4xl">Our Story</h1>
        <p class="text-gray-500 text-lg max-w-screen-md mx-auto">Everyone has different reasons why they want to learn Spanish. Unfortunately, there is not a magical one-size-fits-all method out there. We really looked for many hours, nay, many days! With hundreds of apps, books, movies, youtube channels, etc. each claiming to be the best, most greatest way to learn, how does one choose the most effective learning path for their particular need? Spoon or Shovel was born out of a desire to find the best way to learn Spanish for YOU. We hope you will find it useful.</p>
      </div>
  </div>
  <div class="bg-white">
    <div class="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8 lg:py-24">
      <div class="space-y-12 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">   
        <div class="space-y-5 sm:space-y-4">
          <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Our Team</h2>
          <p class="text-xl text-gray-500">We met at Y-combinator's<a href="https://www.startupschool.org" target="_blank" class="pointer-events auto text-primary-500 hover:underline"> startup-school</a>. Their co-founder matching tool helped us connect but our shared passion for language-learning brought us together.</p>
        </div>
        <div class="lg:col-span-2">
          <ul role="list" class="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:gap-x-8">
            <li v-for="person in people" :key="person.name">
              <div class="space-y-4">
                <div class="aspect-w-2 aspect-h-2">
                  <img class="rounded-lg object-cover shadow-lg" :src="person.imageUrl" alt="" />
                </div>
                <div class="space-y-1 text-lg font-medium leading-6">
                  <h3>{{ person.name }}</h3>
                  <p class="text-primary-600">{{ person.role }}</p> 
                </div>
                <div class="text-lg">
                  <p class="text-gray-500">{{ person.bio }}</p>
                </div>
                <div class="text-sm">
                  <p class="text-gray-400">{{person.info1}}</p>
                  <p class="text-gray-400">{{person.info2}}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>



  <div class="">
    <div class="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-24 lg:px-14 bg-primary-200 rounded-lg">
      <h2 class="text-2xl font-bold tracking-tight text-gray-900 lg:text-3xl">
        <span class="block">Have a Spanish resource you want us to look at?</span>
        <span class="block text-primary-600">Let us know and we will check it out.</span>
      </h2>
      <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
        <div class="inline-flex rounded-md shadow">
          <RouterLink :to="{name: 'contact'}" class="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-5 py-3 text-base font-medium text-white hover:bg-primary-700">Contact Us</RouterLink>
        </div>
      </div>
    </div>
  </div>


</template>

<script setup>

import miko from "@/assets/images/miko.png"
import himanshu from "@/assets/images/himanshu.png"
const people = [
  {
    name: 'Miko Borys',
    role: 'Co-Founder, Software Engineer',
    imageUrl: miko,
    bio: '"I used to be terrible at learning languages. I thought learning another language was an endurance feat where my fluency was proportional to how much time I could sit down and memorize words every day. After slogging through 10 years of Ukrainian Saturday school and failing hard, I stepped back, and questioned my process. With a renewed perspective, system and new tools, my language learning completely 180’d and I went from embarrassed and withdrawn to fully-confident and always engaged. I’m always looking for the best tool for the job and optimizing my learning techniques!"',
    info1: 'Learning: Spanish, Japanese, Ukrainian and Russian',
    info2: '',

  },
  {
    name: 'Himanshu Mehru',
    role: 'Co-Founder, Software Engineer',
    imageUrl:himanshu,
    bio: '"I was frustrated by doing many years of Duolingo and not getting anywhere. By using a customized learning roadmap created by Spoon Or Shovel, I hope to learn Spanish much faster."',
    info1: 'Duolingo Streak: '+ getDuolingoStreak()+ " Days",
    info2: 'Learning: Spanish, French, Russian',

  },
  // More people...
]

//Himanshu's duolingo streak:
function getDuolingoStreak(){
  let date1 = new Date("12/29/2018");
  let date2 = new Date();   
  let Difference_In_Time = date2.getTime() - date1.getTime();
  let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));
  return Difference_In_Days;
}

</script>