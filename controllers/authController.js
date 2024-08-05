import User from "../models/userModels.js";
import Person from "../models/personModels.js";
import Employees from "../models/employeesModels.js";
import Beneficiary from "../models/beneficiariesModels.js";
import "../models/associations.js";
import { generateRefreshToken, generateToken } from "../utils/tokenManager.js";

/* Esta función maneja el inicio de sesión de un usuario.
   Verifica la existencia del usuario y la validez de la contraseña.
   Si es exitoso, genera tokens y los devuelve. */

export const login = async (req, res) => {
  try {
    const { use_mail, use_password } = req.body;

    // Validación de entrada
    if (!use_mail || !use_password) {
      return res.status(400).json({
        error: "login Correo electrónico y contraseña son requeridos",
      });
    }

    // Buscar el usuario en la base de datos
    let user = await User.findOne({ where: { use_mail } });
    if (!user)
      return res
        .status(403)
        .json({ error: "login No existe este usuario ", use_mail });

    // Comparar la contraseña
    const respuestaPassword = await user.comparePassword(use_password);
    if (!respuestaPassword)
      return res
        .status(403)
        .json({ error: "Login Contraseña incorrecta", use_password });

    // Obtener el rol del usuario desde la tabla `beneficiaries` o `employees`
    // Obtener la persona asociada al usuario
    const person = await Person.findOne({ where: { use_id: user.use_id } });
    let userRole = null;
    if (await Beneficiary.findOne({ where: { per_id: person.per_id } })) {
      userRole = "beneficiary";
    } else if (await Employees.findOne({ where: { per_id: person.per_id } })) {
      userRole = "employee";
    }

    if (!userRole) {
      return res.status(404).json({ error: "Rol de usuario no encontrado" });
    }

    // Generar tokens
    const { token, expiresIn } = generateToken(user.use_id);
    generateRefreshToken(user.use_id, res);

    return res.json({ token, expiresIn,userRole });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

/*Esta función se utiliza para manejar el registro de un usuario.
Primero verifica si el correo electrónico proporcionado ya está en uso.
Luego crea un nuevo usuario si el correo electrónico no está en uso y devuelve un token de autenticación.
También genera un token de actualización y lo establece en una cookie en la respuesta del servidor.
*/
export const register = async (req, res) => {
  const {
    per_name,
    per_lastname,
    per_document,
    per_expedition,
    per_birthdate,
    doc_typ_id,
    use_mail,
    use_password,
    use_role,
  } = req.body;

  try {
    // Validar los campos de entrada
    if (
      !per_name ||
      !per_lastname ||
      !per_document ||
      !per_expedition ||
      !per_birthdate ||
      !doc_typ_id ||
      !use_mail ||
      !use_password ||
      !use_role
    ) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    // Verificar si el usuario ya existe
    let existingUser = await User.findOne({ where: { use_mail } });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Ya existe un usuario con este correo electrónico" });
    }

    // Crear un nuevo usuario
    const newUser = await User.create({
      use_mail,
      use_password, // La contraseña será hashada automáticamente en el hook beforeSave de User
      use_status: true, // o el valor que necesites
    });

    // Crear una nueva persona asociada al usuario
    const newPerson = await Person.create({
      per_name,
      per_lastname,
      per_document,
      per_expedition,
      per_birthdate,
      doc_typ_id,
      use_id: newUser.use_id, // Relaciona la persona con el usuario
    });

    // Crear el registro en la tabla correspondiente según el rol del usuario
    if (use_role === "1") {
      await Beneficiary.create({
        per_id: newPerson.per_id,
      });
    } else if (use_role === "2") {
      await Employees.create({
        per_id: newPerson.per_id,
        emp_status: 0,
      });
    } else {
      return res.status(400).json({ error: "Rol de usuario no válido" });
    }

    // Generar los tokens JWT
    const { token, expiresIn } = generateToken(newUser.use_id);
    generateRefreshToken(newUser.use_id, res);

    // Enviar la respuesta con los tokens
    return res.status(201).json({ token, expiresIn });
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

/*Esta función se utiliza para obtener información del usuario actual.
Utiliza el use_id  proporcionado en la solicitud para buscar y devolver información básica del usuario,
 como su nombre, correo electrónico y ID de usuario.
*/

export const profile = async (req, res) => {
  try {
    const userId = req.use_id;
    if (!userId) {
      return res.status(400).json({ error: "el use_id es requerido" });
    }
    // Buscar el usuario por ID
    const user = await User.findOne({ where: { use_id: userId } });

    if (!user) {
      return res.status(404).json({ error: "User no encontrado 😰" });
    }
    const person = await Person.findOne({ where: { use_id: userId } });

    return res.json({
      use_mail: user.use_mail,
      per_name: person ? person.per_name : null,
      per_lastname: person ? person.per_lastname : null,
      per_document: person ? person.per_document : null,
      per_expedition: person ? person.per_expedition : null,
      per_birthdate: person ? person.per_birthdate : null,
      doc_typ_id: person ? person.doc_typ_id : null,
    });
  } catch (error) {
    console.error("Error al obtener el perfil:", error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

/*Esta función se utiliza para renovar un token de autenticación.
Utiliza el use_id proporcionado en la solicitud para generar un nuevo token de autenticación.
El token de autenticación se utiliza para mantener la sesión activa después de un período de tiempo específico.
*/
export const refreshToken = (req, res) => {
  try {
    const { token, expiresIn } = generateToken(req.use_id);
    return res.json({ token, expiresIn });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "error de server" });
  }
};

/*
Esta función se utiliza para cerrar la sesión de un usuario.
Limpia la cookie que contiene el token de actualización, cierra la sesión del usuario.
*/
export const logout = (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ ok: true });
};
