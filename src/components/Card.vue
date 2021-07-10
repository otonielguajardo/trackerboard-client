<template>
    <div class="card">
        <div :class="statusClass" class="card-status"></div>
        <div class="card-content">
            <div
                class="h-full bg-cover rounded-sm bg-center"
                :style="{ 'background-image': 'url(' + pilotImage + ')' }"
            ></div>
            <span class="dark:text-gray-50" :class="language != 'aurebesh' ? 'truncate' : ''">{{ pilotName }}</span>
            <small class="text-gray-400 text-right" v-if="language != 'aurebesh'"> {{ progress.toFixed() }}%</small>
            <small class="text-gray-400 select-none col-span-3 truncate">{{ stageSince }}</small>
        </div>
    </div>
</template>

<script lang="ts">
import moment from 'moment';
import { computed, defineComponent } from 'vue';

export default defineComponent({
    name: 'Card',
    props: {
        statusClass: {
            required: true,
            type: String,
            validator: function (value: string) {
                return ['good', 'warning', 'danger', 'loading'].indexOf(value) !== -1;
            },
        },
        theme: {
            required: false,
            type: String,
            validator: function (value: string) {
                return ['light', 'dark'].indexOf(value) !== -1;
            },
            default: 'light',
        },
        language: {
            required: false,
            type: String,
            validator: function (value: string) {
                return ['human', 'aurebesh'].indexOf(value) !== -1;
            },
            default: 'human',
        },
        statusDate: { required: true, type: String },
        pilotImage: { required: true, type: String },
        pilotName: { required: true, type: String },
        progress: {
            required: true,
            type: Number,
            default: 0,
            validator: function (value: number) {
                return value >= 0 && value <= 100;
            },
        },
    },
    setup(props: any) {
        const stageSince = computed(() => moment(props.statusDate).fromNow());
        return { stageSince };
    },
});
</script>

<style lang="scss" scoped>
.card {
    @apply flex cursor-pointer;
    &-status {
        @apply rounded-r-none rounded-md w-2 transition-colors duration-700 bg-gray-300 dark:bg-gray-800;
        &.danger {
            @apply bg-red-500;
        }
        &.warning {
            @apply bg-yellow-500;
        }
        &.good {
            @apply bg-green-500;
        }
    }
    &-content {
        @apply bg-white dark:bg-gray-900 p-2 rounded-l-none rounded-md mr-3 flex-grow select-none;
        @apply grid gap-x-2 items-center gap-y-1;
        grid-template-columns: 25px 1fr 28px;
        grid-template-rows: 1fr 1fr;
    }
}
</style>
