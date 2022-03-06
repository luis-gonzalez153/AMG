export function firebaseErrors(error) {
    let message = "";
    switch (error) {
        case "auth/user-not-found":
            message =
                "No existe ningún registro de usuario que corresponda al identificador proporcionado.";
            break;
        case "auth/email-already-exists":
            message =
                "already-exists 	Otro usuario ya está utilizando el correo electrónico proporcionado. ";
            break;
        case "auth/wrong-password":
            message = "La contraseña que ingreso es incorrecta.";
            break;
        default:
            break;
    }
    return { message };
}
