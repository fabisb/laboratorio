import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: "silvabravofabian@gmail.com",
        pass: "necslbolggvrhvhg",
    },
});
export const enviarCorreo = async (req, res) => {
    try {
        const { texto, correo, data } = req.body;
        //HACER VALIDACIONES DE CORREO
        if (
            texto == '' ||
            correo == ''
            || !data
        ) {
            return await res.status(400).json({ mensaje: 'Envie datos validos para el correo electronico' });
        }
        const email = {
            from: '"Fabian Silva Bravo" <silvabravofabian@gmail.com>', // sender address
            to: correo, // list of receivers
            subject: texto, // Subject line
            text: texto, // Subject line
            attachments: [
                {   // binary buffer as an attachment
                    filename: `${texto}.pdf`,
                    content: new Buffer.from(data)
                },
            ]
        }
        // send mail with defined transport object
        const info = await transporter.sendMail(email);
        //NO DETECTA CUANDO EL CORREO ELECTRONICO ES INVALIDO
        return await res.status(200).json({ mensaje: "Message sent: " + info.messageId });
    } catch (error) {
        console.log("🚀 ~ enviarCorreo ~ error:", error)
        return await res
            .status(500)
            .json({ mensaje: "Ha ocurrido un error en el servidor" });
    }
}