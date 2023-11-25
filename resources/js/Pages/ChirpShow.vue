<template>
  <div>
    <h1>Chirps</h1>
    <ul>
      <li v-for="chirp in chirps" :key="chirp.id">
        <inertia-link :href="route('chirps.show', { chirp: chirp.id })">
          {{ chirp.title }}
        </inertia-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    chirps: {
      type: Array,
      required: true,
    },
  },
};
</script>