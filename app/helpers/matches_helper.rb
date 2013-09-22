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

	def sportizers_name(match)
		match.sportizers.map do |sportizer|
      sportizer.prenom
    end.join(", ")
	end

	def subscribed?(match)
		match.sportizers.include?(current_user)
	end

	def empty_place?(match)
		# match.aviron.nbplaces > match.rameurs.size
		true
	end

	def build_play_match_button(match)
		button_params = {}
		button_params[:participate] = "yes"
		button_params[:action]      = :put
		button_params[:text]        = "  #{I18n.t(:play, scope: 'custom.verb')}   "
		button_params[:disabled]    = false

		if subscribed?(match)
			button_params[:participate] = "no"
			button_params[:action]      = :delete if match.sportizers.size == 1
			button_params[:text]        = "#{I18n.t(:cancel, scope: 'custom.verb')} "
		elsif !empty_place?(match)
			button_params[:participate] = "no"
			button_params[:disabled]    = true
		end

		button_params
	end
end
