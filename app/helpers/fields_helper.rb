module FieldsHelper

	def print_field(field)
		place_name = field.street
		if place_name!="" then
	  	"#{place_name} - #{field.city}, #{field.country}"
	  else
	  	"#{field.name} - #{field.city}, #{field.country}"
	  end
	end

	def timezone_object(field)
		GoogleTimezone.fetch(field.latitude, field.longitude)
	end
end
