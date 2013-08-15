class UserMailer < ActionMailer::Base
  default from: Rails.env.production? ? ENV['SENDGRID_USERNAME'] : "mahdi00@gmail.com"
end
