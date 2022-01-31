<template>
  <div class="about">
    <div class="photo">
      <Loader v-if="imageLoading" absolute />
      <img :src="image" :alt="name" />
    </div>
    <div class="name">
      {{ name }}
    </div>
    <div>{{ email }}</div>
    <div>{{ blog }}</div>
    <div>{{ phone }}</div>
  </div>
</template>

<script>
import Loader from '~/components/Loader';
import { mapState } from 'vuex';
export default {
  data() {
    return {
      imageLoading: true,
    };
  },
  components: {
    Loader,
  },
  computed: {
    // mapstate(모듈명, 상태명)
    ...mapState('about', ['image', 'name', 'email', 'blog', 'phone']),
    // image() {
    //   return this.$store.state.about.image;
    // },
    // name() {
    //   return this.$store.state.about.name;
    // },
    // email() {
    //   return this.$store.state.about.email;
    // },
    // blog() {
    //   return this.$store.state.about.blog;
    // },
    // phone() {
    //   return this.$store.state.about.phone;
    // },
  },
  // 라이프사이클에서는 별도로 async 를 달 수 없으므로 별도의 methods 를 생성하는 것ㄴ
  mounted() {
    this.init();
  },

  methods: {
    async init() {
      await this.$loadImage(this.image);
      this.imageLoading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.about {
  text-align: center;
  .photo {
    position: relative;
    width: 250px;
    height: 250px;
    margin: 40px auto 20px;
    padding: 30px;
    border: 10px solid $gray-300;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: $gray-200;
    img {
      width: 100%;
      border-radius: 50%;
    }
  }

  .name {
    font-size: 40px;
    font-family: 'Oswald', sans-serif;
    margin-bottom: 20px;
  }
}
</style>
