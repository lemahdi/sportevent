class DevelopmentMailInterceptor
	def self.delivering_email(message, prefix)
		if Rails.env.development? then
			prefix = "[SportEvent-DEV]"
		elsif Rails.env.staging?
			prefix = "[SportEvent-STAGE]"
		end
		message.subject = "#{prefix} #{message.to}"
		message.to = "akkouh.mahdi@gmail.com"
	end
end