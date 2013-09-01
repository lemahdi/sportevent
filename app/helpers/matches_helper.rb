include FieldsHelper

module MatchesHelper

	def fields_names
		fields = Field.all
		names = fields.map { |field| [field.name, field.id] }.select { |f| f }
	end

	def match_end(match)
		hour_min = match.start.split(":")
		st = DateTime.new(match.jour.year, match.jour.month, match.jour.day,
								 			hour_min[0].to_i, hour_min[1].to_i, 0)
		(st + match.duration.minutes).strftime('%H:%M')
	end

	def match_start(match)
		hour_min = match.start.split(":")
		utc_offset = 1.0 * timezone_object(match.field).dst_offset / 3600 / 24
		DateTime.new(match.jour.year, match.jour.month, match.jour.day,
								 hour_min[0].to_i, hour_min[1].to_i, 0,
								 utc_offset)
	end
end
