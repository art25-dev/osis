const keys = require("../keys")

module.exports.login = async (req, res) => {

  if (keys.LOGIN === req.body.login && keys.PASSWORD === req.body.password) {
    const token = true;
    res.send(token)
  } else {
    res.status(401).json({ message: "Неверный логин или пароль" })
  }
}
