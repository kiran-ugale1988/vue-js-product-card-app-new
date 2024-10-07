// src/mixins/mixin.js
export const myMixin = {
    data() {
      return {
        mixinMessage: 'Hello from the mixin!'
      };
    },
    methods: {
      mixinMethod() {
        console.log('This method is from the mixin!');
        this.message = 'This method is from the mixin!';
      }
    },
    created() {
      console.log('Mixin created hook');
      this.message = 'Mixin created hook';
    }
  };
  