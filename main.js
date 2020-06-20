var eventBus = new Vue

Vue.component('product',{
    props:{
        premium:{
            type: Boolean,
            required: true
        }
    },
    template:`
        <div class="product">

            <div class="row" style="width: 100%;">
                <div class="product-image col-6">
                
                    <img class="size-image" v-bind:src="image"/> <!--We want image data here, we see file main.js-->
                    <!--<img class="size-image" v-bind:src="Name"/> example (1) file main.js-->
            
                </div>

                <div class="product-info col-6">
                
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

            <product-tabs :reviews="reviews"></product-tabs>
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
            reviews: []
        }
    },
    methods: {
        chaneImage(variantId){
            this.selection = variantId;
        },
        
        addToCart(){
            this.$emit('add-to-card');
        },
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
    },
    mounted(){
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview)
        })
    }
}),

Vue.component('product-view',{
    template:`
        <form @submit.prevent="onSubmit">

            <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                    <li v-for="error in errors">{{error}}</li>
                </ul>
            </p>

            <lable for="name">Name:</lable>
            <input  id = "name" v-model="name" >

            <div class="comment">
                <lable for="review" class="review-center">Review:</lable>
                <textarea id ="review" v-model="review" ></textarea>
            </div>

            <div class="rating">
                <lable for="rating">Rating:</lable>
                <select id="rating" v-model.number="rating" >
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                </select>
            </div>

            <p>
                <input class="btn btn-primary" type="submit" value="submit">
            </p>
        </form>
    `,
    data(){
        return{
            name: null,
            review:null,
            rating:null,
            errors: []
        }
    },
    methods:{
        onSubmit(){
            if (this.name && this.review && this.rating){
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                }
    
                eventBus.$emit('review-submitted', productReview)
    
                this.name = null,
                this.review = null,
                this.rating = null
            }
            else{
                if(!this.name) this.errors.push('Name required')
                if(!this.reviews) this.errors.push('Review required')
                if(!this.rating) this.errors.push('Rating required')
            }
        }
    }
})

Vue.component('product-tabs', {
    props:{
        reviews:{
            type: Array,
            required: true
        }
    },
    template: `
        <div>
            <span class="tabs" :class="{ activeTab: selectab === tab }" v-for="(tab,index) in tabs" :key="index" @click="selectab = tab" >{{ tab }}</span>

            <div v-show="selectab === 'Review' ">
                <h2>Review</h2>
                <p>There are no reviews yet.</p>
                <ul>
                    <li v-for="review in reviews">
                        <p>{{review.name}}</p>
                        <p>{{review.review}}</p>
                        <p>{{review.rating}}</p>
                    </li>
                </ul>
            </div>

            <product-view  v-show="selectab === ' Make a Review'" ></product-view>
        </div>
    `,
    data(){
        return{
            tabs: ['Review', ' Make a Review'],
            selectab: 'Review'  
        }
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
})