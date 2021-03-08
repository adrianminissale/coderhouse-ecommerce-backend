module.exports = (req:any, res:any, next:any) => {
  try {
    const administrator = true
    const methods = ['POST', 'PATCH', 'DELETE']
    const rutes = ['products', 'cart']

    if (!rutes.some( rute => req.url.includes(rute) )) {
      throw new Error()
    } else if (!administrator && methods.some(method => req.method.includes(method)) && req.url.includes('products')) {
      res.status(401).json({
        error: -1,
        description: `ruta ${req.url} método ${req.method} no autorizada`
      })
    } else {
      next()
    }
  } catch {
    res.status(401).json({
      error: -2,
      description: `ruta ${req.url} método ${req.method} no implementada`
    })
  }
}
