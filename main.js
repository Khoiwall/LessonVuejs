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
                variantColor: "White"
            },
            {
                variantId: 2,
                variantColor: "Black"
            }
        ],
        sizes: ["S", "M", "L", "XL", "XXL"]
    }
})