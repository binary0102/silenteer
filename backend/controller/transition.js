const users = new Map();
exports.resetTransition = function (req, res) {
  const userId = req.header('userId');
  users.set(userId, {
    currentColor: 'blue',
    counterOfVisitYellow: 0,
    _id: userId,
  }); 

  return res.status(200).send("Ok");
}

exports.updateTransition = function (req, res) {
  try {
    const { color } = req.params;
    const userId = req.header('userId');

    const user = users.get(userId);

    const resultValidation = validationState(user, color);
    
    if (resultValidation) {
      return res.status(400).send(resultValidation);
    }

    updateStateOfUser(user, color);


    return res.status(200).send("Ok");
  } catch (err) {
    return res.status(500).send("Internal Error");
  }
}

function updateStateOfUser(user, color) {
  const update = {
    currentColor: color,
    counterOfVisitYellow: user.counterOfVisitYellow,
    _id: user._id
  }
  if (color === 'yellow') {
    update.counterOfVisitYellow = 1;
  }
  
  if (user.currentColor === 'blue' && color === 'green' && user.counterOfVisitYellow > 0) {
    update.counterOfVisitYellow = 0;
  }
  users.set(user._id, update);
}

function validationState(user, color) {
  if (color === user.currentColor) {
    return null;
  }
  if (color === 'green' &&  user.currentColor === 'yellow' ) {
    return "invalid";
  }
  if (color === 'yellow' &&  user.currentColor === 'green' ) {
    return "invalid";
  }

  if (user.counterOfVisitYellow === 1 && color === 'yellow') {
    return "Cannot visit Yellow consecutively";
  }
}