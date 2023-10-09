export function requireAdmin (req, res, next) {
  const user = req.user// Supongamos que el usuario autenticado se almacena en req.user

  if (user && user.role === 'admin') {
    next() // El usuario es administrador, permite que continúe con la siguiente función de middleware o ruta
  } else {
    res.status(403).json({ message: 'Acceso no autorizado' }) // Usuario no autorizado
  }
}
