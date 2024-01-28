function validateMessageMiddleware(req, res, next) {
  const { firstName, lastName, email, contact, customerMessage } = req.body;

  if (!firstName || !lastName || !email || !contact || !customerMessage) {
    res.status(400).json({
      errors: {
        firstName: 'First name is required',
        lastName: 'Last name is required',
        email: 'Email is required',
        contact: 'Contact number is required',
        customerMessage: 'Message is required',
      },
    });
    return;
  }
  next();
}

export default validateMessageMiddleware;
