(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-77552398"],{"5d72":function(t,s,e){"use strict";e.r(s);var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[t.loader?e("loader-page"):e("div",{staticClass:"post"},[t.post?e("div",{staticClass:"post__container"},[e("div",{staticClass:"post__card"},[e("div",{staticClass:"post__header"},[e("div",{staticClass:"post__info",style:{backgroundImage:"linear-gradient(0deg, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)),url("+t.backgroundUrl+")"}},[e("div",{staticClass:"post__date"},[e("ion-icon",{attrs:{name:"calendar-outline"}}),t.post.date?e("span",[t._v(t._s(t._f("date")(t.post.date,"date")))]):e("span",[t._v(t._s(t._f("date")(t.date,"date")))])],1),e("h3",{staticClass:"post__title"},[t._v(t._s(t.post.title))]),e("span",{staticClass:"post__subtitle"},[t._v(t._s(t.post.subtitle))])])]),e("div",{staticClass:"post__body"},[e("p",{staticClass:"post__text",domProps:{innerHTML:t._s(t.post.body)}})])])]):t._e()])],1)},i=[],n=(e("4de4"),e("d3b7"),e("eec8")),o=(e("6dc6"),{components:{LoaderPage:n["a"]},data:function(){return{date:new Date,id:"",post:null,loader:!0,index:"",backgroundUrl:""}},mounted:function(){this.filterPosts(),this.loader=!1},computed:{getPosts:function(){return this.$store.getters.posts}},methods:{filterPosts:function(){var t=this;this.getPosts&&(this.id=this.$route.params.id,this.post=this.getPosts.filter((function(s){return s.id==t.id}))[0],this.post.imageUrl?this.backgroundUrl=this.post.imageUrl:this.backgroundUrl="https://cdn.liveagent.com/app/uploads/2021/06/sigmund-59yRYIHWtzY-unsplash.jpg")}}}),r=o,d=e("2877"),l=Object(d["a"])(r,a,i,!1,null,null,null);s["default"]=l.exports},"6dc6":function(t,s,e){},7433:function(t,s,e){},eec8:function(t,s,e){"use strict";var a=function(){var t=this,s=t.$createElement;t._self._c;return t._m(0)},i=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"loader six"},[e("div"),e("div"),e("div")])}],n=(e("7433"),{}),o=n,r=e("2877"),d=Object(r["a"])(o,a,i,!1,null,null,null);s["a"]=d.exports}}]);
//# sourceMappingURL=chunk-77552398.a70f60f3.js.map