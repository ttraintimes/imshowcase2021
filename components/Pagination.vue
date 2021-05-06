<template>
  <div class="pagination">
    <button class="button pagination__button" v-if="backForwardNav && currentPage > 1" @click="setPage(currentPage - 1)">&lt;</button>
    <button class="button pagination__button" :class="[`button--${page == currentPage ? 'pink' : 'blue'}`]" v-for="page in pageButtons" :key="page" @click="setPage(page)">{{page}}</button>
    <button class="button pagination__button" v-if="backForwardNav && currentPage < totalPages" @click="setPage(currentPage + 1)">&gt;</button>
  </div>
</template>

<script>
  export default {
    computed: {
      pageButtons() {
        let pages = [];
        //i is 1 or above and as close to 3 less than the current page as possible
        //min: 1
        let clamp = (n, min, max) => Math.min(max, Math.max(min, n));

        for (let i = clamp(this.currentPage - 3, 1, this.currentPage); i < this.currentPage + 3 && i <= this.totalPages; i++) {
          pages.push(i);
        }
        return pages;
      }
    },
    props: {
      currentPage: {
        type: Number,
        required: true,
      },
      totalPages: {
        type: Number,
        required: true,
      },
      backForwardNav: {
        type: Boolean,
        required: false
      }
    },
    methods: {
      setPage(p) {
        // console.log(p, p >= 1 && p <= this.totalPages)
        if (p >= 1 && p <= this.totalPages) this.$emit("pagination-setPage", p);
      }
    }
  }
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
  animation: fadeIn 1s 100ms 1 forwards;
  &__button {
    width: 40px;
    height: 40px;
    padding: unset;

    &.active {
    }

    &:not(:last-child) {
      margin-right: .8rem;
    }
  }
}
</style>
