class UserMailer < ActionMailer::Base
  default from: Rails.env.production? || Rails.env.staging? ? ENV['SENDGRID_USERNAME'] : "mahdi00@gmail.com"

  def contact_email(contact)
  	@contact = contact
  	mail(to:      @contact.email,
  			 subject: "[LYP-Contact]: #{@contact.subject}")
  end

  def notify_match_comment(contact, match, comment, recipient)
    @contact = contact
    @match = match
    @comment = comment
    mail(to:      recipient.email,
         subject: "[SportEvent]: #{@contact.subject}")
  end
end
