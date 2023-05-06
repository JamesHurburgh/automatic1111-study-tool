<template>
    <v-card :loading="loading" title="Add artists" subtitle="One artist per line">
        <v-card-text>
            <v-textarea label="Artists" variant="outlined" v-model:model-value="newArtists"></v-textarea>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="addArtists">Add</v-btn>
        </v-card-actions>
    </v-card>
</template>
  
<script lang="ts">
import { Artist } from '@/types/Artist'
import { ArtistDatabase } from '@/types/ArtistDatabase'
import { defineComponent } from 'vue'

export default defineComponent({
    data() {
        return {
            loading: false,
            newArtists: "",
            duplicateArtists: new Array<String>()
        }
    },
    methods: {
        addArtists: function (){
            this.loading = true
            this.duplicateArtists = []
            this.newArtists.split('\n').forEach(newArtistName => {
                if(ArtistDatabase.findArtistsByName(newArtistName).length > 0){
                    this.duplicateArtists.push(newArtistName)
                } else {
                    const artist = new Artist(newArtistName, [], "", "")
                    ArtistDatabase.addArtist(artist)
                    console.log(`Adding ${artist}.`)
                }
            })
            this.loading = false
        }
    }
})
</script>
  