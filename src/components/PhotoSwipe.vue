<template>
    <div class="pswp"
         tabindex="-1"
         role="dialog"
         aria-hidden="true">

        <div class="pswp__bg" />
        <div class="pswp__scroll-wrap">
            <div class="pswp__container">
                <div class="pswp__item" />
                <div class="pswp__item" />
                <div class="pswp__item" />
            </div>
            <div class="pswp__ui pswp__ui--hidden">
                <div class="pswp__top-bar">
                    <div class="pswp__counter" />
                    <button
                            class="pswp__button pswp__button--close"
                            title="Close (Esc)"
                    />
                    <div class="pswp__preloader">
                        <div class="pswp__preloader__icn">
                            <div class="pswp__preloader__cut">
                                <div class="pswp__preloader__donut" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                    <div class="pswp__share-tooltip" />
                </div>
                <button
                        class="pswp__button pswp__button--arrow--left"
                        title="Previous (arrow left)"
                />
                <button
                        class="pswp__button pswp__button--arrow--right"
                        title="Next (arrow right)"
                />
                <div class="pswp__caption">
                    <div class="pswp__caption__center" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import "./style/pswp/pswp.scss";

    export default {
        name: "PhotoSwipe",
        data () {
            return {
                photoswipe: null,
                component: null,
            }
        }
    }
</script>

<style scoped>

</style>