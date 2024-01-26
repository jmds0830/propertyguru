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
      message: 'Must input all necessary fields',
    });
    console, log('Must input all necessary fields');
    return;
  } else {
    next();
  }
}

export default validateBookingMiddleware;
