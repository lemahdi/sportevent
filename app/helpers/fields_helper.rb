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

  # GeoJSON format for Mapbox API
  def geojson(fields)
    geojson = Array.new
    fields.each do |field|
      geojson << {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [field.longitude, field.latitude]
        },
        properties: {
          name: field.name,
          address: print_field(field),
          :'marker-color' => '#00607d',
          :'marker-symbol' => 'circle',
          :'marker-size' => 'medium',
          title: "<a href=#{field_url(field)} data-no-turbolink><b>#{field.name}</b></a>",
          description: print_field(field)
        }
      }
    end
    geojson
  end
end
