json.array!(@matches) do |match|
  json.extract! match, :start, :duration, :field_id
  json.url match_url(match, format: :json)
end