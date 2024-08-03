<template>
  
  <Tinymce v-model="value" @change="handleChange" width="100%" />
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import Tinymce from '@/components/tinymce/src/editor.vue'

  const value = ref('hello world!');
  function handleChange(value: string) {
    console.log(value);
  }
</script>
