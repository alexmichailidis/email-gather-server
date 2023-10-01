import { emails } from './emails/emails.js'


export const services = (app) => {
  app.configure(emails)


  // All services will be registered here
}
