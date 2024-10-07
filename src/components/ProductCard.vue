<template>
    <div class="card">
        <img :src="product.image" alt="product image" />
        <h3>{{ product.title }}</h3>
        <p>{{ formatPrice(product.price) }}</p>
    </div>
</template>

<script>
export default {
    name: 'ProductCard',
    props: {
        product: Object
    },
    methods: {
        formatPrice(value) {
        return `${this.$currencySign}${value.toFixed(2)}`;
    }
  }
};
</script>

<style scoped>
.card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    width: 200px;
    box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.1);
}

img {
    width: 100px;
    height: 100px;
    object-fit: cover;
}

h3 {
    font-size: 1.2em;
    margin: 10px 0;
}

p {
    font-size: 1em;
    color: #333;
}
</style>