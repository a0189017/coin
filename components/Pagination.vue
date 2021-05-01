<template>
  <div class='pagination'>
    <a href='javascript:;' class='page-item page-show' @click='click_handler(currentPage-10)'><<</a>
    <a href='javascript:;' class='page-item' :class='page.acted' v-for='page in pages' @click='click_handler(page.page)'>{{page.page}}</a>
    <a href='javascript:;' class='page-item page-show' @click='click_handler(currentPage+10)'>>></a>
  </div>
</template>
<script>
import callApi from '@/plugins/callApi';
export default {
  name: 'pagination',
  props: ['pages', 'currentPage','click_handler'],
};
</script>
