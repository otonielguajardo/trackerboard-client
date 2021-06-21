<template>
    <div class="flex cursor-pointer">
        <div
            :class="{
                'bg-red-500': status == 'red',
                'bg-yellow-500': status == 'orange',
                'bg-green-500': status == 'green',
            }"
            class="rounded-r-none rounded-md w-2"
        ></div>
        <div class="bg-white p-3 rounded-l-none rounded-md mr-3 flex-grow">
            {{ pilot }}
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'TrackboardItem',
    props: ['data'],
    computed: {
        pilot(): string {
            return this.data.pilot || 'Cargando...';
        },
        status(): unknown {
            return this.data.status || 'Cargando...';
        },
    },
});
</script>
