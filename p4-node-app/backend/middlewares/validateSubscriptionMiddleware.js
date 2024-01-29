function validateSubscriptionMiddleware(req, res, next) {
  const { firstName, lastName, email, contact } = req.body;
  if (!firstName || !lastName || !email || !contact) {
    res.status(400).json({
      firstName: 'First name is required',
      lastName: 'Last name is required',
      email: 'Email is required',
      contact: 'Contact number is required',
    });
    return;
  } else {
    next();
  }
}

export default validateSubscriptionMiddleware;
