exports.handle404 = (req, res) => {
    res.status(404).json({ ok: false, message: 'Recurso no encontrado' });
  };
  