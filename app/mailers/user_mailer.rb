class UserMailer < ActionMailer::Base
  default from: Rails.env.production? || Rails.env.staging? ? ENV['SENDGRID_USERNAME'] : ENV['GMAIL_USERNAME']

  def contact_email(contact)
  	@contact = contact
  	mail(to:      @contact.email,
  			 subject: "[SportEvent-Contact]: #{@contact.subject}")
  end

  def notify_match_comment(contact, match, recipient)
    @contact = contact
    @match = match
    mail(to:      recipient.email,
         subject: "[SportEvent-Comment]: #{@contact.subject}")
  end

  def invite_play_match(contact, match, recipient)
    @contact = contact
    @match = match
    mail(to:      recipient.email,
         subject: "[SportEvent-Invitation]: #{@contact.subject}")
  end
end
