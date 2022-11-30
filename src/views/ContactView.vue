<template>
<!-- Header -->
<div class="bg-warm-gray-50">
        <div class="py-24 lg:py-32">
          <div class="relative z-10 mx-auto max-w-7xl pl-4 pr-8 sm:px-6 lg:px-8">
            <h1 class="text-4xl font-bold tracking-tight text-warm-gray-900 sm:text-5xl lg:text-6xl">Get in touch</h1>
            <p class="mt-6 max-w-3xl text-xl text-warm-gray-500">Whether you would like to give us your feedback; report an error; recommend a particular resource; or just want to say hi, we would love to hear from you. </p>
          </div>
        </div>
      </div>

      <!-- Contact section -->
      <section class="relative bg-white" aria-labelledby="contact-heading">
        <div class="absolute h-1/2 w-full bg-warm-gray-50" aria-hidden="true" />
        <!-- Decorative dot pattern -->
        <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <svg class="absolute top-0 right-0 z-0 -translate-y-16 translate-x-1/2 transform sm:translate-x-1/4 md:-translate-y-24 lg:-translate-y-72" width="404" height="384" fill="none" viewBox="0 0 404 384" aria-hidden="true">
            <defs>
              <pattern id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" class="text-warm-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="404" height="384" fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)" />
          </svg>
        </div>
        <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div class="relative bg-white shadow-xl">
            <h2 id="contact-heading" class="sr-only">Contact us</h2>

            <div class="grid grid-cols-1 lg:grid-cols-2" >
              <!-- Contact form -->
              <div class="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12" v-if="submitted == false">
                <h3 class="text-lg font-medium text-warm-gray-900">Send us a message</h3>
                <form class="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8" @submit.prevent="contact">
                  <div>
                    <label for="firstname" class="block text-sm font-medium text-warm-gray-900">First name</label>
                    <div class="mt-1">
                      <input type="text" v-model="firstname" name="firstname" id="firstname" autocomplete="given-name" class="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500" required/>
                    </div>
                  </div>
                  <div>
                    <label for="lastname" class="block text-sm font-medium text-warm-gray-900">Last name</label>
                    <div class="mt-1">
                      <input type="text" v-model="lastname" name="lastname" id="lastname" autocomplete="family-name" class="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500" />
                    </div>
                  </div>
                  <div>
                    <label for="email" class="block text-sm font-medium text-warm-gray-900">Email</label>
                    <div class="mt-1">
                      <input id="email" v-model="email" name="email" type="email" autocomplete="email" class="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500" required/>
                    </div>
                  </div>
                  <div>
                    <div class="flex justify-between">
                      <label for="phone" class="block text-sm font-medium text-warm-gray-900">Phone</label>
                      <span id="phone-optional" class="text-sm text-warm-gray-500">Optional</span>
                    </div>
                    <div class="mt-1">
                      <input type="text" v-model="phone" name="phone" id="phone" autocomplete="tel" class="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500" aria-describedby="phone-optional" />
                    </div>
                  </div>
                  <div class="sm:col-span-2">
                    <label for="subject" class="block text-sm font-medium text-warm-gray-900">Subject</label>
                    <div class="mt-1">
                      <input type="text"  v-model="subject" name="subject" id="subject" class="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500" />
                    </div>
                  </div>
                  <div class="sm:col-span-2">
                    <div class="flex justify-between">
                      <label for="message" class="block text-sm font-medium text-warm-gray-900">Message</label>
                      <span id="message-max" class="text-sm text-warm-gray-500">Max. 500 characters</span>
                    </div>
                    <div class="mt-1">
                      <textarea v-model="message" id="message" name="message" rows="4" class="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500" aria-describedby="message-max" required/>
                    </div>
                  </div>
                  <div class="sm:col-span-2 sm:flex sm:justify-end">
                    <Button
                          label="Submit"
                          type="submit"
                          class="text-md"
                        />
                  </div>
                </form>
              </div>
              <div class="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12" v-if="submitted == true">
                <div v-if="error == false">
                  <p class="text-green-800 text-2xl font-medium" > Thanks for your message. We will connect with you very soon.</p>
                </div>
                <div v-if="error == true">
                  <p class="text-red-600 text-2xl font-medium" > Something went wrong. Please refresh the page and try again.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
</template>

<style></style>



<script setup lang="ts">
import { ref } from "vue";
import { API_URL } from "@/constants";
import { notify } from "@/notifier";
import Button from "@/components/Button.vue";
const firstname = ref(""); 
const lastname = ref(""); 
const email = ref(""); 
const phone = ref("");  
const subject = ref(""); 
const message = ref(""); 
const submitted = ref(false);
const error = ref(false);
async function contact() {
  try {
    await fetch(`${API_URL}contactform`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname:firstname.value,
        lastname:lastname.value,
        email: email.value,
        phone:phone.value,
        subject:subject.value,
        message:message.value
      }),
    });
    submitted.value = true;
  } catch (e) {
    console.error(e);
    notify("Error", "Something went wrong. Please try again in a few minutes.", false);
    submitted.value = false;
  } 
}
</script>