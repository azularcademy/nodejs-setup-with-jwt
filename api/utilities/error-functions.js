import message from "../../config/message";

export const err500S = async function (res, err = '') {
  return res.status(500).json({
    message: "Internal server error",
    status: false
  });
}


export const allMandatoryFieldsRequiredS = async function (res) {
  return res.status(202).json({
    message: message.mandatoryFields,
    status: false
  });
}

