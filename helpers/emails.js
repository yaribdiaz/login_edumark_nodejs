import nodemailer from 'nodemailer'

const emailRegistro = async (datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const { email, nombre, token} =datos

      //Enviar el email
      await transport.sendMail({
        from: 'EDUMARK',
        to: email,
        subject: 'Confirma tu cuenta en EDUMARK',
        text: 'Confirma tu cuenta en EDUMARK',
        html:`
            <p>Hola ${nombre}, comprueba tu cuenta en EDUMARK</p
            <p>Tu cuenta ya está lista solo debes confirmarla en el
            siguiente enlace:
            <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/confirmar/${token}">
            Confirma tu cuenta</a></p>
             
            <p>Si tu no creaste esta cuenta puedes ignorar el mensaje</p>
            `
      })
}



const emailOlvidePassword = async (datos) => {
  const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const { email, nombre, token} =datos

    //Enviar el email
    await transport.sendMail({
      from: 'EDUMARK',
      to: email,
      subject: 'Restablecer contraseña en EDUMARK',
      text: 'Restablece tu cuenta en EDUMARK',
      html:`
          <p>Hola ${nombre}, has solicitado reestablecer tu cuenta en EDUMARK</p
          <p>Sigue el siguiente enlace para cambiar tu contraseña:
          <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/olvide-password/${token}">
          Restablecer contraseña</a></p>
           
          <p>Si tu no solicitaste el cambio de contraseña, puedes ignorar este mensaje</p>
          `
    })
}






export{
    emailRegistro,
    emailOlvidePassword
}