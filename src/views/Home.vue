<template>
    <div class="home">
        <p class="text-white bg-black p-10">hello</p>
        <HelloWorld msg="hello"></HelloWorld>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default defineComponent({
    name: 'Home',
    components: {
        HelloWorld,
    },
});
</script>
