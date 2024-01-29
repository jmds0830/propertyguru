function validateBookingMiddleware(req, res, next) {
  const {
    firstName,
    lastName,
    email,
    contact,
    propertyId,
    scheduleDate,
    scheduleTime,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !contact ||
    !propertyId ||
    !scheduleDate ||
    !scheduleTime
  ) {
    res.status(400).json({
      errors: {
        firstName: 'First name is required',
        lastName: 'Last name is required',
        email: 'Email is required',
        contact: 'Contact number is required',
        propertyId: 'Property ID is required',
        scheduleDate: 'Choose your preferred date',
        scheduleTime: 'Choose your preferred time',
      },
    });
    return;
  } else {
    next();
  }
}

export default validateBookingMiddleware;
