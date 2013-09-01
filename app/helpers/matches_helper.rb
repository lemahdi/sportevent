module MatchesHelper

	def fields_names
		fields = Field.all
		names = fields.map { |field| [field.name, field.id] }.select { |f| f }
	end

	def match_end(match)
		(match_start(match) + match.duration.minutes).strftime('%H:%M')
	end

	def match_start(match)
		jour = match.jour
		hour_min = match.start.split(":")
		DateTime.new(jour.year, jour.month, jour.day, hour_min[0], hour_min[1], 0)
	end
end
