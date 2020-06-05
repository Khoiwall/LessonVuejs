var app = new Vue({
    el: '#app',
    data:{
        product: 'Socks',
        image: 'kyrie_white.jpg', //image data, looke careful file index.html line <img class... v-bind:src="image" /> image it same image data
        //Name: '.jpg or .png' (1)
        colorSocks: true,
        infos: ["80 cotton", "20% polyester", "Gender-neutral"],
        variants: [
            {
                variantId: 1,
                variantColor: "White",
                variantImage: 'kyrie_white.jpg'
            },
            {
                variantId: 2,
                variantColor: "Black",
                variantImage: 'kyrie_black.jpg'
            }
        ],
        sizes: ["S", "M", "L", "XL", "XXL"],
        cart: 0
    },
    methods: {
        chaneImage(variantImage){
            this.image = variantImage;
        },
        addToCart(){
            this.cart += 1
        }
    }
})