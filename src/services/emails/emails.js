// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  emailsDataValidator,
  emailsPatchValidator,
  emailsQueryValidator,
  emailsResolver,
  emailsExternalResolver,
  emailsDataResolver,
  emailsPatchResolver,
  emailsQueryResolver
} from './emails.schema.js'
import { EmailsService, getOptions } from './emails.class.js'

export const emailsPath = ':app/emails'
export const emailsMethods = ['create']

export * from './emails.class.js'
export * from './emails.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const emails = (app) => {
  // Register our service on the Feathers application
  app.use(emailsPath, new EmailsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: emailsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(emailsPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(emailsExternalResolver), schemaHooks.resolveResult(emailsResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(emailsQueryValidator), schemaHooks.resolveQuery(emailsQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(emailsDataValidator), schemaHooks.resolveData(emailsDataResolver), (context) => {
        context.data.app = context.params.route.app
      }],
      patch: [schemaHooks.validateData(emailsPatchValidator), schemaHooks.resolveData(emailsPatchResolver)],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
