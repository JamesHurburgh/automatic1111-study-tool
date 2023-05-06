<template>
    <v-card class="fill-height" scrollable density="compact">
        <v-toolbar>
            <v-toolbar-title>Images</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-slider
            label="Image Size" v-model="imageSize" prepend-icon="mdi-image-size-select-small"  append-icon="mdi-image-size-select-large" show-ticks :min="1" :max="4"
                :step="1"></v-slider>
        </v-toolbar>
        <v-card-text>
            <v-item-group selected-class="bg-primary">
                <v-container>
                    <v-responsive class="d-flex align-center text-center fill-height">
                        <v-row no-gutters>
                            <v-col v-for="image in images" :key="image.id" cols="4" :md="imageSize">
                                <v-hover>
                                    <template v-slot:default="{ isHovering, props }">
                                        {{ isHovering }}
                                        <v-item v-slot="{ isSelected, selectedClass, toggle }">
                                            <v-card class="d-flex align-center" dark @click="model = image"
                                                :title="isHovering">
                                                <v-img :src="image.id" :alt="image.metaData?.prompt" cover>
                                                    <v-chip v-if="image.metaData?.prompt" variant="elevated" size="x-small">
                                                        <v-icon start icon="mdi-drawing"></v-icon>
                                                        {{ image.metaData?.prompt }}
                                                    </v-chip>
                                                    <!-- <v-chip v-if="image.artist" variant="plain" size="x-small">
                                                <v-icon start icon="mdi-account"></v-icon>
                                                {{ image.artist }}
                                            </v-chip>
                                            <v-chip v-if="image.modifiers" variant="plain" size="x-small">
                                                <v-icon start icon="mdi-drawing-box"></v-icon>
                                                {{ image.modifiers }}
                                            </v-chip> -->
                                                </v-img>
                                            </v-card>
                                        </v-item>
                                    </template>
                                </v-hover>
                            </v-col>
                        </v-row>
                    </v-responsive>
                </v-container>
            </v-item-group>
            <v-expand-transition>
                <v-sheet v-if="model != null" height="200">
                    <div class="d-flex fill-height align-center justify-center">
                        <h3 class="text-h6">
                            Selected {{ model.metaData }}
                        </h3>
                    </div>
                </v-sheet>
            </v-expand-transition>
        </v-card-text>
        <v-card-actions>
            <div class="text-center">
                <v-pagination v-model="pageNumber" :length="totalPages" total-visible="10" rounded="circle" prev-icon="mdi-menu-left"
                    next-icon="mdi-menu-right"></v-pagination>
            </div>
        </v-card-actions>
    </v-card>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue'
import { ImageDatabase } from '@/types/ImageDatabase';
import { LocalImage } from '@/types/LocalImage';
import { DatabaseStats } from '@/types/DatabaseStats';

export default defineComponent({
    data() {
        return {
            pageNumber: 1,
            model: null as unknown as LocalImage,
            imageSize: 2
        }
    },
    created() {
        ImageDatabase.initialise()
    },
    computed: {
        images: function () {
            var page = ImageDatabase.dao.getPage<LocalImage>(this.pageNumber, this.pageSize)
            return page
        },
        totalPages: function () { return Math.ceil(DatabaseStats.totalImages / this.pageSize) },
        pageSize: function ():number { return 24 / this.imageSize }
    }
})
</script>
  