<template>
  <slot name="ar" v-if="$i18n.locale == 'ar'" />
  <slot v-else/>
</template>