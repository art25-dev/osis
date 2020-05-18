<template></template>

<script>
export default {
  layout: "admin",
  middleware: ["adminAuth"],
  beforeCreate() {
    // Вызов Action logout() в store/auth.js
    this.$store.dispatch("auth/logout");
    this.$router.push("/admin/login?message=logout");
  }
};
</script>

<style lang="scss" scoped></style>
