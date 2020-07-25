axios.defaults.baseURL = 'https://autumnfish.cn';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

new Vue({
    el: "#player",
    data: {
        query: "阿冗",
        musicList: [],
        musicUrl: "",
        musicCover: "images/music.png",
        musicComments: [],
        isPlaying: false,
        MVUrl: "",
        isMVShow: false
    },
    mounted: function () {
        this.searchMusic();
    },
    methods: {
        searchMusic: function () {
            var me = this;
            // 歌曲关键词搜素
            axios.get("/search?keywords=" + this.query)
                .then(function (res) {
                    me.musicList = res.data.result.songs;
                })
        },
        playMusic: function (id) {
            var me = this;
            // 获取歌曲url
            axios.get("/song/url?id=" + id)
                .then(function (res) {
                    me.musicUrl = res.data.data[0].url;
                });
            // 获取歌曲封面
            axios.get("/song/detail?ids=" + id)
                .then(function (res) {
                    me.musicCover = res.data.songs[0].al.picUrl;
                });
            // 获取歌曲评论
            axios.get("/comment/hot?type=0&id=" + id)
                .then(function (res) {
                    me.musicComments = res.data.hotComments;
                });
        },
        play: function () {
            this.isPlaying = true;
        },
        pause: function () {
            this.isPlaying = false;
        },
        playMV: function (id) {
            var me = this;
            axios.get("/mv/url?id=" + id)
                .then(function (res) {
                    me.isMVShow = true;
                    me.MVUrl = res.data.data.url;
                })
        },
        hiddenMV: function () {
            this.isMVShow = false;
        }

    }
})