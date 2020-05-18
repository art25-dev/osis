// Проверка наличия токена в store/auth.js
export default function ({ store, redirect }) {
  if (!store.getters["auth/isAuth"]) {
    redirect("/admin/login?message=login")
  }
}
