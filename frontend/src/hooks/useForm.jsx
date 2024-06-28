import { useState} from "react";
import Imagetobase64 from "../helpers/Imagetobase64";

// Hook personalizado useForm para manejar formularios

export const useForm = (initialObj = {}) => {

  // hook para cuando se llena el formulario
  const [form, setForm] = useState(initialObj);

  // Método que recibe un target que a su vez va a recibir un input
  const changed = ({target}) => {
    const {name, value} = target;

    setForm({
      ...form,
      [name]: value
    });

  }

  return {
    form,
    setForm,
    changed
  }

}


// Hook personalizado para manejar subida de imágenes

export const useImageUpload = (setForm) => {

  const handleUploadAvatar = async (e) => {
    const file = e.target.files[0];
    const imageAvatar = await Imagetobase64(file);

    setForm((prevForm) => ({
      ...prevForm,
      profileAvatar: imageAvatar,
    }));

    console.log("imageAvatar", imageAvatar);
    console.log("file", file);
  };

  return {
    handleUploadAvatar,
  };
};
