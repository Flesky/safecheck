<script setup lang="ts">
import { RouterView } from "vue-router";
import NavbarIcon from "@/components/NavbarIcon.vue";
import IconHouse from "@/components/icons/IconHouse.vue";
import IconHouseFill from "@/components/icons/IconHouseFill.vue";
import IconInfo from "@/components/icons/IconBroadcast.vue";
import IconInfoFill from "@/components/icons/IconBroadcastPin.vue";
import IconPerson from "@/components/icons/IconPerson.vue";
import IconPersonFill from "@/components/icons/IconPersonFill.vue";
</script>

<template>
  <div class="flex h-full flex-col lg:flex-row">
    <nav class="hidden w-80 flex-col border-r p-6 lg:flex">
      <div class="font-display text-4xl font-bold text-green-600">
        SafeCheck
      </div>
      <p class="mt-2 text-lg text-black">
        Contribute to a healthier
        <span class="whitespace-nowrap">New Normal</span>
      </p>
      <div class="mt-8 space-y-4">
        <NavbarIcon path="/home" name="Home">
          <template #icon><IconHouse /></template>
          <template #activeIcon><IconHouseFill /></template>
        </NavbarIcon>
        <NavbarIcon path="/updates" name="Updates">
          <template #icon><IconInfo /></template>
          <template #activeIcon><IconInfoFill /></template>
        </NavbarIcon>
        <NavbarIcon path="/user" name="User">
          <template #icon><IconPerson /></template>
          <template #activeIcon><IconPersonFill /></template>
        </NavbarIcon>
      </div>
    </nav>
    <div class="grow overflow-y-auto bg-gray-50">
      <router-view v-slot="{ Component }">
        <keep-alive exclude="InfoView">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
    <nav
      class="grid h-16 max-h-16 min-h-[4rem] grid-cols-3 border-t bg-white px-4 lg:hidden"
    >
      <NavbarIcon path="/home" name="Home">
        <template #icon><IconHouse /></template>
        <template #activeIcon><IconHouseFill /></template>
      </NavbarIcon>
      <NavbarIcon path="/updates" name="Updates">
        <template #icon><IconInfo /></template>
        <template #activeIcon><IconInfoFill /></template>
      </NavbarIcon>
      <NavbarIcon path="/user" name="User">
        <template #icon><IconPerson /></template>
        <template #activeIcon><IconPersonFill /></template>
      </NavbarIcon>
    </nav>
  </div>
</template>
