<template>
  <div id="app">
    <vue-backpropagation-exercise
      :data="example.netTree"
      :func="example.netFuncTex"
      :height="600"
      :width="700"
      :expectedOut="5"
      :errorPrecisionDigits="5"
      :errorFunc="example.errFuncTex"
      :netErrorHandler="example.errorHandler"
      :debug="false"
      :submissionValidator="handleSubmit"
      editable="w_1"
      lang="en"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VueBackpropagationExercise from "./components/VueBackpropagationExercise.vue";
import Example from "./examples/example2";

@Component({
  components: {
    VueBackpropagationExercise
  }
})
export default class App extends Vue {
  protected example = Example;

  handleSubmit(values: {
    [key: string]: number;
  }): { valid: boolean; message?: string } {
    console.log(values);
    return { valid: true };
  }
}
</script>

<style lang="sass">
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  font-size: 1em
  text-align: center
  color: #2c3e50
  margin: 60px 0
</style>
