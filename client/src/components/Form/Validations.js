const validateName = /^[a-z]+$/i;
const validateImageURL = /\bhttps?:\/\/\S+\.(?:png|jpe?g|gif|webp|bmp)\b/;

export const validationByName = (name) => {
  if (!validateName.test(name)) {
    return "Name must have only letters";
  }
  if (name.length < 3) {
    return "Name must have 3 letters";
  }
  return "";
};
export const validationImage = (url) => {
  if (!validateImageURL.test(url)) {
    return "Name must be an image url";
  }
  return "";
};

export const validationByType = (types) => {
  if (types.length < 1) {
    return "You need at least a type";
  }
  return ""
};
