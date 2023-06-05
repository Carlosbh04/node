exports.getUser = (req, res) => {
    console.log('Petición recibida del cliente');
    console.log('URL:', req.url);
    console.log('Método:', req.method);
    console.log('User-Agent:', req.headers['user-agent']);
  
    res.status(200).json({ ok: true, message: 'Recibido!' });
  };
  