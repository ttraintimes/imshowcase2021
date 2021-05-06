<template>
  <fieldset class="formField mb-1">
    <legend class="formField__label" :for="fieldName" :data-required="required" :id="`${fieldName}-label`">Authors</legend>
    <!-- <input type="text" name="project_author" id="authorsField" required> -->
    <ul class="multiInput">
      <li class="multiInput__field mb-1" v-for="(project, i) in value" :key="i">
        <input
          :aria-labelledby="`${fieldName}-label`"
          type="text"
          :placeholder="placeholder"
          :name="fieldName"
          v-model="items[i]"
          :required="required"
          :id="`${fieldName}-${i}`"
        >
        <button class="button button--blue button--small ml-1" @click.prevent="removeItem(i)" v-if="items.length > 1 && allowNone === false || allowNone === true">Remove</button>
      </li>
    </ul>
    <button class="button button--pink  button--small mr-auto" style="font-size: .8rem" @click.prevent="addItem('')">Add Author</button>
  </fieldset>
</template>

<script>
  export default {
    props: {
      fieldName: {
        type: String,
        required: true,
      },
      allowNone: {
        type: Boolean,
        default: false,
        required: false,
      },
      value: {
        type: Array,
        default: () => [""]
      },
      placeholder: String,
      required: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        items: this.value || []
      }
    },
    methods: {
      addItem(val) {
        this.items.push(val);
        this.$emit("input", this.items);
      },
      removeItem(index) {
        if (this.items.length == 1 && this.allowNone === false) return;
        this.items = this.items.filter((_, i) => i !== index);
        this.$emit("input", this.items);
      },
      setItem(index, val) {
        console.log(val);
        this.items[index] = val;
        this.$emit("input", this.items);
      }
    }
  }
</script>

<style lang="scss" scoped>
.multiInput {
  padding: 0;
  list-style: none;
  &__field {
    display: flex;
    > input {
      flex-grow: 1;
    }
  }
}
</style>
