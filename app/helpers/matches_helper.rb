module MatchesHelper

	def fields_names
		fields = Field.all
		names = fields.map { |field| [field.name, field.id] }.select { |f| f }
	end

	def match_end(match)
		(match.start + match.duration.minutes).strftime('%H:%M')
	end
end
