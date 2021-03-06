require 'development_mail_interceptor'

ActionMailer::Base.delivery_method = :smtp

ActionMailer::Base.perform_deliveries = true

ActionMailer::Base.raise_delivery_errors = true

ActionMailer::Base.default content_type: "text/html"

ActionMailer::Base.smtp_settings = {
  address:              Rails.env.development? ? "smtp.gmail.com" : "smtp.sendgrid.net",
  port:                 587,
  domain:               Rails.env.development? ? "gmail.com" : "heroku.com",
  user_name:            Rails.env.development? ? ENV['GMAIL_USERNAME'] : ENV['SENDGRID_USERNAME'],
  password:             Rails.env.development? ? ENV['GMAIL_PASSWORD'] : ENV['SENDGRID_PASSWORD'],
  authentication:       :plain,
  enable_starttls_auto: true
}

if Rails.env.development? then
	ActionMailer::Base.default_url_options[:host] = "localhost:3000"
elsif Rails.env.staging? then
	ActionMailer::Base.default_url_options[:host] = "lemahdi-sportevent-s.herokuapp.com"
elsif Rails.env.production? then
	ActionMailer::Base.default_url_options[:host] = "spintcy.com"
end

Mail.register_interceptor(DevelopmentMailInterceptor) if Rails.env.development? || Rails.env.staging?
