<template>
    <div id="app">
      <h1>Product Cards Test</h1>
      <div id="parent" class="product-container">
        <ProductCard
         @customEvent="handleEvent"
          v-for="product in products"
          :key="product.id"
          :product="product"
          class="child"
        />
      </div>
      <h1>Custom Pipe Test</h1>
      {{ message | capitalize }}
      <br>
      {{ message | uppercase }}
  
      <h1>Custom Directive Test</h1>
      <h1 v-color="'blue'">This text is blue</h1>
      <h1 v-color="'green'">This text is green</h1>
      <h1 v-color="'red'">This text is red</h1>

      <div>
        <p>{{ mixinMessage }}</p>
        <button @click="mixinMethod">Click me</button>
    </div>
    
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import ProductCard from './ProductCard.vue';
  import { myMixin } from '@/mixins/mixin.js';
  
  export default {
    name: 'App',
    /**
     * Mixins allows you to share common functionalities across multiple components. They bundle reusable logic into a single object, 
     * which can then be included in any component.
     */
    mixins: [myMixin],
    components: {
      ProductCard
    },
    directives: {
      color: {
        bind(e1, binding){
            e1.style.color =  binding.value;
        }
      }
    },
    data() {
      return {
        message: 'hello world',
        products: []
      };
    },
    created() {
      this.fetchProductsUsingAsyncAwait()
        .then(products => {
          this.products = products;
        })
        .catch( error => {
           console.error('Error fetching products', error);
        });

        /*
        //Following is another way to call products
        axios.get('https://fakestoreapi.com/products')
        .then(response => {
          this.products = response.data;
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });*/
    },
    mounted() {
        // Adding the event listener when the component is mounted
        document.querySelector('#parent').addEventListener('click', function(event) {
        if (event.target.matches('.child')) {
            console.log('Child element clicked!');
        }
        });
    },
    filters: {
      uppercase(value) {
        if (!value) return '';
        return value.toString().toUpperCase();
      }
    },
    methods: {
      formatPrice(value) {
        return `$${value.toFixed(2)}`;
      },
       fetchProductsUsingNewPromise() {
        /*
        A promise is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
        States of a Promise:
        Pending: Initial state, neither fulfilled nor rejected.
        Fulfilled: Operation completed successfully.
        Rejected: Operation failed.

        By using promises, you can handle asynchronous operations more cleanly and predictably.
        This example shows how to fetch data using promises, making your Vue components more robust and easier to manage.
        */
        return new Promise((resolve, reject) => {
            axios.get('https://fakestoreapi.com/products')
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
        });
      },
      /**
       * The async and await keywords in JavaScript provide a more straightforward and readable way to work with promises, allowing you to write asynchronous code that looks and behaves like synchronous code.

        Purpose of async and await:

        async: Defines an asynchronous function. An async function always returns a promise.
        await: Pauses the execution of an async function until the promise is resolved. It can only be used inside an async function.
       */
      async fetchProductsUsingAsyncAwait() {
            try {
                const response = await axios.get('https://fakestoreapi.com/products');
                return response.data;
            } catch (error) {
                throw new Error('Failed to fetch products');
            }
        },
        handleEvent(payload) {
            this.message = payload;
        }
    }
  };

  </script>

  <style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .product-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
  }
  </style>