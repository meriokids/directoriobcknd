// middlewares/errorHandler.js
module.exports = (err, req, res, next) => {
    console.error('🔥 Error:', err.stack);
  
    // Errores de validación de Mongoose
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        status: 'fail',
        message: err.message,
        errors: err.errors
      });
    }
  
    // Errores de JWT
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({
        status: 'fail',
        message: 'Token inválido'
      });
    }
  
    // Errores de duplicados en MongoDB
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      return res.status(400).json({
        status: 'fail',
        message: `El valor '${err.keyValue[field]}' ya existe para el campo ${field}`
      });
    }
  
    // Error genérico (500)
    res.status(500).json({
      status: 'error',
      message: 'Algo salió mal en el servidor'
    });
  };
  