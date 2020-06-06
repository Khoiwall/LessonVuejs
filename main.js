var app = new Vue({
    el: '#app',
    data:{
        brand: 'Vue Matery',
        product: 'Socks',
        selection: 0, //image data, looke careful file index.html line <img class... v-bind:src="image" /> image it same image data
        //Name: '.jpg or .png' (1)
        colorSocks: true,
        infos: ["80 cotton", "20% polyester", "Gender-neutral"],
        variants: [
            {
                variantId: 0,
                variantColor: "White",
                variantImage: 'kyrie_white.jpg'
            },
            {
                variantId: 1,
                variantColor: "Black",
                variantImage: 'kyrie_black.jpg'
            }
        ],
        sizes: ["S", "M", "L", "XL", "XXL"],
        cart: 0
    },
    methods: {
        chaneImage(variantId){
            this.selection = variantId;
            console.log(this.selection);
        },
        addToCart(){
            this.cart += 1;
            if(this.cart === 10){
                this.colorSocks = false;
            }
        }
    },
    computed:{
        title(){
            return this.brand + ' ' + this.product;
        },
        image(){
            return this.variants[this.selection].variantImage;
        }
    }
})