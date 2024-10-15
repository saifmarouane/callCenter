import { data } from "autoprefixer";

export const createFormData = 
(FormData , data) => {
    formData.push(data);
};
export const readFormData = 
(FormData , data) => {
    return formData;
};
export const updateFormData = 
(FormData , index, nexData) => {
    formData[index]= newData;
};
export const deleteFormData = 
(FormData , index) => {
    FormData.splice(index, 1);
};