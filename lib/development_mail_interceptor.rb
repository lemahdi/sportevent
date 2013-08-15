class DevelopmentMailInterceptor
	def self.delivering_email(message, prefix)
		message.subject = "#{prefix} #{message.to}"
		message.to = "akkouh.mahdi@gmail.com"
	end
end