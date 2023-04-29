<script>
export default {
  data() {
    return {
      message: ''
    }
  },
  mounted() {
    fetch('http://localhost:3000/exam', {
      method: 'post',
      headers: {
        'Content-Type': 'application/text'
      }
    })
      .then((response) => response.text())
      .then((data) => {
        this.message = data
      })
  }
}
</script>

<template>
  <main>
    <h1>Hello{{ ' ' + message }}!</h1>
  </main>
</template>
