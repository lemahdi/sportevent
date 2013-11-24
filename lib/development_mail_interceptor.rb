class DevelopmentMailInterceptor
	def self.delivering_email(message)
		if Rails.env.development? then
			prefix = "[SportEvent-DEV]"
		elsif Rails.env.staging?
			prefix = "[SportEvent-STAGE]"
		end
		message.subject = "#{prefix} #{message.to}: #{message.subject}"
		message.to = ENV['EMAIL_REDIRECT']
	end
end