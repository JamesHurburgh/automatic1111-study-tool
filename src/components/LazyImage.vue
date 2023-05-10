<!-- A Vue component for lazy loading an image-->
<template>
  <div>
    <v-img
      :src="src"
      :lazy-src="lazySrc"
      :aspect-ratio="aspectRatio"
      :width="width"
      :height="height"
      :contain="contain"
      :position="position"
      :gradient="gradient"
      :dark="dark"
      :light="light"
      :transition="transition"
      :elevation="elevation"
      :max-height="maxHeight"
      :max-width="maxWidth"
      :min-height="minHeight"
      :min-width="minWidth"
      :tile="tile"
      :tile-size="tileSize"
      :tile-color="tileColor"
      :tile-opacity="tileOpacity"
      :tile-repeat="tileRepeat"
      :tile-position="tilePosition"
      :srcset="srcset"
      :sizes="sizes"
      :alt="alt"
      :draggable="draggable"
      :download="download"
      :loading="loading"
      :error="error"
      :disable-transition="disableTransition"
      :class="classes"
      :style="styles"
      @load="onLoad"
      @error="onError"
    >
      <!-- <template v-slot:placeholder>
        <v-progress-circular
          indeterminate
          color="grey lighten-5"
          :size="imageSize"
        />
      </template> -->
    </v-img>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue';

export default defineComponent({
  name: 'LazyImage',
  props: [
    'src',
    'lazySrc',
    'aspectRatio',
    'width',
    'height',
    'contain',
    'position',
    'gradient',
    'dark',
    'light',
    'transition',
    'elevation',
    'maxHeight',
    'maxWidth',
    'minHeight',
    'minWidth',
    'tile',
    'tileSize',
    'tileColor',
    'tileOpacity',
    'tileRepeat',
    'tilePosition',
    'srcset',
    'sizes',
    'alt',
    'draggable',
    'download',
    'loading',
    'error',
    'disableTransition',
  ],
  computed: {
    classes(): string[] {
      return ['lazy-image'];
    },
    styles(): Record<string, string> {
      return {};
    },
    imageSize(): number {
      return this.height || this.width || 10;
    },
  },
  methods: {
    onLoad() {
      this.$emit('load');
    },
    onError() {
      this.$emit('error');
    },
  },
});

</script>