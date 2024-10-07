<template>
    <div id="app">
      <h1>Product Cards Test</h1>
      <div class="product-container">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
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
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import ProductCard from './ProductCard.vue';
  
  export default {
    name: 'App',
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
      axios.get('https://fakestoreapi.com/products')
        .then(response => {
          this.products = response.data;
        })
        .catch(error => {
          console.error('Error fetching products:', error);
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