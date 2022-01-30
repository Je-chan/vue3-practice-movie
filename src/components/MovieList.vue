<template>
  <div class="container">
    <div class="inner">
      <MovieItem v-for="movie in movies" :key="movie.imdbID" :movie="movie" />
    </div>
  </div>
</template>
<script>
import MovieItem from '~/components/MovieItem';
export default {
  components: {
    MovieItem,
  },

  computed: {
    // computed 를 사용하는 이유는 반응성이 유지된 상태로 화면에 렌더링 돼야하기 때문.
    movies() {
      return this.$store.state.movie.movies;
    },
  },
};
</script>
<style lang=""></style>
