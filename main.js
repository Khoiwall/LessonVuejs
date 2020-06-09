Vue.component('product',{
    props:{
        premium:{
            type: Boolean,
            required: true
        }
    },
    template:`
        <div class="product">
            <div class="product-image">
            
                <img class="size-image" v-bind:src="image"/> <!--We want image data here, we see file main.js-->
                <!--<img class="size-image" v-bind:src="Name"/> example (1) file main.js-->
            
            </div>
            <div class="product-info">
            
                <h1>{{title}}</h1>
                <!--{{name}} like phone call to data "name", data like mobilephone, When use call to data and call "name", then the content of data "name" will appear, my example data "product" have data is Socks, when I call {{product}}, then Socks will appear-->
                
                <p> {{colorSock}} </p>
                <!--Conditional if true, it will appear, false will not appear -->
                
                <p> Shipping {{shipping}} </p>

                <ul>
                    <li v-for="info in infos"> {{ info }} </li>
                </ul>
                
                <div v-for="variant in variants" :key="variant.variantId" class="box-color" :style="{backgroundColor: variant.variantColor} " @mouseover="chaneImage(variant.variantId)"></div>
                
                <ul class="Size">
                    <p>Size</p>
                    <li v-for="size in sizes"> {{ size }} </li>
                    <div></div>
                </ul>
                
                <button v-on:click="addToCart" class="add-cart btn btn-primary" :disabled="!colorSocks">Add cart</button>

            </div>
        </div>
    `,
    data(){
        return{
            brand: 'Vue Matery',
            product: 'Socks',
            selection: 0, //image data, looke careful file index.html line <img class... v-bind:src="image" /> image it same image data
            //Name: '.jpg or .png' (1)
            infos: ["80 cotton", "20% polyester", "Gender-neutral"],
            colorSocks: true,
            variants: [
                {
                    variantId: 0,
                    variantText: 'White socks',
                    variantColor: "White",
                    variantImage: 'kyrie_white.jpg'
                },
                {
                    variantId: 1,
                    variantText: 'Black socks',
                    variantColor: "Black",
                    variantImage: 'kyrie_black.jpg'
                }
            ],
            sizes: ["S", "M", "L", "XL", "XXL"],
        }
    },
    methods: {
        chaneImage(variantId){
            this.selection = variantId;
        },
        
        addToCart(){
            this.$emit('add-to-card');
        }
    },
    computed:{
        title(){
            return this.brand + ' ' + this.product;
        },
        
        image(){
            return this.variants[this.selection].variantImage;
        },
        
        colorSock(){
            return this.variants[this.selection].variantText;
        },

        shipping(){
            if (this.premium){
                return 'Free'
            }
            return '2.99$'
        },
    }
})

var app = new Vue({
    el: '#app',
    data:{
        premium: true,
        cart: 0
    },
    methods:{
        upDateCart(){
            this.cart += 1;
        },
    },
    computed:{
        dontClick(){
            if(this.cart < 10){
                return true;
            }
            return false;
        }
    }
})