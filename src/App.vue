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

  handleSubmit(
    result: {
      [key: string]: number;
    },
    expected: {
      [key: string]: number;
    }
  ): { valid: boolean; message?: string } {
    // ToDo: Possible validation call to your custom backend
    let secret = "";
    const valid: boolean = JSON.stringify(result) === JSON.stringify(expected);
    if (valid) {
      secret = "8";
    }

    return {
      valid: valid,
      message: secret
    };
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
  margin: 60px auto
  width: 80%
  min-width: 800px
  padding: 0px 20px
</style>
