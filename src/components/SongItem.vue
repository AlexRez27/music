<template>
  <li
    :class="`song-id-${song.docID}`"
    class="
      flex
      justify-between
      items-center
      p-3
      pl-6
      cursor-pointer
      transition
      duration-300
      hover:bg-gray-50
      example
      snapshot
    "
  >
    <div>
      <router-link
        :to="{ name: 'song', params: { id: song.docID } }"
        class="font-bold block text-gray-600 composition-name"
      >
        >
        {{ song.modified_name }}
      </router-link>
      <span class="text-gray-500 text-sm">{{ song.display_name }} </span>
    </div>

    <div class="text-gray-600 text-lg">
      <router-link
        v-slot="{ navigate }"
        custom
        :to="{ name: 'song', params: { id: song.docID }, hash: '#comments' }"
      >
        <span
          class="comments"
          @click="navigate"
        >
          <i
            :class="isLiked ? 'fas fa-thumbs-up mr-4 like' : 'far fa-thumbs-up mr-4 like'"
            @click.prevent="like(song.docID)"
          />
          <i class="far fa-comments text-gray-600" />
          {{ song.comment_count }}
        </span>
      </router-link>
    </div>
  </li>
</template>

<script>
import { songsCollection } from '@/includes/firebase';

export default {
  name: 'SongItem',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    song: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      isLiked: false,
      classSet: 'fas fa-thumbs-up mr-4',
    };
  },
  mounted() {
    this.getLike(this.song.docID);
  },
  methods: {
    async like(id) {
      this.isLiked = !this.isLiked;
      await songsCollection.doc(id).update({
        isLiked: this.isLiked,
      });
      this.getLike(this.song.docID);
    },
    async getLike(id) {
      const songData = await songsCollection.doc(id).get();
      this.isLiked = songData.data().isLiked;
    },
  },
};
</script>

<style>
  .like {
    z-index: 9999;
  }
</style>
