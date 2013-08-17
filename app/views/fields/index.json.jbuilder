json.array!(@fields) do |field|
  json.extract! field, :street, :city, :country, :latitude, :longitude
  json.url field_url(field, format: :json)
end