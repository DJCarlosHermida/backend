import twilio from 'twilio'
import config from './config.js'

export const client_twilio = twilio(config.twilio_account_sid, config.twilio_auth_token)