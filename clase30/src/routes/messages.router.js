import { Router } from "express";
import { transporter } from "../nodemailer.js";
import { __dirname } from "../utils.js";
import { client_twilio } from "../twilio.js";
import config from '../config.js'


const router = Router()

// NODEMAILER
router.get('/', async (req, res) => {
    console.log('Send Email')
    const {email, name, quote} = req.body
    try {
        const message = {
            from: 'DJ',
            to: email,
            subject: `Bienvenido ${name}`,
            text: 'Kiss me from backend',
            html: '<h1 style="color: red"> <i>MAIL FROM DJ SEVER</i></h1>',
            attachments: [
                { path: __dirname + '/40_Libertador.jpg' }
            ]
        }
        await transporter.sendMail(message)
        res.send('Mail Sent')
    } catch (error) {
        res.json({ message: 'Error', error })
    }
})

router.post('/', async (req, res) => {
    const { email, name, quote } = req.body
    try {
      const message = {
        from: 'DJ',
        to: email,
        subject: `Bienvenido ${name}`,
        text: quote,
        html:'<h1>COTIZACION FIESTA FIN DE CURSO</h1>',
        attachments: [
            { path: __dirname + '/40_Libertador.jpg' }
        ]
      }
  
      await transporter.sendMail(message)
      res.send('Mail sent')
    } catch (error) {
      res.json({ message: 'Error', error })
    }
  })

// TWILIO
router.get('/twilio', async( req, res ) => {
    try {
        client_twilio.message.create({
            body: 'Try Twilio',
            to: '+59891332854',
            from: config.twilio_phone_number
        })
        res.send('WhatsUp Sent')
    } catch (error) {
        res.json({ message: 'Error', error })
    }
})

export default router